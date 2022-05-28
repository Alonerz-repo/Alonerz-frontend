import styled from "styled-components";

export const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GroupCardHeader = styled.div`
  width: 100%;
  padding: 0 15px;
  margin: 20px 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-left;
  box-sizing: border-box;
`;

export const GroupCardBadge = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 10px;
  background-color: #f84c40;
  border: 0px;
  border-radius: 15px;
  margin: 0 10px 0 0;
`;

export const GroupCardTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  padding: 0;
  margin: 0;
`;

export const GroupCardWrapper = styled.div`
  width: 100%;
  height: 250px;
  padding: 15px;
  box-sizing: border-box;
`;

export const GroupItemWrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 15px;
  box-sizing: border-box;
`;

interface OtherGroupCoverProps {
  image: string;
}

export const GroupCover = styled.div<OtherGroupCoverProps>`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${(props) => `url("${props.image}");`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px 20px 10px;
  box-sizing: border-box;
`;

interface GroupItemgWrapperProps {
  imageUrl: string | null;
}

export const GroupImageWrapper = styled.div<GroupItemgWrapperProps>`
  width: 100%;
  height: 100%;
  background: ${(
    props,
  ) => `linear-gradient(180deg, rgba(0, 0, 0, 0) 32.81%, rgba(0, 0, 0, 0.8) 88.54%), 
            url("${props.imageUrl}");`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

interface GroupContentWrapperProps {
  color: string;
  cursor: string;
}

export const GroupContentWrapper = styled.div<GroupContentWrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: ${(props) => props.color};
  cursor: ${(props) => props.cursor};
`;

export const GroupTitle = styled.h1`
  width: 100%;
  line-height: 100%;
  padding: 10px 0;
  text-align: left;
  font-size: 20px;
  margin: 0;
  letter-spacing: -0.05em;
`;

export const GroupSubTitle = styled.h2`
  width: 100%;
  line-height: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  letter-spacing: -0.05em;
`;

export const GroupButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

interface GroupButtonProps {
  background: string;
}

export const GroupButton = styled.button<GroupButtonProps>`
  color: #fff;
  width: 100%;
  height: 50px;
  padding: 10px;
  margin: 5px;
  border: 0px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: ${(props) => `rgb(${props.background})`};
  &:hover {
    background: ${(props) => `rgba(${props.background}, 0.6)`};
  }
`;

interface GroupIconButtonProps {
  image: string;
}

export const GroupIonButton = styled.div<GroupIconButtonProps>`
  padding: 15px;
  margin: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-color: rgba(0, 0, 0, 10%);
  }
  margin: 20px 0 0;
`;

export const GroupDotWrapper = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 0 10px;
`;

interface GroupDotProps {
  filled: boolean;
}

export const GroupDot = styled.div<GroupDotProps>`
  width: 15px;
  height: 15px;
  border: 1px;
  border-radius: 50%;
  background: ${(props) => (props.filled ? "#fbb631" : "#ddd")};
  margin: 0 5px;
  cursor: pointer;
`;

export const GroupCategoryWrapper = styled.div`
  width: 100%;
  height: 33px;
  display: flex;
  position: absolute;
  z-index: 0;
`;

interface GroupCategoryIconProps {
  image: string;
}

export const GroupCategotyIcon = styled.div<GroupCategoryIconProps>`
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 50%;
  background: ${(props) => `url(${props.image})`};
  background-color: rgba(255, 255, 255);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  left: 10px;
  top: -25px;
`;

export const GroupCategotyItem = styled.div`
  padding: 5px 10px;
  margin: -5px 0 5px;
  background: #fbb631;
  font-size: 14px;
  font-weight: 600;
  border-radius: 15px;
`;
