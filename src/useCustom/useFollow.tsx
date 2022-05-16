import { useState, useEffect } from "react";
import userAxios from "../axios/userAxios";

const useFollow = (uid: string, isfollow: string) => {
  const [userList, setUserList] = useState<any>();
  useEffect(() => {
    const getUser = async () => {
      const data = await userAxios
        .getFollowUser(uid, isfollow)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      setUserList(data);
      return data ? setUserList(data) : data;
    };
    getUser();
  }, []);
  return userList;
};

export default useFollow;
