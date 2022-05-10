import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const url = `https://a55b727a-083a-473d-8134-4a44980eb41f.mock.pstmn.io`;

interface userInfo {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

interface GroupInfo {
  groupId: number;
  title: string;
  menu: string;
  description: string;
  startAt: string;
  endAt: string;
  limit: number;
  imageUrl: string;
  locationX: number;
  locationY: number;
  address1: string;
  address2: string;
  placeName: string;
  createdAt: string;
  updateAt: string;
  host: userInfo;
  guests: userInfo[];
}

interface CommonState {
  group: GroupInfo;
}

const initialState: CommonState = {
  group: {
    groupId: 0,
    title: "",
    menu: "",
    description: "",
    startAt: "",
    endAt: "",
    limit: 4,
    imageUrl: "",
    locationX: 0,
    locationY: 0,
    address1: "",
    address2: "",
    placeName: "",
    createdAt: "",
    updateAt: "",
    host: {
      userId: 0,
      nickname: "",
      profileImageUrl: "",
    },
    guests: [
      {
        userId: 0,
        nickname: "",
        profileImageUrl: "",
      },
    ],
  },
};

export const getPartyInfo = createAsyncThunk(
  "partyInfo/getPartyInfo",
  async (groupId: number, { rejectWithValue }: any) => {
    try {
      const response = await axios({
        method: "get",
        url: `${url}/get/test`,
        data: {
          groupId,
        },
      });
      return response.data.group;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const partyInfoSlice = createSlice({
  name: "partyInfo",
  initialState,
  reducers: {
    setGroupDetail(state, action: PayloadAction<GroupInfo>) {
      state.group = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPartyInfo.fulfilled, (state, { payload }) => {
      state.group = payload;
    });
  },
});

export default partyInfoSlice;
