import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";

import axios from "axios";

interface userInfo {
  isSignup: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: userInfo = {
  isSignup: false,
  accessToken: "",
  refreshToken: "",
};
const url = process.env.REACT_APP_API_URL;
export const kakaoGetToken = createAsyncThunk(
  "userSlice/kakaoGetToken",
  async (id: any, thunkAPI) => {
    console.log("hello getToken thunk");
    console.log(id);

    try {
      const response = await axios({
        method: "post",
        url: `${url}/api/auth/login`,
        data: {
          kakaoId: id,
        },
      }).then((res) => {
        console.log(res.data);
        const { accessToken, refreshToken, isSignup } = res.data;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);

        return res.data;
      });
      return response;
    } catch (err) {
      console.log(err);
      debugger;

      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const kakaoLogin = createAsyncThunk(
  "userSlice/kakaoLogin",
  async (_, thunkAPI) => {
    console.log("hello kakaoLogin Slice!!");

    try {
      const response = await axios({
        method: "get",
        url: "https://796760ed-2bcd-46dd-a78d-93a1aa5eee60.mock.pstmn.io/api/auth/login",
        data: {
          kakaoId: "kakao",
        },
      }).then((res) => {
        const info = {
          token: res.data.alonerz_access,
          refresh: res.data.alonerz_refresh,
          isSignup: res.data.isSignup,
        };
        return res.data;
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(kakaoLogin.fulfilled, (state, action) => {
      console.log("hello extraReducer!");
    });
  },
});

export default userSlice;
