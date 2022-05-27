import * as Style from "./styled";

interface TodayOtherGroupCardProps {
  title: string;
  subTitle: string;
  image: string;
  buttonColor: string;
  fontColor: string;
  onCreate(): void;
  onEnter(): void;
}

// 최원영
const TodayOtherGroupCard = (props: TodayOtherGroupCardProps) => {
  const { title, subTitle, image, buttonColor, fontColor, onCreate, onEnter } =
    props;

  const cardWrapperProps = {};

  const createButtonProps = {
    background: buttonColor,
    onClick: onCreate,
  };

  const enterButtonProps = {
    background: buttonColor,
    onClick: onEnter,
  };

  const contentProps = {
    color: fontColor,
    cursor: "default",
  };

  return (
    <Style.GroupCardWrapper {...cardWrapperProps}>
      <Style.GroupCover image={image}>
        <Style.GroupContentWrapper {...contentProps}>
          <Style.GroupTitle>{title}</Style.GroupTitle>
          <Style.GroupSubTitle>{subTitle}</Style.GroupSubTitle>
        </Style.GroupContentWrapper>
        <Style.GroupButtonWrapper>
          <Style.GroupButton {...createButtonProps}>개설하기</Style.GroupButton>
          <Style.GroupButton {...enterButtonProps}>파티보기</Style.GroupButton>
        </Style.GroupButtonWrapper>
      </Style.GroupCover>
    </Style.GroupCardWrapper>
  );
};

export default TodayOtherGroupCard;
