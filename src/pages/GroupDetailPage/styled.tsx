import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const ContentTitle = styled.h1`
  font-size: 20px;
  margin: 0 0 20px;
`;

export const ContentSubTitle = styled.h2`
  font-size: 16px;
`;

export const ContentText = styled.div`
  margin: 0 0 0 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  resize: none;
  block-size: auto;
  border-radius: 7px;
`;

export const SubmitButton = styled.button`
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DayBadge = styled.div`
  padding: 8px 10px;
  margin: 0 5px 0 0;
  color: #fff;
  font-weight: 500;
  background-color: #ff0000;
  border: 2px solid #ff0000;
  border-radius: 30px;
`;

export const CategoryBadge = styled.div`
  padding: 5px 10px;
  margin: 0 5px;
  color: #ff0000;
  font-weight: 500;
  background-color: #fff;
  border: 2px solid #ff0000;
  border-radius: 30px;
`;

export const UserWrapper = styled.div`
  vertical-align: middle;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
`;

export const ButtonGroups = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  jusify-content: center;
`;

export const TextButton = styled.div`
  color: #bdbdbd;
  cursor: pointer;
  margin: 0 3px;
  font-size: 13px;
`;
