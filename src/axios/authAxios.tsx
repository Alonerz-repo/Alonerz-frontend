import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import cookie from "../utils/cookie";

const userAxios = {
  //사용자 인증 api
  authUser: async () => {
    const url = getUrl(`/api/auth`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => {
        return res.data;
      })
      .catch((err) => err.response.data);
    return data;
  },
  //사용자 리프레시토큰 api
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
    return data;
  },
};

export default userAxios;
