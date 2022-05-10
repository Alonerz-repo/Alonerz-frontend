import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

interface userInfo {
  userId?: number;
  point?: number;
  following?: number;
  follower?: number;
  needProfile?: boolean;
  nickname?: string;
  profileImageUrl?: string;
  year: string;
  career: string;
  description: string;
}

type userKey = keyof userInfo;

const initialState: userInfo = {
  userId: 0,
  point: 0,
  following: 0,
  follower: 0,
  needProfile: false,
  nickname: "",
  profileImageUrl: "",
  career: "",
  description: "",
  year: "",
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
    const token = getCookie("accessToken");
    // console.log(token);
    const response = await axios({
      method: "get",
      url: `${url}/api/users/me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("GETUSER!!!! ", res.data);

      return res.data;
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
  reducers: {
    setUser: (state, action) => {
      console.log("hello reducer setUser!");
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(kakaoLogin.fulfilled, (state, action) => {
        console.log("hello extraReducer!");
      })
      .addCase(getUser.fulfilled, (state, action) => {
        return (state = action.payload.user);
      });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice;
