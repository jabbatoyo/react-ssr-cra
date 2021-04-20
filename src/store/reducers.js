import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import i18nReducer from "./I18n/I18nReducer";
import errorReducer from "./Error/ErrorReducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    i18n: i18nReducer,
  });
