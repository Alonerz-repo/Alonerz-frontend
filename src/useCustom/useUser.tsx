import { useState, useEffect } from "react";
import userAxios from "../axios/userAxios";
import { useAppSelect } from "../store/config.hook";

//유저 정보를 불러오는 커스텀 훅입니다.

const initState = {
  careerId: 1,
  description: "",
  follower: 0,
  followers: [],
  following: 0,
  nickname: "",
  point: 0,
  profileImageUrl: "",
  userId: "0",
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
  }, []);
  return user;
};
export default useUser;
