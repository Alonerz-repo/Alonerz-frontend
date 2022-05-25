import { useState, useEffect } from "react";
import userAxios from "../axios/userAxios";

// 팔로우 리스트 요청 useHook입니다.
interface user {
  careerId: number;
  characterImageId: number;
  description: string;
  nickname: string;
  point: number;
  profileImageUrl: string | null;
  userId: string;
  yearId: number;
}
const initState: user = {
  careerId: 0,
  characterImageId: 0,
  description: "",
  nickname: "",
  point: 0,
  profileImageUrl: "",
  userId: "",
  yearId: 0,
};
const useFollow = (uid: string, isfollow: string) => {
  const [users, setUsers] = useState<user[]>([initState]);

  const getFollowers = async () => {
    await userAxios.getFollowers(uid).then((res) => setUsers([...res.users]));
  };
  const getFollowings = async () => {
    await userAxios.getFollowings(uid).then((res) => setUsers([...res.users]));
  };
  useEffect(() => {
    switch (isfollow) {
      case "follower":
        getFollowers();
        return;
      case "following":
        getFollowings();
        return;
    }
  }, [uid, isfollow]);
  return users;
};

export default useFollow;
