import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useFollow from "../useCustom/useFollow";
import { useLocation } from "react-router-dom";
import CareerModule from "../assets/career";
import FollowUser from "../components/Follow";
import src from "../assets/Character";

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
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    switch (isfollow) {
      case "following":
        return setTitle("팔로잉");
      case "follower":
        return setTitle("팔로워");
    }
  }, []);

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
    if (users !== undefined && users.length > 0) {
      const results = users.map((value: user, key: number) => {
        const { careerId, userId } = value;
        const groupItem = CareerModule.findById(careerId);
        const isfolo = isFollow(userId);

        return (
          <React.Fragment key={key}>
            <FollowUser
              isfolo={isfolo}
              uid={uid}
              user={value}
              groupItem={groupItem}
            />
          </React.Fragment>
        );
      });
      return results;
    } else {
      return (
        <React.Fragment>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{ position: "absolute", top: "20vh", textAlign: "center" }}
            >
              <img style={{ width: "130px" }} src={src[0]} alt="" />{" "}
              {isfollow === "following" ? (
                <React.Fragment>
                  <p>팔로잉이 없어요</p>
                  <p>함께하고 싶은 나의 파티원들을 채워주세요</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p>팔로워이 없어요</p>
                  <p>함께하고 싶은 나의 파티원들을 채워주세요</p>
                </React.Fragment>
              )}
            </div>
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Header text={title}></Header>
      {renderUsers()}
    </React.Fragment>
  );
};

export default FollowList;
