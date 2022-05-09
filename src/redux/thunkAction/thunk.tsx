import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";
import axios from "axios";

/* 청크 테스트 파일 */

export interface User {
  id: number;
  name: string;
}

export const thunkTest = {
  fetchUserById: createAsyncThunk(
    "users/fetchByIdStatus",
    async (_, thunkAPI) => {
      try {
        console.log("hello createAsyncThunk");

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        return response.data;
      } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err);
      }
    }
  ),
};
// export const fetchUserById = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/posts/1"
//       );
//       //   .then((res) => {
//       //     console.log("hello axios res!");
//       //     //thunkAPI.dispatch()
//       //     const value: any = thunkAPI.getState();
//       //     console.log(value);
//       //   });
//       // const myresponse = "hello";
//       console.log("hello axios");
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// slice 안에 들어갈 내용들은 매우 심플하고 직관적이다.
// name, initialState, reducers.
// export const test = createSlice({
//   //action
//   name: "user",
//   //initialState
//   initialState: [],
//   //reducer
//   reducers: {},
//   //thunk
//   extraReducers: (builder) => {
//     console.log("hello builder");
//     builder
//       //   .addCase(fetchUserById.pending, (state, action) => {
//       //     console.log("hello fetchUserById.pending");
//       //     window.alert("hello?");
//       //     return state;
//       //   })
//       .addCase(fetchUserById.fulfilled, (state, action) => {
//         console.log("hello fetchUserById.fulfilled");
//         console.log(current);
//         console.log(state);
//         console.log(action.payload);
//       });
//   },
// });

// 액션과 리듀서를 export 해준다. 이건 그냥 따라하면 된다.

// export default test.reducer;
