import { OnBoardCardWrapper, OnBoardContent, OnBoardImage } from './styled';

interface OnBoardingCardProps {
  imageUrl: string;
  content: string;
}

const OnBoardingCard = (props: OnBoardingCardProps) => {
  // TODO : ./assets/data/onboards.json
  // 이미지 경로 저장 필요
  const { imageUrl, content } = props;

  const onBoardImageProps = {
    style: {
      backgroundImage: `url(${imageUrl})`,
    },
  };
  return (
    <OnBoardCardWrapper>
      <OnBoardImage {...onBoardImageProps} />
      <OnBoardContent>{content}</OnBoardContent>
    </OnBoardCardWrapper>
  );
};

export default OnBoardingCard;
