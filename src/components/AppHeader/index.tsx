import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderModule from "../../assets/header";

const Wrapper = styled.div`
  width: 100%;
  max-width: 390px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  background: #eee;
  padding: 10px 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  padding: 5px;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 10%);
  }
  cursor: pointer;
  margin: 0 5px;
`;

interface IconProps {
  icon: string;
}

const Icon = styled.div<IconProps>`
  width: 20px;
  height: 20px;
  background: url(${(props) => props.icon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const icons = HeaderModule.rows;
const BackIcon = () => <Icon icon={icons[0].image} />;
const HomeIcon = () => <Icon icon={icons[1].image} />;
const UserIcon = () => <Icon icon={icons[2].image} />;
// const SearchIcon = () => <Icon icon={icons[3].image} />;
const SettingIcon = () => <Icon icon={icons[4].image} />;
// const MenuIcon = () => <Icon icon={icons[5].image} />;

const Title = styled.div`
  width: 100%;
  margin: 0 10px;
`;

interface Header {
  pathname: string;
  title: string;
  icons: {
    to: string;
    render(): JSX.Element;
  }[];
  buttons: {
    label: string;
    color: "#bdbdbd" | "#f84c40";
    onClick(): any;
  }[];
}

const Headers = (param: string = "") => ({
  rows: [
    {
      pathname: "/",
      title: "Alonerz",
      icons: [
        { to: `/user/${param}`, render: UserIcon },
        { to: `/setting`, render: SettingIcon },
      ],
      buttons: [],
    },
    {
      pathname: `/user/${param}`,
      title: "프로필",
      icons: [
        { to: `/`, render: HomeIcon },
        { to: `/setting`, render: SettingIcon },
      ],
      buttons: [],
    },
    {
      pathname: `/setting`,
      title: "설정",
      icons: [],
      buttons: [],
    },
    {
      pathname: `/user/profile/edit`,
      title: "내 정보 수정",
      icons: [
        { to: `/`, render: HomeIcon },
        { to: `/setting`, render: SettingIcon },
      ],
      buttons: [],
    },
  ],
  current: function (pathname: string): Header {
    const header = this.rows.find((row) => row.pathname === pathname);
    if (!header) {
      throw Error(`Unexpected Header Icons : ${pathname}`);
    }
    return header;
  },
});

const AppHeader = () => {
  const { pathname } = useLocation();
  const params = useParams;
  const navigate = useNavigate();

  const isHome = pathname === "/";
  const header = Headers(Object.values(params).join("/")).current(pathname);

  const onBackClick = () => navigate(-1);
  const onIconClick = (to: string) => navigate(to);

  return (
    <Wrapper>
      <IconWrapper onClick={onBackClick}>{!isHome && BackIcon()}</IconWrapper>
      <Title>{header.title}</Title>
      {header.icons.map((icon) => {
        const { to, render } = icon;
        return (
          <IconWrapper onClick={() => onIconClick(to)}>{render()}</IconWrapper>
        );
      })}
    </Wrapper>
  );
};

export default AppHeader;
