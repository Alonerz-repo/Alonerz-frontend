import OnboardModule from '../../assets/onboards';
import { OnBoardCardWrapper, OnBoardContent, OnBoardImage } from './styled';

interface OnBoardingCardProps {
  id: number;
  content: string;
}

const OnBoardingCard = (props: OnBoardingCardProps) => {
  const { id, content } = props;

  const onBoardImageProps = {
    style: {
      backgroundImage: `url(${OnboardModule.rows[id].image})`,
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
