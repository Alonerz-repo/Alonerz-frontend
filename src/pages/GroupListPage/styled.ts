import styled from "styled-components";
import selectDropIcon from "./images/01.svg";
import locationIcon from "./images/02.svg";
import timeIcon from "./images/03.svg";

export const GroupToolsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
  box-sizing: border;
`;

export const GroupTimeSelect = styled.select`
  color: #fff;
  background: #f84c40 url(${selectDropIcon}) no-repeat 90% 50%;
  width: 120px;
  height: 35px;
  padding: 5px 13px;
  font-size: 15px;
  border: 0;
  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/
  appearance: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 2rem;
  cursor: pointer;
`;

export const GroupOrderFilter = styled.select`
  width: 60px;
  height: 40px;
  border: 0;
  background: #fff;
  cursor: pointer;
`;

export const GroupListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

export const GroupCardWrapper = styled.div`
  width: 45%;
  height: 230px;
  margin: 7px;
  cursor: pointer;
  border-radius: 20px;
`;

interface OtherGroupCoverProps {
  image: string;
  gradation: boolean;
}

export const GroupCover = styled.div<OtherGroupCoverProps>`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.gradation
      ? `linear-gradient(180deg, rgba(0, 0, 0, 0) 23.96%, #000000 83.85%), url("${props.image}");`
      : `url("${props.image}");`};
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
  left: -5px;
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

interface GroupDayProps {
  editable: boolean;
}

export const GroupDday = styled.div<GroupDayProps>`
  padding: 5px 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  background: ${(props) => (props.editable ? "#fbb631" : "#959595")};
  border-radius: 15px;
`;

export const GroupTitle = styled.h1`
  font-size: 16px;
  line-height: 100%;
  color: #fff;
  margin: 10px 0;
  letter-spacing: -0.05em;
`;

export const GroupSubTitle = styled.h2`
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  color: #fff;
  margin: 5px 0;
  letter-spacing: -0.05em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const TimeIcon = styled.div`
  padding: 3px;
  width: 10px;
  height: 10px;
  background: url(${timeIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 10px 0 0;
`;

export const LocationIcon = styled.div`
  padding: 3px;
  width: 7px;
  height: 10px;
  background: url(${locationIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 10px 0 0;
`;
