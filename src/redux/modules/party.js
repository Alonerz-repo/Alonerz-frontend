import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 액션
const CREATE_GROUPS = "CREATE_GROUPS";
const GET_GROUPS = "GET_GROUPS";
const PATCH_GROUPS = "PUT_GROUPS";
const DELETE_GROUPS = "DELETE_GROUPS";

// 액션 크리에이트
const createRoom = createAction(CREATE_GROUPS, (roomInfo) => ({ roomInfo }));

// 액션 초기 상태
const initialState = {
  groups: [
    {
      title: "고양이 모임",
      categoryIds: "",
      menu: "참치캔",
      startAt: "12:00",
      endAt: "14:00",
      memberLimit: "1/2",
      description: "나는고양이로소이다",
      imageUrl: "",
      location: "우리집",
    },
  ],
  myGroups: [],
};
const url = "https://796760ed-2bcd-46dd-a78d-93a1aa5eee60.mock.pstmn.io";

// 미들웨어
const createParty = (roomInfo) => {
  return function (dispatch, getState, { history }) {
    console.log("hello createParty");
    console.log(roomInfo);
    const myRoom = {
      title: roomInfo[0],
      categoryIds: roomInfo[1],
      menu: roomInfo[2],
      startAt: roomInfo[4],
      endAt: roomInfo[5],
      memberLimit: roomInfo[8],
      description: roomInfo[7],
      imageUrl: "",
      location: roomInfo[6],
    };
    axios({
      method: "get",
      url: `${url}/api/groups`,
      body: "myRoom",
    }).then((res) => {
      const list = res.data.groups;
      console.log(list);
      dispatch(createRoom(...list));
    });

    //history.push("/");
  };
};

const getOneGroupAxios = (id) => {
  return function (dispatch, getState, { history }) {
    console.log("hello getOneGroupAxios");
    axios
      .get(`${url}/api/groups/${id}`)
      .then((res) => {
        console.log(res);
        const list = res.data.groups;
        dispatch(createRoom(list));
      })
      .catch((err) => console.log(err.response));
  };
};
const getGroupsAxios = () => {
  return function (dispatch, getState, { history }) {
    console.log("hello getGroupsAxios");
    axios
      .get(`${url}/api/groups`)
      .then((res) => {
        const list = res.data.groups;
        dispatch(createRoom(...list));
      })
      .catch((err) => console.log(err.response));
  };
};
const patchGroupsAxios = () => {
  return function (dispatch, getState, { history }) {
    console.log("hello patchAxios");
  };
};
const deleteGroupsAxios = () => {
  return function (dispatch, getState, { history }) {
    console.log("hello deleteAxios");
  };
};

// 리듀서
export default handleActions(
  {
    [CREATE_GROUPS]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.groups = [...draft.groups, action.payload.groups];
      }),
    [GET_GROUPS]: (state, action) => produce(state, (draft) => {}),
    [PATCH_GROUPS]: (state, action) => produce(state, (draft) => {}),
    [DELETE_GROUPS]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = { createParty, getOneGroupAxios, getGroupsAxios };

export { actionCreators };
