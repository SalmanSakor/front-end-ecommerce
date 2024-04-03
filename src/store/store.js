import { legacy_createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";

const middlewares = [logger];

const persistConfig = { key: "root", storage, blacklist: [] };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = legacy_createStore(persistedReducer, composedEnhancers);

export const persistor = persistStore(store);
