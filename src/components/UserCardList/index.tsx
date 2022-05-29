import { useAppSelect } from "../../store/config.hook";
import OwnBlockList from "./OwnBlockList";
import OwnFollowingList from "./OwnFollowingList";
import OwnFollowerList from "./OwnFollowerList";
import OtherFollowingList from "./OtherFollowingList";
import OtherFollowerList from "./OtherFollowerList";
import * as Style from "./styled";

interface UserCardListProps {
  type: "followings" | "followers" | "blocks";
  otherId: string;
}

const UserCardList = (props: UserCardListProps) => {
  const { userId } = useAppSelect((state) => state.user);
  const { type, otherId } = props;

  if (type === "blocks") {
    return (
      <Style.Wrapper>
        <OwnBlockList />
      </Style.Wrapper>
    );
  }

  // 내 팔로잉 / 팔로워 목록
  if (userId === otherId) {
    const listProps = { userId };
    return (
      <Style.Wrapper>
        {type === "followings" ? (
          <OwnFollowingList {...listProps} />
        ) : (
          <OwnFollowerList {...listProps} />
        )}
      </Style.Wrapper>
    );
  }

  const listProps = { yourId: userId, otherId };

  // 다른 사람의 팔로잉 / 팔로워 목록
  return (
    <Style.Wrapper>
      {type === "followings" ? (
        <OtherFollowingList {...listProps} />
      ) : (
        <OtherFollowerList {...listProps} />
      )}
    </Style.Wrapper>
  );
};

export default UserCardList;
