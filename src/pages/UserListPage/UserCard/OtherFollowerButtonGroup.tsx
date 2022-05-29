import styled from "styled-components";
import userAxios from "../../../axios/userAxios";

const YourBadge = styled.div`
  width: 95px;
  font-size: 14px;
  font-weight: 500;
  color: #bdbdbd;
  border: 2px solid #ddd;
  border-radius: 30px;
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.div`
  width: 95px;
  font-size: 14px;
  font-weight: 500;
  color: #f84c40;
  border: 2px solid #f84c40;
  border-radius: 30px;
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: #f84c40;
  }
  word-spacing: -0.1em;
`;

const FollowButton = styled.div`
  width: 95px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  border-radius: 30px;
  background: #f84c40;
  border: 2px solid #f84c40;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #f84c40;
    background: #fff;
    border: 2px solid #f84c40;
  }
`;

interface OtherFollowerButtonGroupProps {
  otherId: string;
  isYou: boolean;
  isFollowing: boolean;
  isFollower: boolean;
  reloadState(otherId: string, isFollowing: boolean): void;
}

const OtherFollowerButtonGroup = (props: OtherFollowerButtonGroupProps) => {
  const { otherId, reloadState, isYou, isFollowing, isFollower } = props;
  const onButtonClick = async () => {
    try {
      await userAxios.followOrCancel(otherId);
      reloadState(otherId, isFollowing);
    } catch (error: any) {}
  };

  if (isYou) return <YourBadge>나</YourBadge>;
  if (isFollower) {
    return (
      <>
        {isFollowing ? (
          <CancelButton onClick={onButtonClick}>팔로잉 취소</CancelButton>
        ) : (
          <FollowButton onClick={onButtonClick}>맞팔로우</FollowButton>
        )}
      </>
    );
  }
  return (
    <>
      {isFollowing ? (
        <CancelButton onClick={onButtonClick}>팔로잉 취소</CancelButton>
      ) : (
        <FollowButton onClick={onButtonClick}>팔로우</FollowButton>
      )}
    </>
  );
};

export default OtherFollowerButtonGroup;
