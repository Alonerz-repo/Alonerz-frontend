import React from "react";
import { Text, Grid } from "../elements";
import styled from "styled-components";
import goback from "../assets/goback.png";
import icon from "../assets/header";
import { useNavigate } from "react-router-dom";

interface Props {
  text: string;
  //해더 타입
  type?: string;
  chat?: () => void;
  setting?: () => void;
  home?: () => void;
}

const Header = ({ text, type, chat, setting, home }: Props) => {
  const navigate = useNavigate();
  if (type === "user") {
    return (
      <React.Fragment>
        <Wrap
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text bold fontSize="20px" padding="10px">
            {text}
          </Text>
          <div style={{ display: "flex", position: "absolute", right: "1px" }}>
            <Icon
              style={{ margin: "0px 5px" }}
              size="20px"
              src={icon[2]}
              onClick={chat}
            ></Icon>
            <Icon
              style={{ margin: "0px 5px" }}
              size="20px"
              src={icon[1]}
              onClick={setting}
            ></Icon>
            <Icon
              style={{ margin: "0px 5px" }}
              size="20px"
              src={icon[0]}
              onClick={home}
            ></Icon>
          </div>
        </Wrap>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Wrap>
        <GoBack
          size="20px"
          src={goback}
          onClick={() => {
            navigate("/");
          }}
        ></GoBack>
        <Text bold fontSize="20px" padding="10px">
          {text}
        </Text>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  position: sticky;
  text-align: center;
  top: 0;
  z-index: 2;
  background-color: white;
`;

interface GoBackProps {
  src: string;
  size: string;
}
const Icon = styled.div<GoBackProps>`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;
const GoBack = styled.div<GoBackProps>`
  position: absolute;
  left: 15px;
  top: 13px;
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Header;
