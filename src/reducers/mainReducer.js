// We will have all our actions in one file

// State Description (TODO: Add FLOW here!)
// data: null | { .. Data ... }
import Promise from 'bluebird';
import _ from 'lodash';
import { push, replace } from 'connected-react-router';
import { sendFile, getProgress, download} from './api';

function uuid() { // https://stackoverflow.com/a/2117523/4986404
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}


export const initialState = {
  converters: []
};

function tryToRead(file) {
  return new Promise(function(resolve, reject) {

    const reader = new FileReader()
    reader.onabort = function() {
      reject('reading_failed');
    }
    reader.onerror = function() {
      reject('reading_failed');
    }
    reader.onload = function() {
      resolve(reader.result);
    }
    reader.readAsBinaryString(file);
  });
}

export function receiveFiles(files) {
  return async function(dispatch, getState) {
    files.forEach(function(file) {
      const newConverterState = {
        status: 'reading',
        id: uuid()
      };
      dispatch(addConverter(newConverterState));
      dispatch(startProcessing(newConverterState.id, file));
    });
  }
}

export function downloadFile(id) {
  return async function(dispatch, getState) {
    console.info(getState().main);
    const converter = getState().main.converters[id];
    if (converter) {
      download({content: converter.outputFile, fileName: converter.name});
    }
  };
}

export function handleSvg() {
  return async function(dispatch, getState) {


  }
}

function addConverter(converterState) {
  return {
    type: 'main/AddConverter',
    converterState: converterState
  }
}

function startProcessing(id, file) {
  return async function(dispatch, getState) {
    const input = await tryToRead(file);
    await dispatch(setInputFile({id, inputFile: input, name: file.name}));
    const sendFileResult = await sendFile({id, inputFile: input});
    if (!sendFileResult) {
      await dispatch(setConverterStatus(id, {status: 'upload_error'}));
      return;
    }
    while(true) {
      const info = await getProgress(id);
      await dispatch(setConverterStatus(id, info));
      if (info.status === 'finished' || info.status === 'failed') {
        break;
      }
      await Promise.delay(1000);
    }
  }
}

// a user chooses a file
function setInputFile({id, inputFile, name}) {
  return {
    type: 'main/SetInputFile',
    id: id,
    inputFile: inputFile,
    name: name
  }
}

function setConverterStatus(id, info) {
  return {
    type: 'main/SetConverterStatus',
    id: id,
    info: info
  };
}

export function removeConverter(id) {
  return {
    type: 'main/RemoveConverter',
    id: id
  }
}

// a response is expected from a server. It can be a current status or the output
function waitOutput() {
  return {
    type: 'main/waitOutput'
  }
}

// clear and reset
function clear() {
  return {
    type: 'clear'
  }
}

function addConverterHandler(state, action) {
  return { ...state, converters: { ...state.converters, [action.converterState.id]: action.converterState  }};
}

// a helper to process a state of a given converter element
function updateConverterState(state, action, fn) {
  const converterState = state.converters[action.id];
  if (!converterState) {
    return state;
  }
  const newConverterState =  fn(converterState);
  return {...state, converters: {...state.converters, [newConverterState.id]: newConverterState}};
}

function setInputFileHandler(fullState, action) {
  return updateConverterState(fullState, action, function(state) {
    return { ...state, status: 'sending', inputFile: action.inputFile, name: action.name };
  });
}

function setConverterStatusHandler(fullState, action) {
  return updateConverterState(fullState, action, function(state) {
    return { ...state, status: 'sending', status: action.info.status, outputFile: action.info.result };
  });
}

function removeConverterHandler(state, action) {
  return {...state, converters: _.pickBy(state.converters, (converter) => converter.id !== action.id) };
}


function reducer(state = initialState, action) {
  switch(action.type) {
    case 'main/AddConverter':
      return addConverterHandler(state, action);
    case 'main/SetInputFile':
      return setInputFileHandler(state, action);
    case 'main/SetConverterStatus':
      return setConverterStatusHandler(state, action);
    case 'main/RemoveConverter':
      return removeConverterHandler(state, action);
    default:
      return state;
  }
}

export default reducer;
