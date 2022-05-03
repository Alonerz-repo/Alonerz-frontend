import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// import { actionCreators as postActions } from "./post";
// import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

//token
// token = sessionStorage.getItem('token')
// headers: {
//   Authorization:`Bearer ${token}`
// }

const urll ="https://d72b2f97-ed48-4aec-9d29-242cd2331e6a.mock.pstmn.io/"
// actions
const UPDATE_CAREER = "UPDATE_CAREER";
const UPDATE_USER = "UPDATE_USER";
const GET_MY_INFO = "GET_MY_INFO";
const ADD_CAREER = "ADD_CAREER";
const DELETE_CAREER = "DELETE_CAREER";

// action creators
const updateCareer = createAction(UPDATE_CAREER, (career) => ({career}))
const updateUser = createAction(UPDATE_USER,(userInfo) => ({userInfo}))
const getMyInfo = createAction(GET_MY_INFO,(user)=>({user}))
const addCareer = createAction(ADD_CAREER,(career) => ({career}))
const deleteCareer = createAction(DELETE_CAREER,(careerId) => ({careerId}))

// initialState
const initialState = {
  user: {
    userId : 0,
    kakaoId : null,
    profileImageUrl : null,
    nickname : "",
    age : 0,
    gender : "",
    point : 0,
    careers : [
      {
        careerId:0,
        part : "",
        year : "",
        description: "",
      },
      
      {
        careerId:1,
        part : "1",
        year : "1",
        description: "1",
      }
    ]

  },
  isLogin: false,
};

// middleware actions

// user의 nickname, age, gender를 수정할 수 있는 미들 웨어
// const userInfo = {
//   nickname: "kim",
//   age: 28,
//   gender : "man"
// }
const updateUserBE = (userInfo) => {
  return function(dispatch, getState, {history}){
    axios({
      method: 'post',
      url : `${urll}api/users/me`,
      data:{
        ...userInfo
      },
      headers:{
        Authorization : ""
      }
    }).then((response) => {
      dispatch(updateUser(userInfo))
    }).catch((err) => {
      console.log(err.message)
    })
  }
}

// user 전체 정보를 가져오는 미들 웨어
// response.data :{
//   user: {
//     userId : 0,
//     kakaoId : null,
//     profileImageUrl : null,
//     nickname : "",
//     age : 0,
//     gender : "",
//     point : 0,
//     careers : [
//       {
//         careerId:0,
//         part : "",
//         year : "",
//         description: "",
//       }
//     ]

//   }
// }
const getMyInfoBE = () => {
  return function(dispatch, getState, {history}){
    axios({
      method: 'get',
      url : `${urll}api/users/me`,
      headers:{
        Authorization : ""
      }
    }).then((response) => {
      dispatch(getMyInfo(response.data.user))
    }).catch((err) => {
      console.log(err.message)
    })
  }
}

// user의 career 정보를 추가하는 미들 웨어
// const career = {
//   part: "q",
//   year: "w",
//   description:"e"
// }
const addCareerBE = (career) => {
  return function (dispatch, getState, {history}){
    axios({
      method: 'post',
      url : `${urll}api/users/careers`,
      data:{
        ...career
      },
      headers: {
        Authorization : ""
      }
    }).then((response) => {
      dispatch(addCareer(career))
    }).catch((err) => {
      console.log(err.message)
    })
  }
}

// user의 career 정보를 업데이트하는 미들 웨어
// const career = {
//   part: "q",
//   year: "w",
//   description:"e"
// }
const updateCareerBE = (career, careerId) => {
  return function (dispatch, getState, {history}){
    axios({
      method: 'patch',
      url : `${urll}api/users/career/${careerId}`,
      data:{
        ...career
      },
      headers: {
        Authorization : ""
      }
    }).then((response) => {
      dispatch(updateCareer(career))
    }).catch((err) => {
      console.log(err.message)
    })
  }
}

// careerId에 해당하는 career를 삭제하는 미들 웨어
const deleteCareerBE = (careerId) => {
  return function (dispatch, getState, {history}){
    axios({
      method: 'delete',
      url : `${urll}api/users/career/${careerId}`,
      headers: {
        Authorization : ""
      }
    }).then((response) => {
      dispatch(deleteCareer(careerId))
    }).catch((err) => {
      console.log(err.message)
    })
  }
}

// reducer
export default handleActions(
  {
    [UPDATE_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.user.careers[0] = action.payload.career;
      }),

    [UPDATE_USER]: (state, action) =>
    produce(state, (draft) => {
      draft.user = {...draft.user, ...action.payload.userInfo}
    }),

    [GET_MY_INFO]: (state, action) =>
    produce(state, (draft) => {
      draft.user = action.payload.user
    }),

    [ADD_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.user.careers.push(action.payload.career);
    }),

    [DELETE_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.user.careers = draft.user.careers.filter((c,_) =>{
          return c.careerId !== parseInt(action.payload.careerId)
        });
    }),
  },
  initialState
);

// action creator export
const actionCreators = {
  updateCareerBE,
  updateUserBE,
  getMyInfoBE,
  addCareerBE,
  deleteCareerBE,
};

export { actionCreators };
