// 작업자 : 최원영

import { useState } from 'react';
import styled from 'styled-components';
import commentAxios from '../../axios/commentAxios';
import ConfirmModal, {
  ConfirmModalProps,
  initConfirmModalProps,
} from '../../components/ConfirmModal';
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
  const [confirmModalProps, setConfirmMoalProps] = useState<ConfirmModalProps>(
    initConfirmModalProps,
  );

  const onCloseConfirmModal = () => setConfirmMoalProps(initConfirmModalProps);
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

  const onRemoveClick = () => {
    const { commentId } = comment as ParentComment;
    setConfirmMoalProps({
      message: '댓글을 삭제하시겠습니까?',
      yesLabel: '삭제',
      noLabel: '취소',
      onOk: async () => {
        await commentAxios.removeComment(commentId);
        onRemoveComment(commentId);
        onCloseConfirmModal();
      },
      onClose: onCloseConfirmModal,
    });
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
    return (
      <BottomWrapper>
        {editMode ? <TextArea {...textAreaProps} /> : <Text>{content}</Text>}
      </BottomWrapper>
    );
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

    return (
      <ButtonGroups>
        <TextButton onClick={onReplyClick}>
          {reply ? '숨기기' : '답글 남기기'}
        </TextButton>
        {userId === user.userId && (
          <>
            <TextButton onClick={onEditClick}>수정</TextButton>
            <TextButton onClick={onRemoveClick}>삭제</TextButton>
          </>
        )}
      </ButtonGroups>
    );
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
    return (
      <BottomWrapper>
        <GroupChildComments {...childCommentsProps} />
      </BottomWrapper>
    );
  };

  return (
    <>
      <ConfirmModal {...confirmModalProps} />
      <TopWrapper>
        {renderUser()}
        {renderButtons()}
      </TopWrapper>
      {renderComment()}
      {renderChildComments()}
    </>
  );
};

export default GroupParentComment;
