import { getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import cookie from "../utils/cookie";
import { kakaoRedirectUrl } from "../utils/config";

const loginAxios = {
  //카카오페이지로 리다이렉트
  kakaoLogin: () => {
    return (window.location.href = kakaoRedirectUrl);
  },
  //받은 카카오아이디로 백엔드로 로그인 요청
  //파라미터 id => string || number
  //ex> kakaoId = 1234566
  Login: async (id: any) => {
    const url = getUrl("/api/auth/login");
    const body = {
      kakaoId: id,
    };
    const data = await axios
      .post(url, body)
      .then((res) => {
        const { accessToken, refreshToken } = res.data;

        cookie.set("accessToken", accessToken);
        cookie.set("refreshToken", refreshToken);
      })
      .catch((err) => err.response.data);
    console.log(data);
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
        userId: "-1",
        kakaoId: "",
        nickname: "",
      };
      return user;
    };
    return data.err ? data : removeCookies();
  },

  unlink: async () => {
    const url = getUrl("/api/auth/unlink");
    const headers = getHeaders();
    const data = await axios
      .delete(url, { headers })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => err.response.data);
    return data;
  },
};

export default loginAxios;
