import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

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

export const getOUserAxios = createAsyncThunk(
  "user/getOUserAxios",
  async (userId: any, thunkAPI) => {
    try {
      console.log("hello getOUserAxios");
      console.log(typeof userId);
      const token = getCookie("accessToken");
      const response = await axios({
        method: "get",
        url: `${url}/api/users/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log("sucess");
        console.log(res.data);
        return res.data;
      });
      return response;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getUserSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOUserAxios.fulfilled, (state, action) => {
      console.log("hello get extraReducer!");
      console.log("getUser action", action.payload);
      return (state = action.payload.user);
    });
  },
});

export default getUserSlice;
