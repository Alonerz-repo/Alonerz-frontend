import { useCallback, useEffect, useState } from "react";
import { OtherUser } from "../../axios/userAxios";
import userAxios from "../../axios/userAxios";
import EmptyContent from "../EmptyContent";
import UserCard from "../UserCard";

interface OtherFollowerListProps {
  yourId: string;
  otherId: string;
}

const OtherFollowerList = (props: OtherFollowerListProps) => {
  const { yourId, otherId } = props;
  const [yourFollowingUsers, setYourFollowingUsers] = useState<OtherUser[]>([]);
  const [yourFollowerUsers, setYourFollowerUsers] = useState<OtherUser[]>([]);
  const [otherFollowers, setOtherFollowers] = useState<OtherUser[]>();

  const getFollowerUsers = useCallback(async () => {
    try {
      const followings = await userAxios.getFollowingUsers(yourId);
      const followers = await userAxios.getFollowerUsers(yourId);
      const users = await userAxios.getFollowerUsers(otherId);
      setYourFollowingUsers(followings);
      setYourFollowerUsers(followers);
      setOtherFollowers(users);
    } catch (error: any) {
      setOtherFollowers([]);
    }
  }, [yourId, otherId]);

  useEffect(() => {
    getFollowerUsers();
    return () => {};
  }, [getFollowerUsers]);

  const reloadState = (userId: string, isFollowing: boolean) => {
    if (isFollowing) {
      return setYourFollowingUsers(
        yourFollowingUsers.filter((user) => user.userId !== userId),
      );
    }

    const user = otherFollowers?.find(
      (user) => user.userId === userId,
    ) as OtherUser;

    setYourFollowingUsers([...yourFollowingUsers, user]);
  };

  const renderUserList = () => {
    if (!otherFollowers) return <></>;
    if (otherFollowers?.length === 0) {
      const emptyText = "팔로워가 없어요.\n먼저 팔로우를 신청해보세요!";
      return <EmptyContent text={emptyText} />;
    }

    return (
      <>
        {otherFollowers?.map((user, index) => {
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
              key={`other-followers-${user.userId}-${index}`}
              type="followers"
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

export default OtherFollowerList;
