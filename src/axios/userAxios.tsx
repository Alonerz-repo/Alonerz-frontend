import { api, instanse } from "../utils/api";
import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import cookie from "../utils/cookie";
import { kakaoRedirectUrl } from "../utils/config";

export const userState = {
  user: {
    userId: -1,
    nickname: "0",
    profileImageUrl: "",
    careerId: null,
    year: null,
    description: null,
    following: 0,
    follower: 0,
    point: 0,
  },
};
interface userInterface {
  userId: number;
  nickname: number;
  profileImageUrl: string;
  careerId: number;
  year: number;
  description: string;
  following: number;
  follower: number;
  point: number;
}
const appclone: userInterface[] = [
  {
    userId: -1,
    nickname: 0,
    profileImageUrl: "",
    careerId: 1,
    year: 0,
    description: "",
    following: 0,
    follower: 0,
    point: 0,
  },
];

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
    console.log("authUser data", data);
    return data;
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

  setFollowUser: async (userId: any) => {
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

  blockUser: async (userId: any) => {
    const url = getUrl(`/api/blocks/${userId}`);
    const headers = getHeaders();
    const body = {};
    const data = await axios
      .put(url, body, { headers })
      .then((res) => res)
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },

  getFollowUser: async (userId: any, follow: string) => {
    const url = getUrl(`/api/follows/${userId}?type=${follow}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => {
        console.log(res.data.users);

        return res;
      })
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },

  getBlockList: async () => {
    const url = getUrl("/api/blocks");
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res)
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },

  logout: async () => {
    const url = getUrl("/api/auth/logout");
    const headers = getHeaders();
    const data = await axios
      .delete(url, { headers })
      .then((res) => res)
      .catch((err) => err.response.data);

    const removeCookies = () => {
      cookie.remove("accessToken");
      cookie.remove("refreshToken");
      const user = {
        userId: -1,
        kakaoId: "",
        nickname: "",
      };
      return user;
    };
    return data.err ? errorHandler(data) : removeCookies();
  },

  login: () => {
    return (window.location.href = kakaoRedirectUrl);
  },
};

export default userAxios;
