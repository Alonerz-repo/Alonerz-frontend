import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const initialState = {
  Character: "",
  sticker: [],
  color: "",
};

export const userCharacter = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      console.log(action);
    },
  },
});

const { actions, reducer } = userCharacter;
export const { setCharacter } = actions;
export default reducer;
