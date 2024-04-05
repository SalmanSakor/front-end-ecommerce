import { compose, legacy_createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";

// const middleWares = [process.env.NODE_ENV === "development" && logger,thunk].filter(
//   Boolean
// );
const middleWares = [logger];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer);
export const persistor = persistStore(store);
