import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import cookie from "../../utils/cookie";
import axios from "axios";
import userAxios from "../../axios/userAxios";

const url = process.env.REACT_APP_API_URL;

export interface userInfo {
  userId: number;
  needProfile?: boolean;
  nickname?: string;
  kakaoId?: string;
  statusCode?: number;
  message?: string;
}

const initialState: userInfo = {
  userId: -1,
  needProfile: false,
  nickname: "",
  kakaoId: "",
  statusCode: 0,
  message: "",
};

export const authUser = createAsyncThunk(
  "userSlice/auth",
  async (_, thunkAPI) => {
    const response = userAxios.authUser().then((res) => {
      if (res.auth) {
        return res.auth;
      } else {
        const state = {
          userId: -1,
          statusCode: res.statusCode,
          message: res.message,
        };
        return state;
      }
    });

    return response;
  }
);

export const kakaoLogout = createAsyncThunk(
  "userSlice/kakaoLogout",
  async (_, thunkAPI) => {
    const response = await userAxios
      .logout()
      .then((res) => {
        return res;
      })
      .catch((err) => err.response.data);
    return response;
  }
);

export const setUserAxios = createAsyncThunk(
  "user/setUser",
  async (user: any, thunkAPI) => {
    try {
      const token = cookie.get("accessToken");
      const response = await axios({
        method: "patch",
        url: `${url}/api/users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          nickname: user.nickname,
          profileImageUrl: "",
          description: user.description,
          year: user.year,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const setFollow = createAsyncThunk(
  "user/setFollow",
  async (paramsId: any, thunkAPI) => {
    try {
      const token = cookie.get("accessToken");
      await axios({
        method: "put",
        url: `${url}/api/follows/${paramsId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      const code = err.response.data.statusCode;
      switch (code) {
        case 418:
          const message = err.response.data.message;
          const msg = message.reduce((prev: any, cur: any) => {
            return prev + `\n` + cur;
          });
          return window.alert(msg);
        default:
          console.log("팔로우 에러", err);
          window.alert("error!");
          return thunkAPI.rejectWithValue(err);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authUser.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(kakaoLogout.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      });
  },
});

export default userSlice;
