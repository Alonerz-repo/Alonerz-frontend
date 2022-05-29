import { useCallback, useEffect, useState } from "react";
import { OtherUser } from "../../../axios/userAxios";
import userAxios from "../../../axios/userAxios";
import EmptyContent from "../../../components/EmptyContent";
import UserCard from "../UserCard";

interface OwnFollowListProps {
  userId: string;
}

const OwnFollowingList = (props: OwnFollowListProps) => {
  const { userId } = props;
  const [users, setUsers] = useState<OtherUser[]>();

  const getFollowingUsers = useCallback(async () => {
    try {
      const users = await userAxios.getFollowingUsers(userId);
      setUsers(users);
    } catch (error: any) {
      setUsers([]);
    }
  }, [userId]);

  const reloadState = (otherId: string) => {
    setUsers(users?.filter((user) => user.userId !== otherId));
  };

  useEffect(() => {
    getFollowingUsers();
    return () => {};
  }, [getFollowingUsers]);

  const renderUserList = () => {
    if (!users) return <></>;
    if (users?.length === 0) {
      const emptyText =
        "팔로잉이 없어요.\n함께하고 싶은 파티원들을 채워주세요!";
      return <EmptyContent text={emptyText} />;
    }

    return (
      <>
        {users?.map((user, index) => (
          <UserCard
            key={`followings-${user.userId}-${index}`}
            type="followings"
            isOwn={true}
            user={user}
            reloadState={reloadState}
          />
        ))}
      </>
    );
  };

  return renderUserList();
};

export default OwnFollowingList;
