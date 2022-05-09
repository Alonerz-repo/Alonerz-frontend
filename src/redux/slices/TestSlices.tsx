import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { thunkTest } from "../thunkAction/thunk";

export interface User {
  id: number;
  name: string;
}

// slice 안에 들어갈 내용들은 매우 심플하고 직관적이다.
// name, initialState, reducers, extraReducers.
export const users = createSlice({
  //action
  name: "users",

  //initialState
  initialState: [
    { id: 1, name: "User1" },
    { id: 2, name: "User2" },
  ], // 필수로 타입 지정 안해도 되지만, 확실히 하기로 한다.

  //reducer
  reducers: {
    addUser: (state, action) => {
      console.log(action);
    },
  },

  //extraReducers -> 외부 파일에서 스테이트를 변경할경우
  extraReducers: (builder) => {
    builder
      .addCase(thunkTest.fetchUserById.pending, (state, action) => {
        console.log("hello extraReducer!");
      })
      .addCase(thunkTest.fetchUserById.fulfilled, (state, action) => {
        console.log("hello extraReducer?");
      })
      .addCase(thunkTest.fetchUserById.rejected, (state, action) => {
        console.log("hello world!");
      });
  },
});

// 액션과 리듀서를 export 해준다. 이건 그냥 따라하면 된다.
// 리액트 강의에서 export CreateActions 부분
export const { addUser } = users.actions;
export default users.reducer;
