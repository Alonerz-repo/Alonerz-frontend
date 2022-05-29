import { useCallback, useEffect, useState } from "react";
import userAxios from "../../../axios/userAxios";
import { OtherUser } from "../../../axios/userAxios";
import EmptyContent from "../../../components/EmptyContent";
import UserCard from "../UserCard";

const UserBlockList = () => {
  const [users, setUsers] = useState<OtherUser[]>();

  const getBlockUsers = useCallback(async () => {
    try {
      const users = await userAxios.getBlockUsers();
      setUsers(users);
    } catch (error: any) {
      setUsers([]);
    }
  }, []);

  const reloadState = (otherId: string) => {
    setUsers(users?.filter((user) => user.userId !== otherId));
  };

  useEffect(() => {
    getBlockUsers();
    return () => {};
  }, [getBlockUsers]);

  if (!users) return <></>;
  if (users?.length === 0) {
    const emptyText = "아직 차단한 사용자가 없어요.";
    return <EmptyContent text={emptyText} />;
  }

  return (
    <>
      {users?.map((user, index) => (
        <UserCard
          key={`block-${user.userId}-${index}`}
          type="blocks"
          user={user}
          isOwn={true}
          reloadState={reloadState}
        />
      ))}
    </>
  );
};

export default UserBlockList;
