import React from "react";
import { Text } from "../elements";
import styled from "styled-components";
import { useAppSelector } from "../store/config";
import { useNavigate, useParams } from "react-router-dom";
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
  const params = useParams();
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
  } else if (type === "follow") {
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const {
        target: { value },
      } = e;
      const { otherId } = params;
      if (!["followings", "followers"].includes(value)) {
        return navigate("/");
      }
      return navigate(`/users/${value}/${otherId}`);
    };
    return (
      <React.Fragment>
        <Wrap
          style={{
            backgroundColor: "#fff",
          }}
        >
          <GoBack
            size="20px"
            src={HeaderModule.rows[0].image}
            onClick={() => {
              navigate(-1);
            }}
          ></GoBack>
          <Text bold fontSize="20px" padding="10px">
            <Select value={text} onChange={onSelectChange}>
              <Option value="followings">팔로잉</Option>
              <Option value="followers">팔로워</Option>
            </Select>
          </Text>
        </Wrap>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Wrap
        style={{
          backgroundColor: "#fff",
        }}
      >
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

const Select = styled.select`
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  border: 0px;
  background-color: #fff;
  width: 80px;
`;

const Option = styled.option`
  font-size: 16px;
`;

export default Header;
