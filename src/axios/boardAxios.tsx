import { errorHandler, getHeaders, getUrl } from "../utils/api";
import axios from "axios";
import cookie from "../utils/cookie";
import { userExceptions } from "../exception/user.exception";

const boardAxios = {
  getSticker: async (userId: string) => {
    const url = getUrl(`/api/stickers/${userId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    return data;
  },

  getBoard: async (userId: string) => {
    const url = getUrl(`/api/users/${userId}/board`);
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
    const url = getUrl("/api/stickers");
    const body = sticker;
    const headers = getHeaders();
    const data = await axios
      .put(url, body, { headers })
      .then((res) => {
        return res.data;
      })
      .catch((err) => userExceptions.board(err.response.data));
    return data;
  },
};

export default boardAxios;
