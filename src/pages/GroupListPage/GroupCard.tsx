import CategoryModule from "../../assets/category";
import GroupImageModule from "../../assets/group";
import { SelectGroup } from "../../axios/groupAxios";
import { NavigateFunction } from "react-router-dom";
import { TimeFormatter, TimeGetter } from "../../utils/tools/formatter";
import { CheckJoinable } from "../../utils/tools/calculator";
import * as Style from "./styled";

interface CategoryRow {
  id: number;
  item: string;
  image: string;
}

interface GroupCardProps {
  group: SelectGroup;
  navigate: NavigateFunction;
}

const GroupCard = (props: GroupCardProps) => {
  const {
    navigate,
    group: {
      groupId,
      title,
      categoryId,
      placeName,
      imageUrl,
      startAt,
      endAt,
      limit,
      join,
    },
  } = props;

  const { image, item } = CategoryModule.findById(categoryId) as CategoryRow;
  const { badgeLabel, badgeColor } = CheckJoinable(startAt, endAt);
  const timeString = [TimeFormatter(startAt), TimeFormatter(endAt)].join(" ~ ");
  const isMorning = TimeGetter(startAt);
  const onClick = () => navigate(`/group/${groupId}`);
  const gradation = imageUrl !== null;
  const backgroundImage = imageUrl
    ? imageUrl
    : GroupImageModule.rows[isMorning ? 2 : 3].image;

  return (
    <Style.GroupCardWrapper>
      <Style.GroupCover image={backgroundImage} gradation={gradation}>
        <Style.GroupTopWrapper>
          <Style.GroupCategoryWrapper>
            <Style.GroupCategoryIcon image={image} />
            <Style.GroupMemberCount>
              {join}/{limit}
            </Style.GroupMemberCount>
          </Style.GroupCategoryWrapper>
        </Style.GroupTopWrapper>
        <Style.GroupBottomWrapper onClick={onClick}>
          <Style.GroupDday background={badgeColor}>
            {badgeLabel}
          </Style.GroupDday>
          <Style.GroupTitle>
            {title.length > 11 ? `${title.slice(0, 11)}...` : title}
          </Style.GroupTitle>
          <Style.GroupSubTitle>{item}</Style.GroupSubTitle>
          <Style.GroupSubTitle>
            <Style.LocationIcon />
            {placeName.length > 9 ? `${placeName.slice(0, 9)}...` : placeName}
          </Style.GroupSubTitle>
          <Style.GroupSubTitle>
            <Style.TimeIcon />
            {timeString}
          </Style.GroupSubTitle>
        </Style.GroupBottomWrapper>
      </Style.GroupCover>
    </Style.GroupCardWrapper>
  );
};

export default GroupCard;
