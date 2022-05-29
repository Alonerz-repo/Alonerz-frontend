import styled from "styled-components";
import userAxios from "../../../axios/userAxios";

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

interface FollowerButtonGroupProps {
  otherId: string;
  isFollowing: boolean;
  reloadState(otherId: string): void;
}

const OwnFollowerButtonGroup = (props: FollowerButtonGroupProps) => {
  const { otherId, reloadState, isFollowing } = props;
  const onButtonClick = async () => {
    try {
      await userAxios.followOrCancel(otherId);
      reloadState(otherId);
    } catch (error: any) {}
  };
  return (
    <>
      {isFollowing ? (
        <CancelButton onClick={onButtonClick}>팔로잉 취소</CancelButton>
      ) : (
        <FollowButton onClick={onButtonClick}>맞팔로우</FollowButton>
      )}
    </>
  );
};

export default OwnFollowerButtonGroup;
