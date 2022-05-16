import { useState, useEffect } from "react";
import userAxiso from "../axios/userAxios";

const initUser = [
  {
    careerId: null,
    description: null,
    nickname: "asd",
    point: 0,
    profileImageUrl: null,
    userId: -1,
    year: null,
  },
];

const GetFollowList = (userId: any, isFollow: string) => {
  const [list, setList] = useState(initUser);
  useEffect(() => {
    userAxiso.getFollowUser(userId, isFollow).then((res) => {
      console.log("res", res.data.users);
      setList(res.data.users);
    });
  }, []);
  return list;
};

export default GetFollowList;
