import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import cookie from "../utils/cookie";
import { userExceptions } from "../exception/user.exception";

const boardAxios = {
  getSticker: async (userId: string) => {
    const url = getUrl(`/api/sticker/${userId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    return data;
  },

  setBoard: async (board: any) => {
    const url = getUrl("/api/users/board");
    const body = {
      characterImageId: board.characterImageId,
      backgroundColorId: board.backgroundColorId,
    };
    const headers = getHeaders();
    const data = await axios
      .patch(url, body, { headers })
      .then((res) => res.data)
      .catch((err) => userExceptions.board(err.response.data));
    return data;
  },

  setSticker: async (sticker: any) => {
    const url = getUrl("/api/sticker");
    const body = {
      sticker,
    };
    const headers = getHeaders();
    const data = await axios
      .post(url, body, { headers })
      .then((res) => res.data)
      .catch((err) => userExceptions.board(err.response.data));
  },
};

export default boardAxios;
