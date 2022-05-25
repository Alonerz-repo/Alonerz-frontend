import { getHeaders, getUrl } from '../utils/api';
import axios from 'axios';

export const commentException = (err: any) => {
  const {
    response: {
      data: { error },
    },
  } = err;
  throw new Error(error);
};

const commentAxios = {
  //참가 방의 코멘트 리스트 받아오기
  getParentComments: async (groupId: string) => {
    const url = getUrl(`/api/comments/${groupId}`);
    const headers = getHeaders();
    let comments = [];
    try {
      const { data } = await axios.get(url, { headers });
      comments = data.comments;
    } catch (error) {
      commentException(error);
    }
    return comments;
  },

  //하위 코멘트 조회
  getChildComments: async (groupId: any, parentId: number) => {
    const url = getUrl(`/api/comments/${groupId}/${parentId}`);
    const headers = getHeaders();
    let comments = [];
    try {
      const { data } = await axios.get(url, { headers });
      comments = data.comments;
    } catch (error) {
      commentException(error);
    }
    return comments;
  },

  createParentComment: async (groupId: string, content: string) => {
    const url = getUrl(`/api/comments/${groupId}`);
    const headers = getHeaders();
    const body = { content };
    let comment = null;
    try {
      const { data } = await axios.post(url, body, { headers });
      comment = data;
    } catch (error) {
      commentException(error);
    }
    return comment;
  },

  createChildComment: async (
    groupId: any,
    parentId: number,
    content: string,
  ) => {
    const url = getUrl(`/api/comments/${groupId}/${parentId}`);
    const headers = getHeaders();
    const body = { content };
    let comment = null;
    try {
      const { data } = await axios.post(url, body, { headers });
      comment = data;
    } catch (error) {
      commentException(error);
    }
    return comment;
  },
  //코멘트 수정요청 api
  saveComment: async (commentId: number, content: string) => {
    const url = getUrl(`/api/comments/${commentId}`);
    const headers = getHeaders();
    const body = { content };
    try {
      await axios.patch(url, body, { headers });
    } catch (error) {
      commentException(error);
    }
    return;
  },

  //코멘트 삭제 요청 api
  removeComment: async (cmtId: any) => {
    const url = getUrl(`/api/comments/${cmtId}`);
    const headers = getHeaders();
    try {
      await axios.delete(url, { headers });
    } catch (error) {
      commentException(error);
    }
  },
};

export default commentAxios;
