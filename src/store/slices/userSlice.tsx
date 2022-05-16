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
}

const initialState: userInfo = {
  userId: -1,
  needProfile: false,
  nickname: "",
  kakaoId: "",
};

export const loginAuth = createAsyncThunk(
  "userSlice/loginAuth",
  async (_, thunkAPI) => {
    const response = await userAxios
      .authUser()
      .then((res) => {
        return res;
      })
      .catch((err) => err.response.data);
    return response;
  }
);

export const auth = createAsyncThunk("userSlice/auth", async (_, thunkAPI) => {
  try {
    const response = userAxios.authUser().then((res) => res);
    return response;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

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
        cookie.set("accessToken", accessToken);
        cookie.set("refreshToken", refreshToken);

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
export const getUserAxios = createAsyncThunk(
  "user/getUserAxios",
  async (_, thunkAPI) => {
    try {
      const response = await userAxios.getUser().then((res) => res);
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
      .addCase(kakaoLogin.fulfilled, (state, action) => {
        console.log("hello extraReducer!");
      })
      .addCase(getUserAxios.fulfilled, (state, action) => {
        state = action.payload.user;
        return state;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state = action.payload.auth;
        return state;
      })
      .addCase(auth.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state = action.payload.auth;
        return state;
      })
      .addCase(kakaoLogout.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      });
  },
});

export default userSlice;
