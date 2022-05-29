import { Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import UserCardList from "./UserCardList";

interface UserListPageProps {
  type: "followings" | "followers" | "blocks";
  otherId: string;
}

const pageProps = {
  blocks: {
    text: "내 차단 목록",
  },
  followings: {
    text: "followings",
    type: "follow",
  },
  followers: {
    text: "followers",
    type: "follow",
  },
};

const UserListPage = () => {
  const params = useParams() as unknown as UserListPageProps;
  const { type } = params;

  if (!Object.keys(pageProps).includes(type)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header {...pageProps[type]} />
      <UserCardList {...params} />
    </>
  );
};

export default UserListPage;
