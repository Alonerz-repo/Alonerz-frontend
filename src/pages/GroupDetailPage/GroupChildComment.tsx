import { useState } from 'react';
import styled from 'styled-components';
import CharacterModule from '../../assets/characters';
import commentAxios from '../../axios/commentAxios';
import ConfirmModal, {
  ConfirmModalProps,
  initConfirmModalProps,
} from '../../components/ConfirmModal';
import { Image, Text } from '../../elements';
import { ChildComment, valueChangeEvent } from './interface';
import CareerModule from '../../assets/career';
import YearModule from '../../assets/year';
import {
  ButtonGroups,
  ContentText,
  TextArea,
  TextButton,
  UserWrapper,
  Wrapper,
} from './styled';

interface ChildCommentProps {
  userId: string;
  comment: ChildComment;
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

const GroupChildComment = (props: ChildCommentProps) => {
  const { userId, comment, onSaveComment, onRemoveComment } = props;
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [confirmModalProps, setConfirmMoalProps] = useState<ConfirmModalProps>(
    initConfirmModalProps,
  );

  const onCloseConfirmModal = () => setConfirmMoalProps(initConfirmModalProps);
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
    const { commentId } = comment as ChildComment;
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
    } = comment as ChildComment;

    const career = CareerModule.findById(careerId);
    const year = YearModule.findById(yearId);

    const imageProps = (imageUrl: string, characterImageId: number) => ({
      shape: 'circle',
      size: '30px',
      src: imageUrl
        ? imageUrl
        : CharacterModule.findById(characterImageId)?.image,
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
    const { content } = comment as ChildComment;
    const textAreaProps = {
      value: editContent,
      onChange: onContentChange,
    };
    return editMode ? <TextArea {...textAreaProps} /> : <Text>{content}</Text>;
  };

  // 버튼 렌더링
  const renderButtons = () => {
    const { user } = comment as ChildComment;

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
        <TextButton onClick={onEditClick}>수정</TextButton>
        <TextButton onClick={onRemoveClick}>삭제</TextButton>
      </ButtonGroups>
    ) : null;
  };

  return (
    <>
      <ConfirmModal {...confirmModalProps} />
      <Wrapper style={{ padding: '0 10px' }}>
        <TopWrapper>
          {renderUser()}
          {renderButtons()}
        </TopWrapper>
        <BottomWrapper>{renderComment()}</BottomWrapper>
      </Wrapper>
    </>
  );
};

export default GroupChildComment;
