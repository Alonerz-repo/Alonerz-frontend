import React from "react";
import styled from "styled-components";
import { Image } from "../elements";

type PartyMemberProps = {
  captain?: boolean;
  src?: string;
  nickname: string;
  part: string;
  year: string;
};

const PartyMember = ({
  captain,
  src,
  nickname,
  part,
  year,
}: PartyMemberProps) => {
  return (
    <Wrapper>
      <Image shape="circle" size="30px" profile></Image>
      {captain ? <Captain>대장</Captain> : null}
      <text style={{ fontWeight: "700", marginLeft: "10px" }}> {nickname}</text>
      <text style={{ marginLeft: "10px" }}>
        {part}/{year}
      </text>
    </Wrapper>
  );
};

const Captain = styled.text`
  width: 33px;
  height: 20px;
  background-color: gray;
  border-radius: 3px;
  margin-left: 5px;
`;

const Wrapper = styled.div`
  vertical-align: middle;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
`;

export default PartyMember;
