import axios from "axios";
import { Cookies } from "react-cookie";

const api = (() => {
  const cookies = new Cookies();
  const accessToken = cookies.get("alonerz_access");
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return axios;
})();

export { api };
