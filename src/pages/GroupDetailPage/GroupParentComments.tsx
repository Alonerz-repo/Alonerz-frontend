import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import commentAxios from '../../axios/commentAxios';
import { Button, Grid, Input, Text } from '../../elements';
import GroupParentComment from './GroupParentComment';
import { ParentComment } from './interface';

type inputEvent = React.ChangeEvent<HTMLInputElement>;
type inputEventHandler = React.ChangeEventHandler<HTMLInputElement>;
type buttonEventHandler = React.MouseEventHandler<HTMLButtonElement>;

interface GroupCommentsProps {
  groupId: string;
  userId: string;
}

const inputProps = (value: string, _onChange: inputEventHandler) => ({
  value,
  _onChange,
});

const buttonProps = (disabled: boolean, _onClick: buttonEventHandler) => ({
  disabled,
  _onClick,
});

const textProps = {
  comment: {
    bold: true,
    type: 'line',
    titleText: '댓글',
    margin: '10px 0 5px',
  },
};

const InputField = styled.div`
  display: flex;
  flex-direction: row;
`;

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
        console.log(comments);
        setComments(comments);
      } catch (e) {
        console.log(e);
      }
    };
    getComments();
    return () => {};
  }, [groupId]);

  // 그룹 댓글 내용 변경 이벤트 핸들러
  const onParentContentChange = (e: inputEvent) => {
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

  // 댓글 삭제
  const onRemoveComment = (commentId: number) => {
    const newComments = comments.filter(
      (comment) => comment.commentId !== commentId,
    );
    setComments(newComments);
  };

  // 댓글 작성 공간 렌더링
  const renderInputField = () => {
    return (
      <InputField>
        <Input {...inputProps(parentContent, onParentContentChange)} />
        <Button
          {...buttonProps(!Boolean(parentContent), onCreateParentCommentClick)}
        >
          입력
        </Button>
      </InputField>
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
            onRemoveComment,
          };
          return <GroupParentComment {...commentProps} />;
        })}
      </React.Fragment>
    );
  };

  return (
    <Grid padding="20px">
      <Text {...textProps.comment} />
      {renderInputField()}
      {renderParentComments()}
    </Grid>
  );
};

export default GroupParentComments;
