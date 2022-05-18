import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Grid, Text, Input, Button, Image } from "../elements";
import commnetAxios from "../axios/commentAxios";

//파티 상세 페이지의 댓글 컴포넌트 입니다.

//코멘트 초기 설정 값입니다.
const initCmt: any = [
  {
    commentId: 0,
    content: "hello world",
    createdAt: "2022-05-18T10:17:36.646Z",
    updatedAt: "2022-05-18T10:17:36.646Z",
    user: {
      imageUrl: null,
      nickname: "???",
      userId: "81d96f2e-99e9-4e85-b761-8c48e6a0ac5d",
    },
  },
];
console.log(typeof initCmt);
const Comment = (props: any) => {
  // const { roomId } = props;
  const myRef = useRef();
  const roomId = "81bc52ec-852a-4394-b99a-7b60c3bb012a";
  const [comment, setComment] = useState<Array<any>>(initCmt);
  const [subCmt, setSubCmt] = useState();
  const [insertCmt, setInsertCmt] = useState();
  const [curCmt, setCurCmt] = useState();

  useEffect(() => {
    // 댓글 전체 목록 조회
    const myComment = async () => {
      await commnetAxios
        .getCommentList("81bc52ec-852a-4394-b99a-7b60c3bb012a")
        .then((res) => {
          setComment(res.comments);
        });
    };
    //선택한 하위 댓글 조회
    const myChildCmt = async () => {
      await commnetAxios
        .getChildComment("81bc52ec-852a-4394-b99a-7b60c3bb012a", 1)
        .then((res) => {
          console.log(res);
          setSubCmt(res.comments);
        });
    };
    myComment();
    myChildCmt();
  }, []);

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  const setCmt = async () => {
    await commnetAxios.setComment(roomId, insertCmt).then((res) => {
      console.log(res);
    });
  };
  const cmtHandler = (e: any) => {
    setInsertCmt(e.target.value);
  };
  const editCmt = () => {
    const msg = "댓글을 수정합니다.";
    const mydata = window.prompt(msg);

    console.log(mydata);
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
                <Text
                  _onClick={() => {
                    editCmt();
                  }}
                >
                  댓글수정
                </Text>
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
