import axios from "axios";
import { getCookie } from "../utils/cookie";

const url = process.env.REACT_APP_API_URL;
export const authAxios = {
  auth: async () => {
    console.log("~~~~~ auth Axios Action ~~~~~");
    const token = getCookie("accessToken");
    try {
      const response = await axios({
        method: "get",
        url: `${url}/api/auth`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err: any) {
      const stateCode = err.response.data.statusCode;
      switch (stateCode) {
        case 403:
          window.alert(err.response.data.message);
          return err.response.data;
        case 401:
          window.alert(err.response.data.message);
          return err.response.data;
        default:
          return;
      }
    }
  },
};
