import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";

const userAxios = {
  //참가 방의 코멘트 리스트 받아오기
  getCommentList: async (roomId: any) => {
    const url = getUrl(`/api/comments/${roomId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return data;
  },
  //코멘트 등록
  setComment: async (roomId: any, content: any) => {
    const url = getUrl(`/api/comments/${roomId}`);
    const headers = getHeaders();
    const body = { content };
    const data = await axios
      .post(url, body, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return data;
  },
  //하위 코멘트 조회
  getChildComment: async (roomId: any, cmtNum: number) => {
    const url = getUrl(`/api/comments/${roomId}/${cmtNum}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return data;
  },

  setChildComment: async (roomId: any, parentId: any, content: any) => {
    const url = getUrl(`/api/comments/${roomId}/${parentId}`);
    const headers = getHeaders();
    const body = { content };
    const data = await axios
      .post(url, body, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return data;
  },

  //코멘트 수정요청 api
  editComment: async (cmtId: any, content: any) => {
    const url = getUrl(`/api/comments/${cmtId}`);
    const headers = getHeaders();
    const body = { content };
    const data = await axios
      .patch(url, body, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return data;
  },

  //코멘트 삭제 요청 api
  removeComment: async (cmtId: any) => {
    const url = getUrl(`/api/comments/${cmtId}`);
    const headers = getHeaders();
    const data = await axios
      .delete(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return data;
  },
};

export default userAxios;
