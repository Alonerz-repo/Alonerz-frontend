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
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          enim neque accusantium quasi magnam vitae ducimus sunt sed eveniet
          delectus cumque quos culpa ad sapiente tempore, tenetur, excepturi
          nostrum? Aliquid? Recusandae velit praesentium consequuntur odit
          quasi, cum ab, eius vero temporibus quae repellendus necessitatibus
          commodi, illo voluptatem excepturi aliquam aperiam magni porro
          deserunt hic quas? Nisi consectetur perspiciatis soluta rem? Maiores
          aut quos expedita commodi rerum inventore? Laudantium voluptatibus
          placeat eligendi perferendis, voluptatem totam officia, at, iure
          dolorem necessitatibus ex accusamus facere modi odit molestias fugiat
          similique laboriosam adipisci eius. Sit rem dolorem quas ex temporibus
          in illo hic, sapiente repellendus, labore ea blanditiis voluptates
          ipsa optio aspernatur nostrum amet. Adipisci, voluptates asperiores
          voluptate corporis laboriosam esse corrupti dolorum voluptatibus?
          Voluptates provident quod delectus deserunt et fugiat perspiciatis,
          magnam repellendus maiores amet totam? Assumenda necessitatibus hic,
          ullam architecto magnam harum voluptatum in deleniti, sequi, adipisci
          nihil dolores aliquam id. Fuga! Expedita modi ex adipisci voluptate
          vel, incidunt porro nisi id dolor provident temporibus, cumque odit
          magni eaque. Fugiat delectus dolor repellat totam ipsum. Fugiat, ab
          enim corporis est sequi minus! Laudantium explicabo, qui inventore
          quod minus saepe aspernatur iste dignissimos quam soluta molestiae
          velit sunt voluptatum in impedit iure amet sit ducimus alias ad porro
          aut fugiat veniam magni. Officiis. Cum beatae illum magnam quibusdam
          aperiam quidem id, perferendis, natus sed dolore iste rerum
          laboriosam! Modi ullam rerum deleniti, iure qui officiis nam eaque,
          perspiciatis libero ab sint iste dolore. Accusantium cupiditate at
          ipsa perspiciatis vitae distinctio accusamus minima, et debitis
          voluptatum placeat magni dolor unde minus velit corporis pariatur
          explicabo sapiente architecto odit molestiae? Sapiente illum deserunt
          sunt inventore. Molestiae nostrum nesciunt deleniti quaerat dolorem
          nemo vitae sit maxime voluptate possimus reiciendis, facere quos
          aliquid. Fuga iste facere, voluptatibus iure odio dicta repellat
          facilis pariatur in! Dolor, non voluptatibus.
        </Text>
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

const NameDiv = styled.div`
  background: red;
`;
export default UserInfo;
