// We will have all our actions in one file

// State Description (TODO: Add FLOW here!)
// data: null | { .. Data ... }
import _ from 'lodash';
import { push, replace } from 'connected-react-router';


export const initialState = {
};

function reducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

export default reducer;
