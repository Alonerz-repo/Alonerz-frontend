import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

interface userInfo {
  kakaoId: string;
  userId?: number;
  nickname?: string;
  isSignup?: boolean;
  profileImageUrl?: string;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: userInfo = {
  kakaoId: "",
  userId: 0,
  nickname: "",
  profileImageUrl: "",
  isSignup: false,
  accessToken: "",
  refreshToken: "",
};

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    console.log("hello getUser");
    const response = await axios({}).then((res) => {
      console.log("sucess");
      return 0;
    });
    return response;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const getUserSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log("hello get extraReducer!");
    });
  },
});

export default getUserSlice;
