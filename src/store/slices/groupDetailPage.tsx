import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const url = `https://a55b727a-083a-473d-8134-4a44980eb41f.mock.pstmn.io`;

interface GroupInfo {
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
}

interface CommonState {
  groupInfo: GroupInfo;
}

const initialState: CommonState = {
  groupInfo: {
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
  },
};

export const getGroupInfo = createAsyncThunk(
  "getDetailGroup/getGroupInfo",
  async () => {
    const response = await axios({
      method: "get",
      url: `${url}/get/test`,
    });
    console.log(response.data);
    return response.data;
  }
);

const getDetailGroup = createSlice({
  name: "getDetailGroup",
  initialState,
  reducers: {
    setGroupDetail(state, action: PayloadAction<GroupInfo>) {
      state.groupInfo = action.payload;
    },
  },
});
