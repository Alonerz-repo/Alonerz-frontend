import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../utils/cookie";

const url = process.env.REACT_APP_API_URL;

interface group {
  groups: [
    {
      groupId?: number;
      title?: string;
      menu?: string;
      placeName?: string;
      imageUrl?: string;
      startAt?: string;
      endAt?: string;
      limit?: number;
      host?: {
        userId?: number;
        nickname?: string;
        profileImageUrl?: "";
        year?: string;
        description?: string;
        career?: {
          careerId?: number;
          careerGroupName?: string;
          careerItemName?: string;
        };
      };
      join?: number;
    }
  ];
}

const initialState: group = {
  groups: [
    {
      groupId: 0,
      title: "",
      menu: "",
      placeName: "",
      imageUrl: "",
      startAt: "",
      endAt: "",
      limit: 0,
      host: {
        userId: 0,
        nickname: "",
        profileImageUrl: "",
        year: "",
        description: "",
        career: {
          careerId: 0,
          careerGroupName: "",
          careerItemName: "",
        },
      },
      join: 0,
    },
  ];
}

export const getAllGroup = createAsyncThunk(
  "partyList/getAllGroup",
  async (_, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${url}/api/groups?x=36.358361084097034&y=127.34540366949406`,
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

export const getTodayList = createAsyncThunk(
  "partyList/getTodayList",
  async (_, thunkAPI) => {
    try {
      const token = getCookie("accessToken");
      const reponse = await axios({
        method: "get",
        url: `${url}/api/groups/today`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        return res.data;
      });
      return reponse;
    } catch (err) {
      console.log(err);
    }
  }
);

export const partyListSilce = createSlice({
  name: "partyList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodayList.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(getAllGroup.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      });
  },
});

export default partyListSilce;
