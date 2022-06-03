import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Login from "./pages/Login";
import CreateGroup from "./pages/CreateGroup";
import Redirect from "./pages/KakaoRedirectPage";
import UserConfig from "./pages/ConfigList";
import ProfileEdit from "./pages/ProflieEdit";
import ConsentForm from "./pages/ConsentForm";
import EditGroup from "./pages/EditGroup";
import GroupDetailPage from "./pages/GroupDetailPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import MainPage from "./pages/MainPage";
import GroupListPage from "./pages/GroupListPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ScrollTop from "./utils/ScrollTop";
import UserListPage from "./pages/UserListPage";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/introduce" element={<OnBoardingPage />} />
            <Route path="/coution" element={<ConsentForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/redirect" element={<Redirect />} />

            <Route path="/edit/partyInfo/:groupId" element={<EditGroup />} />

            <Route path="/groups/:time" element={<GroupListPage />} />
            <Route path="/group">
              <Route path="create/:option" element={<CreateGroup />} />
              <Route path=":groupId" element={<GroupDetailPage />} />
            </Route>

            <Route path="/user">
              <Route path="edit" element={<ProfileEdit />} />
              <Route path="config" element={<UserConfig />} />
              <Route path="profile/edit" element={<ProfileEditPage />} />
              <Route path=":userId" element={<User />} />
            </Route>

            <Route path="/users">
              <Route path=":type" element={<UserListPage />}>
                <Route path=":otherId" element={<UserListPage />} />
              </Route>
            </Route>

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
