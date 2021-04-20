import {LOCATION_CHANGE} from 'connected-react-router';

export const HTTP_REQUEST_ERROR = '[ERROR] Http request';

export const ERROR_CODE_NOT_FOUND = 404;

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case HTTP_REQUEST_ERROR: {
      return {
        ...state,
        [action.resourceType]: action.resource,
      };
    }
    case LOCATION_CHANGE: {
      return 'key' in action.payload.location ? initialState : state;
    }
    default: {
      return state;
    }
  }
};
