import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
interface Character {
  Character: number;
  sticker: any;
  color: string;
}
const initialState: Character = {
  Character: 0,
  sticker: [-1, -1, -1, -1],
  color: "",
};

export const userCharacter = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      console.log(action);
      state = action.payload;
      return state;
    },
  },
});

const { actions, reducer } = userCharacter;
export const { setCharacter } = actions;
export default reducer;
