import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  image: string;
  isUploading: boolean;
}

const initialState: CommonState = {
  image: "",
  isUploading: false,
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
