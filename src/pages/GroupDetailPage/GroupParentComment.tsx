// 작업자 : 최원영

import { useState } from 'react';
import styled from 'styled-components';
import commentAxios from '../../axios/commentAxios';
import { Image, Text } from '../../elements';
import { careerUtils, characterImageUtils, yearUtils } from '../../utils/asset';
import GroupChildComments from './GroupChildComments';
import { ParentComment, valueChangeEvent } from './interface';
import {
  ButtonGroups,
  ContentText,
  TextArea,
  TextButton,
  UserWrapper,
} from './styled';

interface GroupCommentProps {
  comment: ParentComment;
  groupId: string;
  userId: string;
  onSaveComment(commentId: number, content: string): void;
  onRemoveComment(commentId: number): void;
}

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

const GroupParentComment = (props: GroupCommentProps) => {
  const { comment, groupId, userId, onSaveComment, onRemoveComment } = props;
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);

  const onReplyClick = () => setReply(!reply);

  const onEditClick = () => setEditMode(true);

  const onCancelClick = () => setEditMode(false);

  const onContentChange = (e: valueChangeEvent) => {
    const {
      target: { value },
    } = e;
    setEditContent(value);
  };

  const onSaveClick = async () => {
    const { commentId } = comment;
    await commentAxios.saveComment(commentId, editContent);
    onSaveComment(commentId, editContent);
    setEditMode(false);
  };

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

    const imageProps = (imageUrl: string, characterImageId: number) => ({
      shape: 'circle',
      size: '30px',
      src: imageUrl
        ? imageUrl
        : characterImageUtils.findById(characterImageId)?.url,
    });

    const nicknameProps = {
      style: {
        fontWeight: 700,
        padding: 5,
      },
    };

    return (
      <UserWrapper>
        <Image {...imageProps(profileImageUrl, characterImageId)} />
        <ContentText {...nicknameProps}>{nickname}</ContentText>
        <ContentText>
          {career?.item} / {year?.item}
        </ContentText>
      </UserWrapper>
    );
  };

  // 댓글 내용 렌더링
  const renderComment = () => {
    const { content } = comment as ParentComment;
    const textAreaProps = {
      value: editContent,
      onChange: onContentChange,
    };
    return editMode ? <TextArea {...textAreaProps} /> : <Text>{content}</Text>;
  };

  // 버튼 렌더링
  const renderButtons = () => {
    const { user } = comment as ParentComment;

    if (editMode) {
      return (
        <ButtonGroups>
          <TextButton onClick={onSaveClick}>저장</TextButton>
          <TextButton onClick={onCancelClick}>취소</TextButton>
        </ButtonGroups>
      );
    }

    return userId === user.userId ? (
      <ButtonGroups>
        <TextButton onClick={onReplyClick}>답글</TextButton>
        <TextButton onClick={onEditClick}>수정</TextButton>
        <TextButton onClick={onRemoveClick}>삭제</TextButton>
      </ButtonGroups>
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
    <div>
      <TopWrapper>
        {renderUser()}
        {renderButtons()}
      </TopWrapper>
      <BottomWrapper>{renderComment()}</BottomWrapper>
      <BottomWrapper>{renderChildComments()}</BottomWrapper>
    </div>
  );
};

export default GroupParentComment;
