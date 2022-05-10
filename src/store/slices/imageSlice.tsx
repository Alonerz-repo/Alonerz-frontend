import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  image: string;
}

const initialState: CommonState = {
  image: "",
};

export const partyInfoSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<any>) {
      state.image = action.payload;
    },
  },
});

export const { setImage } = partyInfoSlice.actions;

export default partyInfoSlice;
