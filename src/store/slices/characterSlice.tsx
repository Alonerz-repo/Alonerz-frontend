import { createSlice } from "@reduxjs/toolkit";
interface Character {
  characterImageId: number;
  color: number;
  stickerOrder: number;
  stickerImageId: number;
  stickers: [];
}
const initialState: Character = {
  characterImageId: 0,
  color: 0,
  stickerOrder: 0,
  stickerImageId: 0,
  stickers: [],
};

export const userCharacter = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const { actions, reducer } = userCharacter;
export const { setCharacter } = actions;
export default reducer;
