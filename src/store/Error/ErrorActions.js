import {HTTP_REQUEST_ERROR} from './ErrorReducer';

export const httpRequestError = type => ({data, status}) => async dispatch => {
  dispatch({
    type: HTTP_REQUEST_ERROR,
    resourceType: type,
    resource: {message: data.message || data.error, status: status},
  });
};
