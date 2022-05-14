import { api, instanse } from "../utils/api";
import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import cookie from "../utils/cookie";

export const userState = {
  user: {
    userId: -1,
    nickname: "0",
    profileImageUrl: null,
    careerId: null,
    year: null,
    description: null,
    following: 0,
    follower: 0,
    point: 0,
  },
};

const userAxios = {
  getUser: async (user?: any) => {
    const response = await instanse
      .get("/users")
      .then((res) => res.data)
      .catch((err) => err.response.data);

    return response;
  },

  authUser: async (user?: any) => {
    const url = getUrl(`/api/auth`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => {
        return res.data;
      })
      .catch((err) => err.response.data);

    return data.err ? errorHandler(data) : data;
  },

  refreshUser: async () => {
    const url = getUrl("/api/reissue");
    const token = cookie.get("refreshToken");
    const body = {
      refreshToken: token,
    };
    const headers = getHeaders();
    const data = await axios
      .post(url, body, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },

  otherUser: async (userId: any) => {
    const url = getUrl(`/api/users/${userId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    return data.err ? errorHandler(data) : data;
  },

  followUser: async (userId: any) => {
    const url = getUrl(`/api/follows/${userId}`);
    const headers = getHeaders();
    const body = {};
    const data = await axios
      .put(url, body, { headers })
      .then((res) => {
        return res;
      })
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },
};

export default userAxios;
