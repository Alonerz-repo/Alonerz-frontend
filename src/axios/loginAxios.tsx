import { api, instanse } from "../utils/api";
import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import cookie from "../utils/cookie";
import { kakaoRedirectUrl } from "../utils/config";

const loginAxios = {
  //redirect axios
  login: () => {
    return (window.location.href = kakaoRedirectUrl);
  },
  //kakao login axsos
  kakaoLogin: async (id: any) => {
    const url = getUrl("/api/auth/login");
    const body = {
      kakaoId: id,
    };
    const data = await axios
      .post(url, body)
      .then((res) => {
        const { accessToken, refreshToken, needProfile } = res.data;

        cookie.set("accessToken", accessToken);
        cookie.set("refreshToken", refreshToken);
        return needProfile;
      })
      .catch((err) => err.response.data);
    return data;
  },
  //로그아웃 통신
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
    return data.err ? data : removeCookies();
  },
};

export default loginAxios;
