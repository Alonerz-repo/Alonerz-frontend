import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodayGroup, groupAxios } from "../../axios/groupAxios";
import { useAppSelect } from "../../store/config.hook";
import { CardImagesModule } from "./images";
import TodayOtherGroupCard from "./TodayOtherGroupCard";
import TodayOwnGroupCards from "./TodayOwnGroupCards";
import Header from "../../components/Header";
import * as Style from "./styled";

interface CardClickEvents {
  lunchCreateClick(): void;
  lunchEnterClick(): void;
  dinnerCreateClick(): void;
  dinnerEnterClick(): void;
}

// 최원영
const otherGroupCardProps = (cardClickEvents: CardClickEvents) => [
  {
    title: "아침 & 점심 모임",
    subTitle: " 오전 9시 ~ 오후 5시",
    image: CardImagesModule.lunch,
    buttonColor: "248, 76, 64",
    fontColor: "#000",
    onCreate: cardClickEvents.lunchCreateClick,
    onEnter: cardClickEvents.lunchEnterClick,
  },
  {
    title: "저녁 & 야식 모임",
    subTitle: "오후 5시 ~ 오후 11시",
    image: CardImagesModule.dinner,
    buttonColor: "88, 37, 200",
    fontColor: "#fff",
    onCreate: cardClickEvents.dinnerCreateClick,
    onEnter: cardClickEvents.dinnerEnterClick,
  },
];

const MainPage = () => {
  const navigate = useNavigate();
  const user = useAppSelect((state) => state.user);
  const [groups, setGroups] = useState<TodayGroup[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("__alonerz__visit__")) {
      return navigate("/introduce");
    }

    if (!user.userId) {
      return navigate("/login");
    }

    const { needProfile } = user;
    if (needProfile) {
      return navigate("/user/config/edit");
    }

    const getGroups = async () => {
      try {
        const groups = await groupAxios.getMyGroups();
        setGroups(groups);
      } catch (error: any) {
        const { statusCode } = error;
        switch (statusCode) {
          case 401:
            return navigate("/login");
          case 403:
            return navigate("");
          default:
            return;
        }
      }
    };
    getGroups();
    return () => {};
  }, [navigate, user]);

  const onCreateLunchGroupClick = () => navigate("/group/create/lunch");
  const onEnterLunchGroupClick = () => navigate("/groups/lunch");
  const onCreateDinnerGroupClick = () => navigate("/group/create/dinner");
  const onEnterDinnerGroupClick = () => navigate("/groups/dinner");

  const renderTodayGroupCard = () => {
    const count = groups.length;
    const todayGroupCardsProps = { groups, count, navigate };
    const visible = user.userId && count;
    return (
      <>
        {visible ? (
          <>
            <Style.GroupCardHeader>
              <Style.GroupCardBadge>D-day</Style.GroupCardBadge>
              <Style.GroupCardTitle>
                오늘 참여할 파티가 있어요!
              </Style.GroupCardTitle>
            </Style.GroupCardHeader>
            <TodayOwnGroupCards {...todayGroupCardsProps} />
          </>
        ) : null}
      </>
    );
  };

  const renderOtherGroupCards = () => {
    const cardClickEvents: CardClickEvents = {
      lunchCreateClick: onCreateLunchGroupClick,
      lunchEnterClick: onEnterLunchGroupClick,
      dinnerCreateClick: onCreateDinnerGroupClick,
      dinnerEnterClick: onEnterDinnerGroupClick,
    };
    return (
      <>
        <Style.GroupCardHeader>
          <Style.GroupCardTitle>
            🎉 여러분을 기다리고 있는 파티가 있어요!
          </Style.GroupCardTitle>
        </Style.GroupCardHeader>
        {otherGroupCardProps(cardClickEvents).map((props, index) => (
          <TodayOtherGroupCard key={`${props.title}-${index}`} {...props} />
        ))}
      </>
    );
  };

  return (
    <Style.MainWrapper>
      <Header text="Alonerz" type="main" />
      {renderTodayGroupCard()}
      {renderOtherGroupCards()}
    </Style.MainWrapper>
  );
};

export default MainPage;
