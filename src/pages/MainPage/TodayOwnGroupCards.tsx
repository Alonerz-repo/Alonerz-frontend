import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { TodayGroup } from "../../axios/groupAxios";
import TodayOwnGroupCard from "./TodayOwnGroupCard";
import * as Style from "./styled";

interface TodayOwnGroupCardsProps {
  groups: TodayGroup[];
  count: number;
  navigate: NavigateFunction;
}

// 최원영
const TodayOwnGroupCards = (props: TodayOwnGroupCardsProps) => {
  const { groups, count, navigate } = props;
  const [current, setCurrent] = useState<number>(0);

  const onPreClick = () => {
    const next = current - 1 === -1 ? 0 : current - 1;
    setCurrent(next);
  };

  const onNextClick = () => {
    const next = current + 1 === count ? count - 1 : current + 1;
    setCurrent(next);
  };

  const renderOwnGroupCards = () => {
    const { groupId, imageUrl, title, address, startAt, endAt, categoryId } =
      groups[current];

    const groupCardProps = {
      key: groupId,
      groupId,
      title,
      imageUrl,
      address,
      categoryId,
      startAt,
      endAt,
      onPreClick,
      onNextClick,
      navigate,
    };

    return <TodayOwnGroupCard {...groupCardProps} />;
  };

  const renderCardDots = () => {
    return (
      <Style.GroupDotWrapper>
        {[...Array(count)].map((_, index) => {
          const groupDotProps = {
            key: `group-dot-${index}`,
            filled: index === current,
            onClick: () => {
              setCurrent(index);
            },
          };
          return <Style.GroupDot {...groupDotProps} />;
        })}
      </Style.GroupDotWrapper>
    );
  };

  return (
    <>
      {renderOwnGroupCards()}
      {renderCardDots()}
    </>
  );
};

export default TodayOwnGroupCards;
