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
  startAt: Date;
  endAt: Date;
  limit: number;
  imageUrl: string;
  locationX: number;
  locationY: number;
  address1: string;
  address2: string;
  placeName: string;
  createdAt: Date;
  updateAt: Date;
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
    startAt: new Date(),
    endAt: new Date(),
    limit: 4,
    imageUrl: "",
    locationX: 0,
    locationY: 0,
    address1: "",
    address2: "",
    placeName: "",
    createdAt: new Date(),
    updateAt: new Date(),
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
  "getDetailGroup/getGroupInfo",
  async () => {
    const response = await axios({
      method: "get",
      url: `${url}/get/test`,
    });
    return response.data.group;
  }
);

export const partyInfoSlice = createSlice({
  name: "getDetailGroup",
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
