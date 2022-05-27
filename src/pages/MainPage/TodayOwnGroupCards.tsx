import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { TodayGroup } from "../../axios/groupAxios";
import { TimeFormatter } from "../../utils/tools/formatter";
import TodayOwnGroupCard from "./TodayOwnGroupCard";

interface TodayOwnGroupCardsProps {
  groups: TodayGroup[];
  count: number;
  navigate: NavigateFunction;
}

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

  return (
    <>
      {groups
        .filter((_, index) => index === current)
        .map((group, index) => {
          const { groupId, imageUrl, title, address, startAt, endAt } = group;
          const timeString = [
            TimeFormatter(startAt),
            TimeFormatter(endAt),
          ].join(" ~ ");

          const groupCardProps = {
            key: groupId,
            visible: current === index,
            groupId,
            title,
            imageUrl,
            address,
            timeString,
            onPreClick,
            onNextClick,
            navigate,
          };

          return <TodayOwnGroupCard {...groupCardProps} />;
        })}
    </>
  );
};

export default TodayOwnGroupCards;
