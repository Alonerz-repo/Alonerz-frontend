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

export interface GroupItemWrapperProps {
  visible: boolean;
}

export const GroupItemWrapper = styled.div<GroupItemWrapperProps>`
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
  ) => `linear-gradient(180deg, rgba(0, 0, 0, 0.25) 10%, rgba(0, 0, 0, .30) 50%, rgba(0, 0, 0, 0.25) 100%),
            linear-gradient(0deg, rgba(110,110,110,1) 0%, rgba(255,255,255,0) 60%),
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
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  cursor: ${(props) => props.cursor};
`;

export const GroupTitle = styled.h1`
  width: 100%;
  padding: 10px 0;
  text-align: left;
  font-size: 20px;
  margin: 0;
  letter-spacing: -0.05em;
`;

export const GroupSubTitle = styled.h2`
  width: 100%;
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
  color: #fff;
  padding: 15px;
  margin: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-color: rgba(255, 255, 255, 20%);
  }
`;
