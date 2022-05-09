import { configureStore } from "@reduxjs/toolkit";
import reducer from "./rootReducer";
import logger from "redux-logger";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = ReturnType<typeof store.dispatch>;
export type RootState = ReturnType<typeof store.getState>;
