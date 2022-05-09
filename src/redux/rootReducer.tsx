import { combineReducers } from "@reduxjs/toolkit";
import testSlices from "./slices/TestSlices";

const reducer = combineReducers({
  testSlices,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
