import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cookie from "../../utils/cookie";
import userAxios from "../../axios/userAxios";

interface userInfo {
  userId: number | null;
  point?: number;
  following?: number;
  follower?: number;
  needProfile?: boolean;
  nickname?: string;
  profileImageUrl?: string;
  year?: string;
  career?: string;
  description?: string;
  careerGroupName?: string;
  careerId?: string;
  careerItemName?: string;
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

export const getfollowlist = createAsyncThunk(
  "getUser/getOUserAxios",
  async (user: any, thunkAPI) => {
    const { id, query } = user;
    userAxios.getFollowUser(id, query);
  }
);

export const getOUserAxios = createAsyncThunk(
  "user/getOUserAxios",
  async (userId: any, thunkAPI) => {}
);

export const getUserSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {},
});

export default getUserSlice;
