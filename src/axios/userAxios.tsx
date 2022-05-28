import { getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import { userExceptions } from "../exception/user.exception";

export interface UserProfile {
  userId: string;
  nickname: string;
  careerId: number;
  yearId: number;
  description: string;
  point: number;
  profileImageUrl: string;
}

interface SaveUserProfile {
  nickname: string | undefined;
  careerId: number | undefined;
  yearId: number | undefined;
  description: string | undefined;
}

const userAxios = {
  // 사용자 프로필 수정  api
  // 파라미터 user => 객체
  setUser: (user: any) => {
    console.log(user);
    const url = getUrl("/api/users/profile");
    const headers = getHeaders();
    const data = axios
      .patch(url, user, { headers })
      .then((response) => response.data)
      .catch((error) => userExceptions.modify(error.response.data));
    return data;
  },
  // 프로필 정보 받아오기
  getUserProfile: async (userId: any) => {
    const url = getUrl(`/api/users/${userId}/profile`);
    const headers = getHeaders();
    let user: UserProfile;
    try {
      const { data } = await axios.get(url, { headers });
      user = data.user;
    } catch (error: any) {
      const {
        response: { data },
      } = error;
      throw data;
    }
    return user;
  },
  // 프로필 정보 수정하기
  updateUserProfile: async (userProfile: SaveUserProfile) => {
    console.log(userProfile);
    const url = getUrl(`/api/users/profile`);
    const headers = getHeaders();
    try {
      await axios.patch(url, userProfile, { headers });
    } catch (error: any) {
      const {
        response: { data },
      } = error;
      throw data;
    }
  },
  // 프로필 이미지 등록하기
  uploadProfileImage: async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    const url = getUrl(`/api/users/profileImage`);
    const headers = { ...getHeaders(), "Content-Type": "multipart/form-data" };
    let profileImageUrl: string;
    try {
      const { data } = await axios.patch(url, formData, { headers });
      profileImageUrl = data.profileImageUrl;
    } catch (error: any) {
      const {
        response: { data },
      } = error;
      throw data;
    }
    return profileImageUrl;
  },
  deleteProfileImage: async () => {
    const url = getUrl(`/api/users/profileImage`);
    const headers = getHeaders();
    try {
      await axios.delete(url, { headers });
    } catch (error: any) {
      const {
        response: { data },
      } = error;
      throw data;
    }
  },
  //사용자 정보 조회 api
  // 파라미터 userId => string
  getUser: async (userId: any) => {
    const url = getUrl(`/api/users/${userId}/main`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => {
        return res.data;
      })
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
      .catch((err) => userExceptions.follow(err.response.data));
    return data;
  },

  // 사용자 차단 요청 api
  // 파라미터 userId => string
  setblockUser: async (userId: string) => {
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
  getFollowings: async (userId: string) => {
    const url = getUrl(`/api/follows/${userId}/followings`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => userExceptions.follow(err.response.data));
    return data;
  },

  getFollowers: async (userId: string) => {
    const url = getUrl(`/api/follows/${userId}/followers`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => userExceptions.follow(err.response.data));
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
