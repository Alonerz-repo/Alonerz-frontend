import React from "react";
import styled from "styled-components";

interface ImageProps {
  shape: string;
  src?: string;
  size: string;
  profile?: boolean;
  tmpFile?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Image = ({ shape, src, size, profile, tmpFile, onClick }: ImageProps) => {
  const styles = {
    src,
    size,
    profile,
    tmpFile,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (tmpFile) {
    return (
      <AspectOutter tmpFile onClick={onClick}>
        <AspectInner {...styles} />
      </AspectOutter>
    );
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter {...styles} onClick={onClick}>
        <AspectInner {...styles} />
      </AspectOutter>
    );
  }

  if (shape === "test") {
    return (
      <React.Fragment>
        <ImageDefault {...styles}></ImageDefault>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "data:image/png;base64,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",
  size: "100px",
};

interface styleType {
  src?: string;
  size?: string;
  profile?: boolean;
  tmpFile?: boolean;
}

const ImageDefault = styled.div<styleType>`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: 100%;
  background-repeat: no-repeat;
`;

const AspectOutter = styled.div<styleType>`
  width: 100%;
  min-width: 250px;
  ${(props) =>
    props.tmpFile
      ? "display: flex; justify-content: center; border:1.5px dotted black; border-radius:20px; height:100px"
      : ""}
  cursor: pointer;
`;

const AspectInner = styled.div<styleType>`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${(props) =>
    props.tmpFile ? "width:64px; height:64px; padding-top: 10%;" : null}
`;

const ImageCircle = styled.div<styleType>`
  ${(props) => (props.profile ? "display: inline-block;" : null)}
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  border: 1px solid #ccc;
`;

export default Image;
