import styled from "styled-components";
import selectDropIcon from "./images/01.svg";
import cameraIcon from "./images/02.svg";
import uploadIcon from "./images/03.svg";
import deleteIcon from "./images/04.svg";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
  display: flex;
  background: #eee;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

interface ProfileImageProps {
  imageUrl: string;
}

export const Profilemage = styled.div<ProfileImageProps>`
  width: 150px;
  height: 150px;
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : `#fff url(${cameraIcon})`};
  background-size: ${(props) => (props.imageUrl ? "cover" : "50px")};
  background-position: center;
  background-repeat: no-repeat;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
`;

export const ImageSelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0;
  padding: 5px;
  box-sizing: border-box;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageLabel = styled.label`
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background: rgba(0, 0, 0, 10%);
  }
`;

export const ImageUploadIcon = styled.div`
  width: 25px;
  height: 25px;
  background: url(${uploadIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 2px;
`;

export const ImageDeleteIcon = styled.div`
  width: 25px;
  height: 25px;
  background: url(${deleteIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 2px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
