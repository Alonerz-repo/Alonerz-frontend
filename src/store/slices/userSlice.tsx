import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export interface userInfo {
  userId?: number | null;
  point?: number;
  following?: number;
  follower?: number;
  needProfile?: boolean;
  nickname?: string;
  profileImageUrl?: string;
  year: string;
  career: string;
  description: string;
  careerGroupName: string;
  careerId: string;
  careerItemName: string;
}

const initialState: userInfo = {
  userId: null,
  point: 0,
  following: 0,
  follower: 0,
  needProfile: false,
  nickname: "",
  profileImageUrl: "",
  career: "",
  description: "",
  year: "",
  careerGroupName: "",
  careerId: "",
  careerItemName: "",
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

export const kakaoLogout = createAsyncThunk(
  "userSlice/kakaoLogout",
  async (_, thunkAPI) => {
    try {
      console.log("hello kakaoLogout!");
      const response = await axios({}).then((res) => {
        console.log(res);
      });
      return response;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const setUserAxios = createAsyncThunk(
  "user/setUser",
  async (user: any, thunkAPI) => {
    try {
      const token = getCookie("accessToken");
      const response = await axios({
        method: "patch",
        url: `${url}/api/users/me`,
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
export const getUserAxios = createAsyncThunk(
  "user/getUserAxios",
  async (_, thunkAPI) => {
    try {
      console.log("hello getUser");
      const token = getCookie("accessToken");
      const response = await axios({
        method: "get",
        url: `${url}/api/users/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        return res.data;
      });

      return response;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(kakaoLogin.fulfilled, (state, action) => {
        console.log("hello extraReducer!");
      })
      .addCase(getUserAxios.fulfilled, (state, action) => {
        return (state = action.payload.user);
      });
  },
});

export default userSlice;
