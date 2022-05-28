import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bool: false,
};

export const setBoolean = createSlice({
  name: "setBoolean",
  initialState,
  reducers: {
    setBool: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const { actions, reducer } = setBoolean;
export const { setBool } = actions;
export default reducer;
