import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text, Input, Button, Image } from "../elements";
import commnetAxios from "../axios/commentAxios";
import { useAppSelect } from "../store/config.hook";

//파티 상세 페이지의 댓글 컴포넌트 입니다.

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
  const user = useAppSelect((state) => state.user);
  const [comment, setComment] = useState<Array<any>>(initCmt);
  const [subCmt, setSubCmt] = useState();
  const [insertCmt, setInsertCmt] = useState();
  const [curCmt, setCurCmt] = useState();

  useEffect(() => {
    // 댓글 전체 목록 조회
    const myComment = async () => {
      await commnetAxios.getCommentList(groupId).then((res) => {
        setComment(res.comments);
      });
    };
    //선택한 하위 댓글 조회
    //미완성
    // const myChildCmt = async () => {
    //   await commnetAxios.getChildComment(groupId, 4).then((res) => {
    //     setSubCmt(res.comments);
    //   });
    // };
    myComment();
    // myChildCmt();
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

  //클릭시 댓글을 수정하는 함수입니다.
  const editCmt = (cmtId: any, content: any) => {
    const msg = "댓글을 수정합니다.";
    const mydata = window.prompt(msg, content);
    commnetAxios
      .editComment(cmtId, mydata)
      .then((_) => window.location.reload());
  };

  //클릭시 댓글을 삭제합니다.
  const removeCmt = (cmtId: any) => {
    commnetAxios.removeComment(cmtId).then((_) => window.location.reload());
  };
  return (
    <React.Fragment>
      <Text>댓글</Text>

      {/* 댓글 리스트 */}
      {comment.map((value) => {
        return (
          <div
            style={{ display: "flex", position: "relative", padding: "20px" }}
            key={value.commentId}
            id={value.commentId}
          >
            <div>
              <Image size="33px"></Image>
            </div>

            <Grid>
              <Grid display="flex">
                <Text margin="0px 10px 0px 0px">{value.user.nickname}</Text>
                <Text>직군/직업</Text>
              </Grid>
              <Text>{value.content}</Text>
              <Grid display="flex">
                <Text margin="0px 10px 0px 0px">답글달기</Text>
                {user.userId === value.user.userId && (
                  <Text
                    margin="0px 10px 0px 0px"
                    _onClick={() => {
                      editCmt(value.commentId, value.content);
                    }}
                  >
                    댓글수정
                  </Text>
                )}
                {user.userId === value.user.userId && (
                  <Text _onClick={() => removeCmt(value.commentId)}>삭제</Text>
                )}
              </Grid>
            </Grid>

            <div style={{ position: "absolute", right: "20px" }}>
              <Text>{value.updatedAt.substr(5, 11)}</Text>
            </div>
          </div>
        );
      })}

      {/* 하위 댓글 리스트 */}
      {/* <div
                style={{
                  display: "flex",
                  position: "relative",
                  padding: "20px",
                }}
              >
                <div>
                  <Image size="33px"></Image>
                </div>

                <Grid>
                  <Grid display="flex">
                    <Text>닉네임</Text>
                    <Text>직군/직업</Text>
                  </Grid>
                  <Text>hello???????</Text>
                  <Text>답글달기</Text>
                </Grid>
                <div style={{ position: "absolute", right: "20px" }}>
                  <Text>오늘</Text>
                </div>
              </div> */}
      {/* 하위댓글 끝 */}

      <Grid>
        <Input value={insertCmt} _onChange={(e: any) => cmtHandler(e)}></Input>
        <Button _onClick={setCmt}>입력</Button>
      </Grid>
    </React.Fragment>
  );
};

export default Comment;
