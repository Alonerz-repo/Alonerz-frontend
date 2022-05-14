import { api, instanse } from "../utils/api";

export const userState = {
  user: {
    userId: -1,
    nickname: "0",
    profileImageUrl: null,
    careerId: null,
    year: null,
    description: null,
    following: 0,
    follower: 0,
    point: 0,
  },
};

const userAxios = {
  getUser: async (user?: any) => {
    const response = await instanse
      .get("/users")
      .then((res) => res.data)
      .catch((err) => err.response.data);

    return response;
  },

  authUser: async (user?: any) => {
    const response = await instanse
      .get("/auth")
      .then((res) => {
        return res.data.auth;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return response;
  },
};

export default userAxios;
