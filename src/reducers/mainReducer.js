// We will have all our actions in one file

// State Description (TODO: Add FLOW here!)
// data: null | { .. Data ... }
import _ from 'lodash';
import { push, replace } from 'connected-react-router';


export const initialState = {
  status: 'empty', //
  sourceData: null,
  convertedData: null
};

export function handleSvg() {
  return async function(dispatch, getState) {



  }
}

// a user chooses a file
function loadFile() {
  return {
    type: 'main/LoadFile'
  }
}

// a file content is being sent to the server
function sendFile() {
  return {
    type: 'main/SendFile'
  }

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

function reducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

export default reducer;
