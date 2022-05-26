import { onboardImages } from '../../utils/images';
import { OnBoardCardWrapper, OnBoardContent, OnBoardImage } from './styled';

interface OnBoardingCardProps {
  id: number;
  content: string;
}

const OnBoardingCard = (props: OnBoardingCardProps) => {
  const { id, content } = props;

  const onBoardImageProps = {
    style: {
      backgroundImage: `url(${onboardImages[id]})`,
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
