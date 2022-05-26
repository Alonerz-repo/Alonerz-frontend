import { OnBoardDot, OnBoardDotsWrapper } from './styled';

interface OnBoadingDotsProps {
  count: number;
  cardIndex: number;
  setCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

const OnBoadingDots = (props: OnBoadingDotsProps) => {
  const { count, cardIndex, setCardIndex } = props;

  return (
    <OnBoardDotsWrapper>
      {[...Array(count)].map((_, dotIndex) => {
        const onBoardDotProps = {
          key: `${cardIndex}-${dotIndex}`,
          style: {
            background: cardIndex === dotIndex ? '#fbb631' : '#eee',
          },
          onClick: () => {
            setCardIndex(dotIndex);
          },
        };
        return <OnBoardDot {...onBoardDotProps} />;
      })}
    </OnBoardDotsWrapper>
  );
};

export default OnBoadingDots;
