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
export const kakaoLogin = createAsyncThunk(
  "userSlice/kakaoLogin",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url}/api/auth/login`,
        data: {
          kakaoId: id,
        },
      }).then((res) => {
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

export const signUp = createAsyncThunk(
  "userSlice/signUp",
  async (_, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url}/api/auth/login`,
        data: {
          kakaoId: "",
        },
      }).then((res) => {
        console.log(res);
      });
      return response;
    } catch (err) {
      console.log(err);
      debugger;
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(kakaoLogin.fulfilled, (state, action) => {
      console.log("hello extraReducer!");
      console.log(action.payload);

      state.isSignup = action.payload.isSignup;
    });
  },
});

export default userSlice;
