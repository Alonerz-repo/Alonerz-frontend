import React from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";

const UserInfo = () => {
  return (
    <React.Fragment>
      <Div>
        <Image></Image>
        <Text>나는 닉네임입니다.</Text>
        <Box>
          <Text margin="0px 5px">직업</Text>|<Text margin="0px 5px">신입</Text>
        </Box>
        <Desc>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur enim neque accusantium quasi magnam vitae ducimus sunt
            sed eveniet delectus cumque quos culpa ad sapiente tempore, tenetur,
            excepturi nostrum?
          </Text>
        </Desc>
      </Div>
    </React.Fragment>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Desc = styled.div`
  background: red;
  text-align: center;
`;
export default UserInfo;
