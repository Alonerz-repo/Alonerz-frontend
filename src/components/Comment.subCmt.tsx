import React from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";

const subCmt = (props: any) => {
  const { onView, getCmtNum, commentId, childCmt } = props;
  if (childCmt === null) {
    return <></>;
  }

  const comment = childCmt.res.comments;

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
                    padding: "10px 0px 10px 8vw",
                  }}
                >
                  <div>
                    <Image size="33px"></Image>
                  </div>

                  <Grid>
                    <Grid display="flex">
                      <Text margin="0px 10px 0px 0px">
                        {value.user.nickname}
                      </Text>
                      <Text>직군/직업</Text>
                    </Grid>
                    <Text>{value.content}</Text>
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
