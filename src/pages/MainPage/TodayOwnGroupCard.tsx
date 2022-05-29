import { IconImageModule } from "./images";
import { NavigateFunction } from "react-router-dom";
import CategoryModule from "../../assets/category";
import GroupImageModule from "../../assets/group";
import * as Style from "./styled";
import { TimeFormatter, TimeGetter } from "../../utils/tools/formatter";
import { CheckJoinable } from "../../utils/tools/calculator";

interface TodayOwnGroupCardProps {
  groupId: string;
  title: string;
  imageUrl: string | null;
  address: string;
  categoryId: number;
  startAt: Date;
  endAt: Date;
  onPreClick(): void;
  onNextClick(): void;
  navigate: NavigateFunction;
}

interface CategoryRow {
  image: string;
  item: string;
}

// 최원영
const TodayOwnGroupCard = (props: TodayOwnGroupCardProps) => {
  const {
    groupId,
    imageUrl,
    title,
    address,
    categoryId,
    startAt,
    endAt,
    onPreClick,
    onNextClick,
    navigate,
  } = props;

  const { image, item } = CategoryModule.findById(categoryId) as CategoryRow;

  const isMorning = TimeGetter(startAt);
  const timeString = [TimeFormatter(startAt), TimeFormatter(endAt)].join(" ~ ");
  const { badgeColor, badgeLabel } = CheckJoinable(startAt, endAt);

  const coverProps = {
    imageUrl: imageUrl
      ? imageUrl
      : GroupImageModule.rows[isMorning ? 0 : 1].image,
  };
  const contentProps = {
    color: "#fff",
    cursor: "pointer",
    onClick: () => navigate(`/group/${groupId}`),
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
    <Style.GroupItemWrapper>
      <Style.GroupImageWrapper {...coverProps}>
        <Style.GroupCategoryWrapper>
          <Style.GroupCategotyIcon image={image} />
        </Style.GroupCategoryWrapper>
        <Style.GroupButtonWrapper {...buttonWrapperProps}>
          <Style.GroupIonButton {...preButtonProps} />
          <Style.GroupIonButton {...nextButtonProps} />
        </Style.GroupButtonWrapper>
        <Style.GroupContentWrapper {...contentProps}>
          <Style.GroupTitle>{title}</Style.GroupTitle>
          <Style.BadgeWrapper>
            <Style.DayBadge badgeColor={badgeColor}>
              {badgeLabel}
            </Style.DayBadge>
            <Style.CategotyBadge>{item}</Style.CategotyBadge>
          </Style.BadgeWrapper>
          <Style.GroupSubTitle>
            {address} | {timeString}
          </Style.GroupSubTitle>
        </Style.GroupContentWrapper>
      </Style.GroupImageWrapper>
    </Style.GroupItemWrapper>
  );
};

export default TodayOwnGroupCard;
