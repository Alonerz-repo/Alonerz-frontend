import React, { useState, useEffect } from "react";
import { Grid, Text, Image } from "../elements";
import commnetAxios from "../axios/commentAxios";
import SubCmt from "./Comment.subCmt";

const MainCmt = (props: any) => {
  const { comment, uid, groupId } = props;

  const [onView, setView] = useState(false);
  const [getCmtNum, setCmtNum] = useState();
  const [childCmt, setChildCmt] = useState(null);

  //클릭시 댓글을 수정하는 함수입니다.
  const editCmt = (cmtId: any, content: any) => {
    const msg = "댓글을 수정합니다.";
    const mydata = window.prompt(msg, content);
    commnetAxios.editComment(cmtId, mydata).then((_) => {});
  };

  //클릭시 댓글을 삭제합니다.
  const removeCmt = (cmtId: any) => {
    commnetAxios.removeComment(cmtId).then((_) => window.location.reload());
  };

  //대댓글을 켜고 끌때, 비동기 통신을 해서 데이터를 집어넣습니다.
  const onChildCmt = (commentId: any) => {
    commnetAxios.getChildComment(groupId, commentId).then((res) => {
      if (res.comments.length < 1) {
        window.alert("댓글이 없슴다");
      }
      setChildCmt((prev: any) => {
        return { ...prev, res };
      });
    });

    setCmtNum(commentId);
    setView(!onView);
  };

  //대댓글을 작성합니다.
  const setCmtInCmt = (groupId: any, cmtId: any) => {
    const data = window.prompt("답글을 작성합니다.");
    commnetAxios
      .setChildComment(groupId, cmtId, data)
      .then((_) => window.location.reload());
  };

  return (
    <React.Fragment>
      {comment.map((value: any) => {
        return (
          <Grid>
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
                  <Text
                    _onClick={() => onChildCmt(value.commentId)}
                    margin="0px 10px 0px 0px"
                  >
                    댓글 보기 {value.childComments}개
                  </Text>

                  {uid === value.user.userId && (
                    <React.Fragment>
                      <Text
                        margin="0px 10px 0px 0px"
                        _onClick={() => {
                          editCmt(value.commentId, value.content);
                        }}
                      >
                        댓글수정
                      </Text>
                      <Text
                        _onClick={() => removeCmt(value.commentId)}
                        margin="0px 10px 0px 0px"
                      >
                        삭제
                      </Text>
                    </React.Fragment>
                  )}
                  <Text
                    margin="0px 10px 0px 0px"
                    _onClick={() => setCmtInCmt(groupId, value.commentId)}
                  >
                    답글달기
                  </Text>
                </Grid>
              </Grid>
              <div style={{ position: "absolute", right: "20px" }}>
                <Text>{value.updatedAt.substr(5, 11)}</Text>
              </div>
            </div>

            {/* 대댓글 */}
            <SubCmt
              onView={onView}
              getCmtNum={getCmtNum}
              commentId={value.commentId}
              childCmt={childCmt}
              uid={uid}
            ></SubCmt>
            {/* 대댓글 끝 */}
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default MainCmt;
