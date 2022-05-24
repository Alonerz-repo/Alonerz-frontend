import React from "react";
import { Grid, Text, Image } from "../elements";
import commnetAxios from "../axios/commentAxios";

const subCmt = (props: any) => {
  const { onView, getCmtNum, commentId, childCmt, uid } = props;
  if (childCmt === null) {
    return <></>;
  }

  const comment = childCmt.res.comments;

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
  return (
    <React.Fragment>
      {onView && getCmtNum === commentId && (
        <>
          {comment.map((value: any, index: any) => {
            return (
              <React.Fragment key={value.commentId}>
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    padding: "10px 0px 10px 40px",
                  }}
                >
                  <div>
                    <Image size="33px"></Image>
                  </div>

                  <Grid padding="0px 0px 0px 6px">
                    <Grid display="flex">
                      <Text
                        margin="0px 10px 0px 0px"
                        customize="font-weight: bold;"
                      >
                        {value.user.nickname}
                      </Text>
                      <Text>직군/직업</Text>
                    </Grid>
                    <Text margin="6px 0px 6px 0px">{value.content}</Text>
                    <Grid display="flex">
                      {uid === value.user.userId && (
                        <React.Fragment>
                          <Text
                            customize="color: #BDBDBD; cursor: pointer;"
                            margin="0px 10px 0px 0px"
                            _onClick={() => {
                              editCmt(value.commentId, value.content);
                            }}
                          >
                            댓글수정
                          </Text>
                          <Text
                            customize="color: #BDBDBD; cursor: pointer;"
                            _onClick={() => removeCmt(value.commentId)}
                            margin="0px 10px 0px 0px"
                          >
                            삭제
                          </Text>
                        </React.Fragment>
                      )}
                    </Grid>
                  </Grid>

                  <div style={{ position: "absolute", right: "20px" }}>
                    <Text>{value.updatedAt.substr(5, 11)}</Text>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </>
      )}
    </React.Fragment>
  );
};

export default subCmt;
