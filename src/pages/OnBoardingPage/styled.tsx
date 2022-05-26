import styled from 'styled-components';

export const OnBoardPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const OnBoardDotsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export const OnBoardDot = styled.div`
  background: #eee;
  width: 15px;
  height: 15px;
  margin: 0 7px;
  border-radius: 50%;
  cursor: pointer;
`;

export const OnBoardButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 10px;
`;

export const OnBoardButton = styled.div`
  background: #f84c40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 20px;
  width: 100%;
  height: 40px;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
`;

export const OnBoardSkipButton = styled.div`
  cursor: pointer;
  color: #bdbdbd;
`;

export const OnBoardCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const OnBoardImage = styled.div`
  width: 100%;
  height: 500px;
  background: #eee;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const OnBoardContent = styled.div`
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  white-space: pre-wrap;
  text-align: center;
  margin: 20px 0;
`;
