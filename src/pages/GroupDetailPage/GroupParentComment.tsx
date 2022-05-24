// 작업자 : 최원영

import { useState } from 'react';
import styled from 'styled-components';
import commentAxios from '../../axios/commentAxios';
import { Grid, Image, Text } from '../../elements';
import { careerUtils, characterImageUtils, yearUtils } from '../../utils/asset';
import GroupChildComments from './GroupChildComments';
import { ParentComment } from './interface';

interface GroupCommentProps {
  comment: {};
  groupId: string;
  userId: string;
  onRemoveComment(commentId: number): void;
}

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

const GroupParentComment = (props: GroupCommentProps) => {
  const { comment, groupId, userId, onRemoveComment } = props;
  const [reply, setReply] = useState<boolean>(false);

  const onReplyClick = () => setReply(!reply);
  const onEditClick = () => {};
  const onRemoveClick = async () => {
    const { commentId } = comment as ParentComment;
    await commentAxios.removeComment(commentId);
    onRemoveComment(commentId);
  };

  // 유저 렌더링
  const renderUser = () => {
    const {
      user: { nickname, careerId, yearId, profileImageUrl, characterImageId },
    } = comment as ParentComment;
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

  // 댓글 내용 렌더링
  const renderComment = () => {
    const { content } = comment as ParentComment;
    return <Text>{content}</Text>;
  };

  // 버튼 렌더링
  const renderButtons = () => {
    const { user } = comment as ParentComment;
    const buttonProps = {
      customize: 'color: #BDBDBD; cursor: pointer;',
      margin: '0 3px',
      fontSize: '13px',
    };
    return userId === user.userId ? (
      <ButtonWrapper>
        <Text {...buttonProps} _onClick={onReplyClick}>
          답글
        </Text>
        <Text {...buttonProps} _onClick={onEditClick}>
          수정
        </Text>
        <Text {...buttonProps} _onClick={onRemoveClick}>
          삭제
        </Text>
      </ButtonWrapper>
    ) : null;
  };

  // 하위 댓글 컴포넌트 렌더링
  const renderChildComments = () => {
    const { commentId, childCommentCount } = comment as ParentComment;
    const childCommentsProps = {
      userId,
      groupId,
      parentId: commentId,
      childCommentCount,
      reply,
    };
    return <GroupChildComments {...childCommentsProps} />;
  };

  return (
    <Grid>
      <TopWrapper>
        {renderUser()}
        {renderButtons()}
      </TopWrapper>
      <BottomWrapper>{renderComment()}</BottomWrapper>
      <BottomWrapper>{renderChildComments()}</BottomWrapper>
    </Grid>
  );
};

export default GroupParentComment;
