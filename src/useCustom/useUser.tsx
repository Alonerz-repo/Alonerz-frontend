import { useState, useEffect } from "react";
import userAxios from "../axios/userAxios";

//유저 정보를 불러오는 커스텀 훅입니다.

const initState = {
  backgroundColorId: 0,
  careerId: 0,
  characterImageId: 0,
  description: "",
  followerUserCount: 0,
  followingUserCount: 0,
  isFollower: false,
  isFollowing: false,
  nickname: "",
  point: 0,
  stickers: [],
  userId: "",
  yearId: 0,
};

const useUser = (userId: any) => {
  const [user, setUser] = useState(initState);
  useEffect(() => {
    const data = async () => {
      const response = await userAxios
        .getUser(userId)
        .then((res) => {
          return res.user;
        })
        .catch((res) => res.response.data);

      return response ? setUser(response) : setUser(initState);
    };
    data();
  }, [userId]);
  return user;
};
export default useUser;
