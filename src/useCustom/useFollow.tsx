import { useState, useEffect } from "react";
import userAxios from "../axios/userAxios";

// 팔로우 요청 api 커스텀 훅입니다.
const useFollow = (uid: string, isfollow: string) => {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const getUser = async () => {
      const { users, message } = await userAxios
        .getFollowUser(uid, isfollow)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return users ? setUsers(users) : console.log(message);
    };
    getUser();
  }, [uid, isfollow]);
  return users;
};

export default useFollow;
