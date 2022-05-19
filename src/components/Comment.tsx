import React, { useEffect, useState } from "react";
import { Grid, Text, Input, Button } from "../elements";
import commnetAxios from "../axios/commentAxios";
import { useAppSelect } from "../store/config.hook";
import MainCmt from "../components/Comment.mainCmt";

//파티 상세 페이지의 댓글 컴포넌트 입니다.
//파티 CRUD완성 리팩토링 시급

//코멘트 초기 설정 값입니다.
const initCmt: any = [
  {
    commentId: 0,
    content: "",
    createdAt: "",
    updatedAt: "",
    user: {
      imageUrl: null,
      nickname: "",
      userId: "",
    },
  },
];

const Comment = (props: any) => {
  const { groupId } = props;
  //유저정보를 리덕스에서 가져옵니다.
  const user = useAppSelect((state) => state.user);
  const [comment, setComment] = useState<Array<any>>(initCmt);
  const [insertCmt, setInsertCmt] = useState();

  useEffect(() => {
    // 댓글 전체 목록 조회
    const myComment = async () => {
      await commnetAxios.getCommentList(groupId).then((res) => {
        setComment(res.comments);
      });
    };
    myComment();
  }, []);

  //댓글을 업로드 합니다.
  const setCmt = () => {
    commnetAxios.setComment(groupId, insertCmt).then((_) => {
      window.location.reload();
    });
  };
  //입력값을 변경합니다.
  const cmtHandler = (e: any) => {
    setInsertCmt(e.target.value);
  };
  return (
    <React.Fragment>
      <Text>댓글</Text>

      {/* 댓글 리스트 */}
      <MainCmt comment={comment} uid={user.userId} groupId={groupId} />

      <Grid>
        <Input value={insertCmt} _onChange={(e: any) => cmtHandler(e)}></Input>
        <Button _onClick={setCmt}>입력</Button>
      </Grid>
    </React.Fragment>
  );
};

export default Comment;
