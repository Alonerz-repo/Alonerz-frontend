import { createSlice } from "@reduxjs/toolkit";
interface Character {
  Character: number;
  color: number;
  stickerOrder: number;
  stickerImageId: number;
}
const initialState: Character = {
  Character: 0,
  color: 0,
  stickerOrder: 0,
  stickerImageId: 0,
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
