/* 작업자(1차 완료) : 최원영 */

import React, { useEffect, useState } from 'react';
import { Grid, Text, Input, Button } from '../elements';
import commnetAxios from '../axios/commentAxios';
import { useAppSelect } from '../store/config.hook';
import MainCmt from '../components/Comment.mainCmt';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

interface CommentProps {
  groupId: string;
}

interface CommentUserProps {
  profileImageUrl: string | null;
  characterImageId: number;
  nickname: '';
  userId: '';
}

interface CommentState {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUserProps;
}

const Comment = (props: CommentProps) => {
  const { groupId } = props;
  const { userId } = useAppSelect((state) => state.user);
  const [comments, setComments] = useState<CommentState[]>([]);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const myComment = async (): Promise<void> => {
      const { comments } = await commnetAxios.getParentComments(groupId);
      setComments(comments);
    };
    myComment();
  }, [groupId]);

  const onCommentChange = (e: inputEvent): void => {
    const {
      target: { value },
    } = e;
    setComment(value);
  };

  const onCommentCreate = async (): Promise<void> => {
    await commnetAxios.createParentComment(groupId, comment);
  };

  const groupCommentsProps = {
    comments,
    uid: userId,
    groupId,
  };

  const inputProps = {
    value: comment,
    _onChange: onCommentChange,
  };

  const buttonProps = {
    _onClick: onCommentCreate,
  };

  return (
    <React.Fragment>
      <Text>댓글</Text>
      <MainCmt {...groupCommentsProps} />
      <Grid>
        <Input {...inputProps} />
        <Button {...buttonProps}>입력</Button>
      </Grid>
    </React.Fragment>
  );
};

export default Comment;
