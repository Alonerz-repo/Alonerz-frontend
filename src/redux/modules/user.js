import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// import { actionCreators as postActions } from "./post";
// import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

//token
// token = sessionStorage.getItem('token')
// headers: {
//   Authorization:`Bearer ${token}`
// }

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const TEST_USER = "TEST_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const testUser = createAction(TEST_USER, (user) => ({ user }));
// initialState
const initialState = {
  user: {
    nickname: "",
    userProfile: "",
    isAdmin: false,
  },
  isLogin: false,
};

// middleware actions
const loginFB = (nickname, pwd, imageUrl = "") => {
  return function (dispatch, getState, { history }) {};
};

const signupFB = (nickname, pwd, pwd2) => {
  return function (dispatch, getState, { history }) {
    console.log(nickname, pwd, pwd2);
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { histroy }) {};
};

const logOutFB = () => {
  return function (dispatch, getState, { history }) {};
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [TEST_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logOutFB,
  testUser,
};

export { actionCreators };
