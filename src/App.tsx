import { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import User from "./pages/User";
import Login from "./pages/Login";
import CreateGroup from "./pages/CreateGroup";
import Redirect from "./pages/KakaoRedirectPage";
import UserConfig from "./pages/ConfigList";
import ProfileEdit from "./pages/ProflieEdit";
import ConsentForm from "./pages/ConsentForm";
import BlockList from "./pages/BlockList";
import FollowLIst from "./pages/FollowList";
import EditGroup from "./pages/EditGroup";
import Chatting from "./pages/Chatting";
import ChatList from "./pages/ChatList";
import Four from "./pages/404";
import { authUser } from "./store/slices/userSlice";
import { useAppDispatch } from "./store/config.hook";
import GroupDetailPage from "./pages/GroupDetailPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import MainPage from "./pages/MainPage";
import GroupListPage from "./pages/GroupListPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ScrollTop from "./utils/ScrollTop";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/introduce" element={<OnBoardingPage />} />
            <Route path="/coution" element={<ConsentForm />} />
            <Route path="/groups/:time" element={<GroupListPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/user/:userId/follow" element={<FollowLIst />} />
            <Route path="/user/config" element={<UserConfig />} />
            <Route path="/user/profile/edit" element={<ProfileEditPage />} />
            <Route path="/user/config/blocklist" element={<BlockList />} />
            <Route path="/user/edit" element={<ProfileEdit />} />
            <Route path="/group/create/:option" element={<CreateGroup />} />
            <Route path="/chat" element={<Chatting />} />
            <Route path="/chatlist" element={<ChatList />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/group/:groupId" element={<GroupDetailPage />} />
            <Route path="/edit/partyInfo/:groupId" element={<EditGroup />} />
            <Route path="/404" element={<Four />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width ?? "390px"};
  height: ${(props) => props.height ?? "100vh"};
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: scroll;
  background: #fff;
  @media screen and (max-width: 420px) {
    width: 100%;
    height: 100vh;
  }
`;

interface ContainerProps {
  width?: string;
  height?: string;
}

export default App;
