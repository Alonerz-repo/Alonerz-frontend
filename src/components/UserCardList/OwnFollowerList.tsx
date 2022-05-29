import { useCallback, useEffect, useState } from "react";
import { OtherUser } from "../../axios/userAxios";
import userAxios from "../../axios/userAxios";
import EmptyContent from "../EmptyContent";
import UserCard from "../UserCard";

interface OwnFollowListProps {
  userId: string;
}

const OwnFollowerList = (props: OwnFollowListProps) => {
  const { userId } = props;
  const [myFollowingUsers, setMyFollowingUsers] = useState<OtherUser[]>([]);
  const [users, setUsers] = useState<OtherUser[]>();

  const getFollowingUsers = useCallback(async () => {
    try {
      const followings = await userAxios.getFollowingUsers(userId);
      const users = await userAxios.getFollowerUsers(userId);
      setMyFollowingUsers(followings);
      setUsers(users);
    } catch (error: any) {
      setUsers([]);
    }
  }, [userId]);

  const reloadState = (otherId: string) => {
    const following = myFollowingUsers.find((user) => user.userId === otherId);
    if (!following) {
      return setMyFollowingUsers([
        ...myFollowingUsers,
        users?.find((user) => user.userId === otherId) as OtherUser,
      ]);
    }
    setMyFollowingUsers(
      myFollowingUsers.filter((user) => user.userId !== otherId),
    );
  };

  useEffect(() => {
    getFollowingUsers();
    return () => {};
  }, [getFollowingUsers]);

  const renderUserList = () => {
    if (!users) return <></>;
    if (users?.length === 0) {
      const emptyText =
        "팔로워가 없어요.\n적극적인 활동을 통해 팔로워를 채워보세요!";
      return <EmptyContent text={emptyText} />;
    }

    return (
      <>
        {users?.map((user, index) => {
          const { userId } = user;
          const isFollowing = Boolean(
            myFollowingUsers.find((other) => other.userId === userId),
          );
          return (
            <UserCard
              key={`followers-${user.userId}-${index}`}
              type="followers"
              user={user}
              isOwn={true}
              isFollowing={isFollowing}
              reloadState={reloadState}
            />
          );
        })}
      </>
    );
  };

  return renderUserList();
};

export default OwnFollowerList;
