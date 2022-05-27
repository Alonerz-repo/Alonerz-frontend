import React from "react";
import { Text } from "../elements";
import styled from "styled-components";
import { useAppSelector } from "../store/config";
import { useNavigate } from "react-router-dom";
import HeaderModule from "../assets/header";

interface Props {
  text: string;
  type?: string;
  chat?: () => any;
  setting?: () => any;
  home?: () => any;
  btnName?: string;
}

const Header = ({ text, type, chat, setting, home, btnName }: Props) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
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
          <GoBack
            size="20px"
            src={HeaderModule.rows[0].image}
            onClick={() => {
              navigate("/");
            }}
          ></GoBack>
          <Text bold fontSize="20px" padding="10px">
            {text}
          </Text>
          <div style={{ display: "flex", position: "absolute", right: "1px" }}>
            <Icon
              style={{ margin: "0px 5px" }}
              size="20px"
              src={HeaderModule.rows[4].image}
              onClick={() => {
                navigate("/user/config");
              }}
            ></Icon>
            <Icon
              style={{ margin: "0px 5px" }}
              size="20px"
              src={HeaderModule.rows[1].image}
              onClick={() => {
                navigate("/");
              }}
            ></Icon>
          </div>
        </Wrap>
      </React.Fragment>
    );
  } else if (type === "userEdit") {
    return (
      <React.Fragment>
        <Wrap>
          <GoBack
            size="20px"
            src={HeaderModule.rows[0].image}
            onClick={() => {
              navigate(-1);
            }}
          ></GoBack>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text bold fontSize="20px" padding="10px">
              {text}
            </Text>
            <div
              style={{ position: "absolute", right: "20px", color: "#F84C40" }}
            >
              <Text _onClick={setting}>{btnName}</Text>
            </div>
          </div>
        </Wrap>
      </React.Fragment>
    );
  } else if (type === "main") {
    return (
      <React.Fragment>
        <Wrap
          style={{
            width: "100%",
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
              src={HeaderModule.rows[2].image}
              onClick={() => {
                navigate(`/user/${user.userId}`);
              }}
            ></Icon>
            <Icon
              style={{ margin: "0px 5px" }}
              size="20px"
              src={HeaderModule.rows[4].image}
              onClick={() => {
                navigate("/user/config");
              }}
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
          src={HeaderModule.rows[0].image}
          onClick={() => {
            navigate(-1);
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
  z-index: 999;
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
  cursor: pointer;
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
  cursor: pointer;
`;

export default Header;
