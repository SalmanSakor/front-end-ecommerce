import { legacy_createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
const middlewares = [logger];
const composedEnhancers = compose(applyMiddleware(...middlewares));
export const store = legacy_createStore(rootReducer, composedEnhancers);
