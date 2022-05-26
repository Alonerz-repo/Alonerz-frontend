import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { NavigateFunction } from "react-router-dom";
import * as Style from "./styled";

interface TodayOwnGroupCardProps {
  visible: boolean;
  groupId: string;
  title: string;
  imageUrl: string | null;
  address: string;
  timeString: string;
  onPreClick(): void;
  onNextClick(): void;
  navigate: NavigateFunction;
}

const TodayOwnGroupCard = (props: TodayOwnGroupCardProps) => {
  const {
    visible,
    groupId,
    imageUrl,
    title,
    address,
    timeString,
    onPreClick,
    onNextClick,
    navigate,
  } = props;

  const groupItemProps = { visible };
  const coverProps = { imageUrl };
  const contentProps = {
    style: { color: "#fff" },
    onClick: () => navigate(`/participate/${groupId}`),
  };
  const buttonWrapperProps = {
    style: { justifyContent: "space-between" },
  };

  return (
    <Style.GroupItemWrapper {...groupItemProps}>
      <Style.GroupImageWrapper {...coverProps}>
        <Style.GroupButtonWrapper {...buttonWrapperProps}>
          <Style.GroupIonButton onClick={onPreClick}>
            <ArrowBackIosRoundedIcon />
          </Style.GroupIonButton>
          <Style.GroupIonButton onClick={onNextClick}>
            <ArrowForwardIosRoundedIcon />
          </Style.GroupIonButton>
        </Style.GroupButtonWrapper>
        <Style.GroupContentWrapper {...contentProps}>
          <Style.GroupTitle>{title}</Style.GroupTitle>
          <Style.GroupSubTitle>
            {address} | {timeString}
          </Style.GroupSubTitle>
        </Style.GroupContentWrapper>
      </Style.GroupImageWrapper>
    </Style.GroupItemWrapper>
  );
};

export default TodayOwnGroupCard;
