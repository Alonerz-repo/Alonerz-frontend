import { useCallback, useEffect, useState } from "react";
import { OtherUser } from "../../axios/userAxios";
import userAxios from "../../axios/userAxios";
import EmptyContent from "../EmptyContent";
import UserCard from "../UserCard";

interface OtherFollowingListProps {
  yourId: string;
  otherId: string;
}

const OtherFollowingList = (props: OtherFollowingListProps) => {
  const { yourId, otherId } = props;
  const [yourFollowingUsers, setYourFollowingUsers] = useState<OtherUser[]>([]);
  const [yourFollowerUsers, setYourFollowerUsers] = useState<OtherUser[]>([]);
  const [otherFollowings, setOtherFollowings] = useState<OtherUser[]>();

  const getFollowingUsers = useCallback(async () => {
    try {
      const followings = await userAxios.getFollowingUsers(yourId);
      const followers = await userAxios.getFollowerUsers(yourId);
      const users = await userAxios.getFollowingUsers(otherId);
      setYourFollowingUsers(followings);
      setYourFollowerUsers(followers);
      setOtherFollowings(users);
    } catch (error: any) {
      setOtherFollowings([]);
    }
  }, [yourId, otherId]);

  useEffect(() => {
    getFollowingUsers();
    return () => {};
  }, [getFollowingUsers]);

  const reloadState = (userId: string, isFollowing: boolean) => {
    if (isFollowing) {
      return setYourFollowingUsers(
        yourFollowingUsers.filter((user) => user.userId !== userId),
      );
    }

    const user = otherFollowings?.find(
      (user) => user.userId === userId,
    ) as OtherUser;

    setYourFollowingUsers([...yourFollowingUsers, user]);
  };

  const renderUserList = () => {
    if (!otherFollowings) return <></>;
    if (otherFollowings?.length === 0) {
      const emptyText = "팔로잉이 없어요.\n먼저 팔로우를 신청해보세요!";
      return <EmptyContent text={emptyText} />;
    }

    return (
      <>
        {otherFollowings?.map((user, index) => {
          const { userId } = user;
          const isYou = yourId === userId;
          const isFollowing = Boolean(
            yourFollowingUsers.find((other) => other.userId === userId),
          );
          const isFollower = Boolean(
            yourFollowerUsers.find((other) => other.userId === userId),
          );
          return (
            <UserCard
              key={`other-followings-${user.userId}-${index}`}
              type="followings"
              user={user}
              isOwn={false}
              isYou={isYou}
              isFollowing={isFollowing}
              isFollower={isFollower}
              reloadState={reloadState}
            />
          );
        })}
      </>
    );
  };

  return renderUserList();
};

export default OtherFollowingList;
