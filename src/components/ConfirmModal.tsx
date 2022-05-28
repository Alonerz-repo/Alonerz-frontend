import React from "react";
import styled from "styled-components";

export interface ConfirmModalProps {
  message: string;
  onOk: Function;
  onClose: Function;
  yesLabel: string;
  noLabel: string;
}

const Background = styled.div`
  position: fixed;
  width: 390px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  @media screen and (max-width: 420px) {
    width: 100%;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  left: 190px;
  top: 350px;
  transform: translate(-50%, -50%);
  height: 185px;
  width: 300px;
  background: #fff;
  border-radius: 25px;
  text-align: center;
`;

const MessageBox = styled.div`
  height: 100%;
  font-size: 15px;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
`;

const NoButton = styled.div`
  font-size: 15px;
  cursor: pointer;
  height: 70px;
  width: 100%;
  background: #bdbdbd;
  border-radius: 0 0 0 25px;
  line-height: 70px;
  color: #616161;
`;

const YesButton = styled.div`
  font-size: 15px;
  cursor: pointer;
  height: 70px;
  width: 100%;
  background: #f84c40;
  border-radius: 0 0 25px 0;
  line-height: 70px;
  color: #fff;
`;

export const initConfirmModalProps: ConfirmModalProps = {
  message: "",
  yesLabel: "예",
  noLabel: "아니오",
  onOk: () => {},
  onClose: () => {},
};

const ConfirmModal = (props: ConfirmModalProps) => {
  const { message, yesLabel, noLabel, onOk, onClose } = props;

  const onNoClick = () => onClose();
  const onYesClick = () => onOk();

  return (
    <React.Fragment>
      {message ? (
        <Background>
          <ModalContainer>
            <MessageBox>{message}</MessageBox>
            <ButtonBox>
              <NoButton onClick={onNoClick}>
                {noLabel ? noLabel : "아니오"}
              </NoButton>
              <YesButton onClick={onYesClick}>
                {yesLabel ? yesLabel : "예"}
              </YesButton>
            </ButtonBox>
          </ModalContainer>
        </Background>
      ) : null}
    </React.Fragment>
  );
};

export default ConfirmModal;
