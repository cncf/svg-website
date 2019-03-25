// We will have all our actions in one file

// State Description (TODO: Add FLOW here!)
// data: null | { .. Data ... }
import _ from 'lodash';
import { push, replace } from 'connected-react-router';
import { sendFile, getProgress } from './api';

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
    await dispatch(setInputFile(id, input));
    await sendFile(id, input);
    while(true) {
      console.info('test');
      const info = await getProgress(id);
      console.info('test2');
      await dispatch(setConverterStatus(id, info));
      if (info.status === 'finished' || info.status === 'error') {
        break;
      }
    }
  }
}

// a user chooses a file
function setInputFile(id, inputFile) {
  return {
    type: 'main/SetInputFile',
    id: id,
    inputFile: inputFile
  }
}

function setConverterStatus(id, info) {
  return {
    type: 'main/SetConverterStatus',
    id: id,
    info: info
  };
}

// a response is expected from a server. It can be a current status or the output
function waitOutput() {
  return {
    type: 'main/waitOutput'
  }
}

// download a file
function download() {
  return {
    type: 'download'
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

function setInputFileHandler(state, action) {
  const converterState = state.converters[action.id];
  const newConverterState = { ...converterState, status: 'sending', inputFile: action.inputFile};
  return {...state, converters: {...state.converters, [newConverterState.id]: newConverterState}};
}

function setConverterStatusHandler(state, action) {
  const converterState = state.converters[action.id];
  const newConverterState = { ...converterState, status: action.info.status};
  return {...state, converters: {...state.converters, [newConverterState.id]: newConverterState}};
}


function reducer(state = initialState, action) {
  switch(action.type) {
    case 'main/AddConverter':
      return addConverterHandler(state, action);
    case 'main/SetInputFile':
      return setInputFileHandler(state, action);
    case 'main/SetConverterStatus':
      return setConverterStatusHandler(state, action);
    default:
      return state;
  }
}

export default reducer;
