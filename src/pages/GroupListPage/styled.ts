import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const GroupCardWrapper = styled.div`
  width: 45%;
  height: 230px;
  margin: 7px;
  background: red;
  cursor: pointer;
  border-radius: 20px;
`;

interface OtherGroupCoverProps {
  image: string;
}

export const GroupCover = styled.div<OtherGroupCoverProps>`
  width: 100%;
  height: 100%;
  background: ${(
    props,
  ) => `linear-gradient(180deg, rgba(0, 0, 0, 0) 23.96%, #000000 83.85%),
            url("${props.image}");`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 0 10px;
  box-sizing: border-box;
  border-radius: 20px;
`;

export const GroupTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GroupCategoryWrapper = styled.div`
  width: 100%;
  height: 33px;
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 0;
`;

interface GroupCategoryIconProps {
  image: string;
}

export const GroupCategoryIcon = styled.div<GroupCategoryIconProps>`
  width: 33px;
  height: 33px;
  border: 1px solid #ddd;
  border-radius: 50%;
  padding: 5px;
  background: ${(props) => `url(${props.image})`};
  background-color: rgba(255, 255, 255);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  left: -10px;
  top: 10px;
`;

export const GroupMemberCount = styled.div`
  padding: 5px 10px;
  margin: 0 20px 0;
  color: #fff;
  background: rgba(0, 0, 0, 40%);
  position: relative;
  top: 25px;
  left: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GroupBottomWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 15px 15px 0;
`;

export const GroupDday = styled.div`
  padding: 5px 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  background: #fbb631;
  border-radius: 15px;
`;

export const GroupTitle = styled.h1`
  font-size: 16px;
  line-height: 100%;
  color: #fff;
  margin: 10px 0;
`;

export const GroupSubTitle = styled.h2`
  font-size: 14px;
  line-height: 100%;
  font-weight: 300;
  color: #fff;
  margin: 5px 0;
`;
