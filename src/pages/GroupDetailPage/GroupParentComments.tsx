import React, { useEffect, useState } from 'react';
import commentAxios from '../../axios/commentAxios';
import GroupParentComment from './GroupParentComment';
import { ParentComment, valueChangeEvent } from './interface';
import {
  ContentSubTitle,
  InputGroup,
  SubmitButton,
  TextArea,
  Wrapper,
} from './styled';

interface GroupCommentsProps {
  groupId: string;
  userId: string;
}

const GroupParentComments = (props: GroupCommentsProps) => {
  const { groupId, userId } = props;
  const [comments, setComments] = useState<ParentComment[]>([]);
  const [parentContent, setParentContent] = useState<string>('');

  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await commentAxios.getParentComments(
          groupId as string,
        );
        setComments(comments);
      } catch (e) {
        console.log(e);
      }
    };
    getComments();
    return () => {};
  }, [groupId]);

  // 그룹 댓글 내용 변경 이벤트 핸들러
  const onParentContentChange = (e: valueChangeEvent) => {
    const {
      target: { value },
    } = e;
    setParentContent(value);
  };

  // 그룹 댓글 등록
  const onCreateParentCommentClick = async () => {
    try {
      await commentAxios.createParentComment(groupId, parentContent);
      const comments = await commentAxios.getParentComments(groupId as string);
      setComments(comments);
      setParentContent('');
    } catch (e) {
      const { message } = e as Error;
      console.log(message);
    }
  };

  // 댓글 수정
  const onSaveComment = (commentId: number, content: string) => {
    const newComments = comments.map((comment) =>
      comment.commentId === commentId ? { ...comment, content } : comment,
    );
    setComments(newComments);
  };

  // 댓글 삭제
  const onRemoveComment = (commentId: number) => {
    const newComments = comments.filter(
      (comment) => comment.commentId !== commentId,
    );
    setComments(newComments);
  };

  // 댓글 작성 공간 렌더링
  const renderInputField = () => {
    const textAreaProps = {
      value: parentContent,
      onChange: onParentContentChange,
    };

    const buttonProps = {
      disabled: !Boolean(parentContent),
      onClick: onCreateParentCommentClick,
    };

    return (
      <InputGroup>
        <TextArea {...textAreaProps} />
        <SubmitButton {...buttonProps}>등록</SubmitButton>
      </InputGroup>
    );
  };

  const renderParentComments = () => {
    return (
      <React.Fragment>
        {comments.map((comment) => {
          const key = `${userId}-${groupId}${comment.commentId}`;
          const commentProps = {
            key,
            comment,
            userId,
            groupId,
            onSaveComment,
            onRemoveComment,
          };
          return <GroupParentComment {...commentProps} />;
        })}
      </React.Fragment>
    );
  };

  return (
    <Wrapper style={{ marginBottom: 80 }}>
      <ContentSubTitle>댓글</ContentSubTitle>
      {renderInputField()}
      {renderParentComments()}
    </Wrapper>
  );
};

export default GroupParentComments;
