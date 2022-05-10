import React from "react";
import { Text } from "../elements";
import styled from "styled-components";
import goback from "../assets/goback.png";
import { useNavigate } from "react-router-dom";

interface Props {
  text: string;
}

const Header = ({ text }: Props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Wrap>
        <GoBack
          size="20px"
          src={goback}
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
  z-index: 2;
  background-color: white;
`;

interface GoBackProps {
  src: string;
  size: string;
}

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
