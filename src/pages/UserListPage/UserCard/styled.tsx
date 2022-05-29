import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin: 5px 0;
  box-sizing: border-box;
`;

export const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
export const ImageWrapper = styled.div``;
export const Image = (image: string) => styled.div`
  width: 50px;
  height: 50px;
  background: url(${image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #f5f5f5;
  border-radius: 50%;
`;

export const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 10px;
`;

export const Nickname = styled.div`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;

export const Career = styled.div`
  font-size: 14px;
`;

export const BlockCancelButton = styled.div`
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
