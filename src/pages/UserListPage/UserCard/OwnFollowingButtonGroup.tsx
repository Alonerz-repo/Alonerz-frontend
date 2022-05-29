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

interface FollowingButtonGroupProps {
  otherId: string;
  reloadState(otherId: string): void;
}

const OwnFollowingButtonGroup = (props: FollowingButtonGroupProps) => {
  const { otherId, reloadState } = props;
  const onButtonClick = async () => {
    try {
      await userAxios.followOrCancel(otherId);
      reloadState(otherId);
    } catch (error: any) {}
  };
  return <CancelButton onClick={onButtonClick}>팔로잉 취소</CancelButton>;
};

export default OwnFollowingButtonGroup;
