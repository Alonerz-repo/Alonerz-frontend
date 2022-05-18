import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import loginAxios from "../../axios/loginAxios";
import authAxsios from "../../axios/authAxios";

export interface userInfo {
  userId: string;
  needProfile?: boolean;
  nickname?: string;
  kakaoId?: string;
  statusCode?: number;
  message?: string;
}

const initialState: userInfo = {
  userId: "-1",
  needProfile: false,
  nickname: "",
  kakaoId: "",
  statusCode: 0,
  message: "",
};

//사용자 정보 유효성 검사 액션입니다.
//토큰을 보내 유요한 계정이면 사용자 정보를 갱신하고
//유요하지 않으면 오류코드와 유저 아이디는 -1로 갱신합니다.
export const authUser = createAsyncThunk(
  "userSlice/auth",
  async (_, thunkAPI) => {
    const response = authAxsios.authUser().then((res) => {
      if (res.auth) {
        return res.auth;
      } else {
        const state = {
          userId: "-1",
          statusCode: res.statusCode,
          message: res.message,
        };
        return state;
      }
    });
    return response;
  }
);

//로그아웃 버튼을 클릭하면 사용자 정보를 초기상태로 갱신합니다.
export const kakaoLogout = createAsyncThunk(
  "userSlice/kakaoLogout",
  async (_, thunkAPI) => {
    const response = await loginAxios
      .logout()
      .then((res) => {
        return res;
      })
      .catch((err) => err.response.data);
    return response;
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
