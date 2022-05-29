import styled from "styled-components";
import userAxios from "../../../axios/userAxios";

const BlockCancelButton = styled.div`
  width: 90px;
  font-size: 15px;
  font-weight: 500;
  color: #bdbdbd;
  border: 3px solid #f5f5f5;
  border-radius: 30px;
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: #bdbdbd;
  }
`;

interface BlockCancelButtonGroupProps {
  otherId: string;
  reloadState(otherId: string): void;
}

const OwnBlockCancelButtonGroup = (props: BlockCancelButtonGroupProps) => {
  const { otherId, reloadState } = props;
  const onButtonClick = async () => {
    try {
      await userAxios.blockOrCancel(otherId);
      reloadState(otherId);
    } catch (error: any) {}
  };
  return (
    <BlockCancelButton onClick={onButtonClick}>차단해제</BlockCancelButton>
  );
};

export default OwnBlockCancelButtonGroup;
