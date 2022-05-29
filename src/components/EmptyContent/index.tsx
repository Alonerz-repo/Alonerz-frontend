import emptyImage from "./images/empty.svg";
import styled from "styled-components";

const EmptyContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyCharacter = styled.div`
  width: 130px;
  height: 200px;
  margin: 150px 0 50px;
  background: url(${emptyImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const EmptyText = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  white-space: pre-wrap;
`;

interface EmptyContentProps {
  text: string;
}

const EmptyContent = (props: EmptyContentProps) => {
  const { text } = props;
  return (
    <EmptyContentWrapper>
      <EmptyCharacter />
      <EmptyText>{text}</EmptyText>
    </EmptyContentWrapper>
  );
};

export default EmptyContent;
