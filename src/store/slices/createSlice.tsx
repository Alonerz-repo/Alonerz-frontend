import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
};

export const createParty = createSlice({
  name: "createParty",
  initialState,
  reducers: {},
});
