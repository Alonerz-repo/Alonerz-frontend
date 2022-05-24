export type valueChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export interface CommentUser {
  profileImageUrl: string;
  characterImageId: number;
  careerId: number;
  yearId: number;
  nickname: '';
  userId: '';
}

export interface ParentComment {
  commentId: number;
  childCommentCount: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
}

export interface ChildComment {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
}
