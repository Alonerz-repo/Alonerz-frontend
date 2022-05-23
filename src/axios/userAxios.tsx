import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import cookie from "../utils/cookie";
import { userExceptions } from "../exception/user.exception";

const userAxios = {
  // 사용자 프로필 수정  api
  // 파라미터 user => 객체
  setUser: (user: any) => {
    const url = getUrl("/api/users/profile");
    const headers = getHeaders();
    const data = axios
      .patch(url, user, { headers })
      .then((response) => response.data)
      .catch((error) => userExceptions.modify(error.response.data));
    return data;
  },
  //사용자 정보 조회 api
  // 파라미터 userId => string
  getUser: async (userId: any) => {
    const url = getUrl(`/api/users/${userId}/main`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => userExceptions.modify(err.response.data));

    return data;
  },
  // 사용자 팔로우 요청 api
  // 파라미터 userId => string
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
    return data;
  },
  // 사용자 차단 요청 api
  // 파라미터 userId => string
  setblockUser: async (userId: any) => {
    const url = getUrl(`/api/blocks/${userId}`);
    const headers = getHeaders();
    const body = {};
    const data = await axios
      .put(url, body, { headers })
      .then((res) => res)
      .catch((err) => err.response.data);
    return data;
  },
  //사용자 팔로우 정보 요청 api
  // 파라미터 userId => string, follow => follow || following
  getFollowUser: async (userId: any, follow: string) => {
    const url = getUrl(`/api/follows/${userId}?type=${follow}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res)
      .catch((err) => err.response.data);
    return data;
  },
  //사용자 차단 정보 요청 api
  getBlockList: async () => {
    const url = getUrl("/api/blocks");
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res)
      .catch((err) => err.response.data);
    return data;
  },
};

export default userAxios;
