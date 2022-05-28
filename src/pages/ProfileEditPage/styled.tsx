import styled from "styled-components";
import selectDropIcon from "./images/01.svg";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

interface ProfileImageProps {
  imageUrl: string;
}

export const Profilemage = styled.div<ProfileImageProps>`
  width: 100px;
  height: 100px;
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "#ddd"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  jusify-content: center;
  padding: 5px 0;
`;

export const ContentRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px 15px;
`;

export const ContentColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px 15px;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  &:nth-child(2n) {
    margin: 0 0 0 5px;
  }
  &:nth-child(2n + 1) {
    margin: 0 5px 0 0;
  }
`;

export const Label = styled.label`
  width: 100%;
  padding: 0 0 0 3px;
  letter-spacing: -0.03em;
`;

export const LabelText = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  padding: 0 0 10px;
`;

export const LabelRequired = styled.sup`
  color: #ff0000;
  font-size: 12px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 12px;
  background: #eee;
  border: 0px;
  border-radius: 20px;
  box-sizing: border-box;
  letter-spacing: -0.03em;
`;

export const SelectField = styled.select`
  width: 100%;
  font-size: 12px;
  padding: 15px;
  background: #eee no-repeat url(${selectDropIcon}) 90% 50%;
  border: 0;
  border-radius: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box;
  letter-spacing: -0.03em;
  cursor: pointer;
`;

export const Option = styled.option`
  font-size: 12px;
  border: 0;
  letter-spacing: -0.03em;
`;
