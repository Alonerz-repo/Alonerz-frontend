import styled from 'styled-components';
import commentAxios from '../../axios/commentAxios';
import { Grid, Image, Text } from '../../elements';
import { careerUtils, characterImageUtils, yearUtils } from '../../utils/asset';
import { ChildComment } from './interface';

interface ChildCommentProps {
  userId: string;
  comment: ChildComment;
  onRemoveComment(commentId: number): void;
}

const imageProps = (imageUrl: string, characterImageId: number) => ({
  shape: 'circle',
  size: '30px',
  src: imageUrl
    ? imageUrl
    : characterImageUtils.findById(characterImageId)?.url,
});

const textProps = {
  nickname: {
    style: {
      fontWeight: 700,
      marginLeft: 5,
      padding: 5,
    },
  },
  careerAndYear: {
    style: {
      marginLeft: 5,
    },
  },
};

const UserWrapper = styled.div`
  vertical-align: middle;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  jusify-content: center;
`;

const TopWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
`;

const BottomWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 5px 0;
`;

const GroupChildComment = (props: ChildCommentProps) => {
  const { userId, comment, onRemoveComment } = props;
  const onEditClick = () => {};
  const onRemoveClick = async () => {
    const { commentId } = comment as ChildComment;
    await commentAxios.removeComment(commentId);
    onRemoveComment(commentId);
  };
  // 사용자 렌더링
  const renderUser = () => {
    const {
      user: { nickname, careerId, yearId, profileImageUrl, characterImageId },
    } = comment as ChildComment;
    const career = careerUtils.findById(careerId) as { item: string };
    const year = yearUtils.findById(yearId) as { item: string };
    return (
      <UserWrapper>
        <Image {...imageProps(profileImageUrl, characterImageId)} />
        <div {...textProps.nickname}>{nickname}</div>
        <div {...textProps.careerAndYear}>
          {career?.item} / {year?.item}
        </div>
      </UserWrapper>
    );
  };

  // 댓글 렌더링
  const renderComment = () => {
    const { content } = comment as ChildComment;
    return <Text>{content}</Text>;
  };

  // 버튼 렌더링
  const renderButtons = () => {
    const { user } = comment as ChildComment;
    const buttonProps = {
      customize: 'color: #BDBDBD; cursor: pointer;',
      margin: '0 3px',
      fontSize: '13px',
    };
    return userId === user.userId ? (
      <ButtonWrapper>
        <Text {...buttonProps} _onClick={onEditClick}>
          수정
        </Text>
        <Text {...buttonProps} _onClick={onRemoveClick}>
          삭제
        </Text>
      </ButtonWrapper>
    ) : null;
  };

  return (
    <Grid>
      <TopWrapper>
        {renderUser()}
        {renderButtons()}
      </TopWrapper>
      <BottomWrapper>{renderComment()}</BottomWrapper>
    </Grid>
  );
};

export default GroupChildComment;
