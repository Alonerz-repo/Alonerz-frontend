import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface userInfo {
  kakaoId: number;
}

const initialState: userInfo = {
  kakaoId: 0,
};

export const kakaoLogin = createAsyncThunk(
  "loginSlice/kakaoLogin",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await axios.get("");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default loginSlice;
