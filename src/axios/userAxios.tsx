import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";

const userAxios = {
  // 사용자 프로필 수정  api
  setUser: async (user: any) => {
    const url = getUrl("/api/users");
    const headers = getHeaders();
    const data = await axios
      .patch(url, user, { headers })
      .then((res) => res)
      .catch((err) => err.response.data);
    return data;
  },
  //사용자 정보 조회 api
  getUser: async (userId: any) => {
    const url = getUrl(`/api/users/${userId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    return data;
  },
  // 사용자 팔로우 요청 api
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
