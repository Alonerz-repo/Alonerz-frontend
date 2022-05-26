import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardModule from '../../assets/onboards';
import OnBoardingCard from './OnBoadingCard';
import OnBoadingDots from './OnBoadingDots';
import * as Style from './styled';

const count = OnboardModule.len();
const max = count - 1;
const items = OnboardModule.rows;

const OnBoardingPage = () => {
  const navigate = useNavigate();
  const [cardIndex, setCardIndex] = useState<number>(0);
  const onPreButtonClick = () => setCardIndex(cardIndex - 1);
  const onNextButtonClick = () => setCardIndex(cardIndex + 1);
  const onStartButtonClick = () => navigate('/login');
  const onSkipButtonClick = () => navigate('/login');

  const renderButtons = () => {
    const preButtonProps = {
      style: {
        background: '#bdbdbd',
        color: '#616161',
      },
      onClick: onPreButtonClick,
    };

    return (
      <Style.OnBoardButtonWrapper>
        {cardIndex > 0 && (
          <Style.OnBoardButton {...preButtonProps}>이전</Style.OnBoardButton>
        )}
        {cardIndex < max && (
          <Style.OnBoardButton onClick={onNextButtonClick}>
            다음
          </Style.OnBoardButton>
        )}
        {cardIndex === max && (
          <Style.OnBoardButton onClick={onStartButtonClick}>
            시작하기
          </Style.OnBoardButton>
        )}
      </Style.OnBoardButtonWrapper>
    );
  };

  const renderSkipButton = () => {
    return (
      <Style.OnBoardButtonWrapper>
        <Style.OnBoardSkipButton onClick={onSkipButtonClick}>
          Skip
        </Style.OnBoardSkipButton>
      </Style.OnBoardButtonWrapper>
    );
  };

  const onBoardingDotsProps = {
    count,
    cardIndex,
    setCardIndex,
  };

  return (
    <Style.OnBoardPageWrapper>
      <OnBoardingCard {...items[cardIndex]} />
      {<OnBoadingDots {...onBoardingDotsProps} />}
      {renderButtons()}
      {renderSkipButton()}
    </Style.OnBoardPageWrapper>
  );
};
export default OnBoardingPage;
