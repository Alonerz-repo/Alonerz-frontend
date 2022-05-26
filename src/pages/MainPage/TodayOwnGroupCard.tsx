import { IconImageModule } from "./images";
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
  const preButtonProps = {
    onClick: onPreClick,
    image: IconImageModule.LeftArrowIcon,
  };
  const nextButtonProps = {
    onClick: onNextClick,
    image: IconImageModule.RightArrowIcon,
  };

  return (
    <Style.GroupItemWrapper {...groupItemProps}>
      <Style.GroupImageWrapper {...coverProps}>
        <Style.GroupButtonWrapper {...buttonWrapperProps}>
          <Style.GroupIonButton {...preButtonProps} />
          <Style.GroupIonButton {...nextButtonProps} />
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
