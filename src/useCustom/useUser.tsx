import { useState, useEffect } from "react";
import userAxios from "../axios/userAxios";

//유저 정보를 불러오는 커스텀 훅입니다.

const initState = {
  careerId: -1,
  description: "",
  follower: 0,
  followers: [],
  following: 0,
  nickname: "",
  point: 0,
  profileImageUrl: "",
  userId: "-1",
  year: "신입",
};

const useUser = (uid: any) => {
  const [user, setUser] = useState(initState);
  useEffect(() => {
    const data = async () => {
      const response = await userAxios
        .getUser(uid)
        .then((res) => res.user)
        .catch((res) => res.response.data);
      return response ? setUser(response) : setUser(initState);
    };
    data();
  }, []);
  return user;
};

export default useUser;
