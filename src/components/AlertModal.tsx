import React from "react";
import styled from "styled-components";

export interface AlertModalProps {
  message: string;
  onClose: Function;
  closeLabel: string;
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
  font-weight: 800;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.div`
  font-size: 15px;
  cursor: pointer;
  height: 70px;
  width: 100%;
  background: #f84c40;
  border-radius: 0 0 25px 25px;
  line-height: 70px;
  color: #fff;
`;

export const initAlertModalProps: AlertModalProps = {
  message: "",
  closeLabel: "",
  onClose: () => {},
};

const AlertModal = (props: AlertModalProps) => {
  const { message, onClose, closeLabel } = props;

  const onClick = () => onClose();

  return (
    <React.Fragment>
      {message ? (
        <Background>
          <ModalContainer>
            <MessageBox>{message}</MessageBox>
            <CloseButton onClick={onClick}>
              {closeLabel ? closeLabel : "닫기"}
            </CloseButton>
          </ModalContainer>
        </Background>
      ) : null}
    </React.Fragment>
  );
};

export default AlertModal;
