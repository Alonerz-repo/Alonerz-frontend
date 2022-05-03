import React from "react";
import styled from "styled-components";

const Image = ({ src, _onClick }) => {
  const styles = {
    src: src,
  };
  return (
    <AspectOutter>
      <AspectInner {...styles} />
    </AspectOutter>
  );
};

Image.defaultProps = {
  src: "",
  _onClick: () => {},
};

const AspectOutter = styled.div`
  width: 100%;
`;

const AspectInner = styled.div`
  padding-top: 75%;
  position: relative;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Image;
