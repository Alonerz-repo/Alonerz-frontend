import React from "react";
import Header from "../components/Header";
import useFollow from "../useCustom/useFollow";
import { useLocation } from "react-router-dom";
import { careerUtils } from "../utils/asset";
import FollowUser from "../components/Follow";

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

const FollowList = () => {
  //상위 연결된 컴포넌트에서 navigate 옵션값으로 들어온 데이터를 uselocation함수로 받습니다.
  const { state }: any = useLocation();
  const { uid, isfollow } = state;

  //유저의 팔로우/팔로잉 리스트를 커스텀 훅으로 받습니다.
  const users = useFollow(uid, isfollow);
  const myFollowingList = useFollow(uid, "following");

  const isFollow = (userId: string) => {
    const myfollowid = myFollowingList?.find(
      (value) => value.userId === userId
    );
    if (myfollowid !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const renderUsers = () => {
    if (users !== undefined) {
      const results = users.map((value: user, key: number) => {
        const { careerId, userId } = value;
        const groupItem = careerUtils.findById(careerId);
        const isfolo = isFollow(userId);

        return (
          <FollowUser
            isfolo={isfolo}
            uid={uid}
            user={value}
            groupItem={groupItem}
          />
        );
      });
      return results;
    } else {
      return (
        <React.Fragment>
          함께하고 싶은 나만의 파티원을 채우길바람
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Header text={isfollow}></Header>
      {renderUsers()}
    </React.Fragment>
  );
};

export default FollowList;
