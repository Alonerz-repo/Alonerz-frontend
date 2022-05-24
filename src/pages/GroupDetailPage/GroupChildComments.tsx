import React, { useState } from 'react';
import styled from 'styled-components';
import commentAxios from '../../axios/commentAxios';
import GroupChildComment from './GroupChildComment';
import { ChildComment, valueChangeEvent } from './interface';
import { InputGroup, SubmitButton, TextArea, Wrapper } from './styled';

interface ChildCommentsProps {
  userId: string;
  groupId: string;
  parentId: number;
  childCommentCount: number;
  reply: boolean;
}

const VisibleButton = styled.div`
  cursor: pointer;
`;

const GroupChildComments = (props: ChildCommentsProps) => {
  const { userId, groupId, parentId, childCommentCount, reply } = props;
  const [comments, setComments] = useState<ChildComment[]>([]);
  const [commentCount, setCommentCount] = useState<number>(childCommentCount);
  const [childContent, setChildContent] = useState<string>('');
  const [showChildComment, setShowChildComment] = useState<boolean>(false);

  // 하위 댓글 내용 변경 이벤트 핸들러
  const onChildContentChange = (e: valueChangeEvent) => {
    const {
      target: { value },
    } = e;
    setChildContent(value);
  };

  // 하위 댓글 등록
  const onCreateChildCommentClick = async () => {
    try {
      await commentAxios.createChildComment(groupId, parentId, childContent);
      const comments = await commentAxios.getChildComments(groupId, parentId);
      setComments(comments);
      setCommentCount(comments.length);
      setChildContent('');
      setShowChildComment(true);
    } catch (e) {
      const { message } = e as Error;
      console.log(message);
    }
  };

  // N개의 댓글 보기 or 숨기기
  const onShowChildComments = async () => {
    if (commentCount > 0) {
      try {
        const comments = await commentAxios.getChildComments(groupId, parentId);
        setComments(comments);
        setCommentCount(comments.length);
      } catch (e) {
        const { message } = e as Error;
        console.log(message);
      }
    }
    setShowChildComment(!showChildComment);
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
    setCommentCount(newComments.length);
  };

  // 하위 댓글 작성 공간 렌더링
  const renderInputField = () => {
    const textAreaProps = {
      value: childContent,
      onChange: onChildContentChange,
    };

    const buttonProps = {
      disabled: !Boolean(childContent),
      onClick: onCreateChildCommentClick,
    };

    return (
      <React.Fragment>
        {reply ? (
          <InputGroup>
            <TextArea {...textAreaProps} />
            <SubmitButton {...buttonProps}>등록</SubmitButton>
          </InputGroup>
        ) : null}
      </React.Fragment>
    );
  };

  // 댓글 더보기/숨김 버튼 렌더링
  const renderShowCommentsButton = () => {
    return (
      <React.Fragment>
        {commentCount ? (
          <VisibleButton onClick={onShowChildComments}>
            {showChildComment ? '숨기기' : `${commentCount}개의 답글 보기`}
          </VisibleButton>
        ) : null}
      </React.Fragment>
    );
  };

  // 하위 댓글 렌더링
  const renderChildComments = () => {
    return (
      <React.Fragment>
        {showChildComment
          ? comments.map((comment) => {
              const key = `${userId}-${groupId}${comment.commentId}`;
              const commentProps = {
                key,
                comment,
                userId,
                onSaveComment,
                onRemoveComment,
              };
              return <GroupChildComment {...commentProps} />;
            })
          : null}
      </React.Fragment>
    );
  };

  const wrapperProps = {
    style: {
      padding: 10,
      width: '100%',
    },
  };

  return (
    <React.Fragment>
      {childCommentCount ? (
        <Wrapper {...wrapperProps}>
          {renderInputField()}
          {renderShowCommentsButton()}
          {renderChildComments()}
        </Wrapper>
      ) : null}
    </React.Fragment>
  );
};

export default GroupChildComments;
