import { useNavigate } from "react-router-dom";
import { OtherUser } from "../../../axios/userAxios";
import CharacterModule from "../../../assets/characters";
import CareerModule from "../../../assets/career";
import YearModule from "../../../assets/year";
import OwnBlockCancelButtonGroup from "./OwnBlockButtonGroup";
import OwnFollowerButtonGroup from "./OwnFollowerButtonGroup";
import OwnFollowingButtonGroup from "./OwnFollowingButtonGroup";
import OtherFollowerButtonGroup from "./OtherFollowerButtonGroup";
import * as Style from "./styled";
import OtherFollowingButtonGroup from "./OtherFollowingButtonGroup";

interface UserCardProps {
  type: "followings" | "followers" | "blocks";
  user: OtherUser;
  isOwn: boolean;
  yourId?: string;
  isYou?: boolean;
  isFollowing?: boolean;
  isFollower?: boolean;
  reloadState(otherId: string, isFollowing?: boolean): void;
}
// 프로필 이미지 렌더링
const Image = (profileImageUrl: string, characterImageId: number) => {
  let image = profileImageUrl;
  if (!image) {
    const characterImage = CharacterModule.findById(characterImageId) as {
      image: string;
    };
    image = characterImage.image;
  }
  const Image = Style.Image(image);
  return <Image />;
};

const UserCard = (props: UserCardProps) => {
  const navigate = useNavigate();
  const {
    type,
    user: {
      userId,
      nickname,
      profileImageUrl,
      characterImageId,
      careerId,
      yearId,
    },
    isOwn,
    isYou,
    isFollowing,
    isFollower,
    reloadState,
  } = props;

  const onNicknameClick = () => navigate(`/user/${userId}`);

  // 커리어 정보 렌더링
  const renderCareer = () => {
    const career = CareerModule.findById(careerId) as {
      group: string;
      item: string;
    };
    const year = YearModule.findById(yearId) as { item: string };
    return `${career.group} / ${career.item} / ${year.item}`;
  };

  // 상황에 맞는 버튼 렌더링
  const renderOwnButtons = () => {
    if (isOwn) {
      if (type === "blocks") {
        const buttonProps = { otherId: userId, reloadState };
        return <OwnBlockCancelButtonGroup {...buttonProps} />;
      }

      if (type === "followers") {
        const buttonProps = {
          otherId: userId,
          reloadState,
          isFollowing: isFollowing as boolean,
        };
        return <OwnFollowerButtonGroup {...buttonProps} />;
      }

      if (type === "followings") {
        const buttonProps = {
          otherId: userId,
          reloadState,
          isFollowing: isFollowing as boolean,
        };
        return <OwnFollowingButtonGroup {...buttonProps} />;
      }
    }

    if (type === "followers") {
      const buttonProps = {
        otherId: userId,
        isYou: isYou as boolean,
        isFollowing: isFollowing as boolean,
        isFollower: isFollower as boolean,
        reloadState,
      };
      return <OtherFollowerButtonGroup {...buttonProps} />;
    }

    if (type === "followings") {
      const buttonProps = {
        otherId: userId,
        isYou: isYou as boolean,
        isFollowing: isFollowing as boolean,
        isFollower: isFollower as boolean,
        reloadState,
      };
      return <OtherFollowingButtonGroup {...buttonProps} />;
    }

    return <></>;
  };

  return (
    <Style.Wrapper>
      <Style.UserWrapper>
        <Style.ImageWrapper>
          {Image(profileImageUrl as string, characterImageId)}
        </Style.ImageWrapper>
        <Style.TextWrapper>
          <Style.Nickname onClick={onNicknameClick}>{nickname}</Style.Nickname>
          <Style.Career>{renderCareer()}</Style.Career>
        </Style.TextWrapper>
      </Style.UserWrapper>
      {renderOwnButtons()}
    </Style.Wrapper>
  );
};

export default UserCard;
