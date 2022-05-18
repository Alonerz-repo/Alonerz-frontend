import React from "react";
import styled from "styled-components";
import { Grid, Text, Input, Button, Image } from "../elements";

//파티 상세 페이지의 댓글 컴포넌트 입니다.

const Comment = () => {
  return (
    <React.Fragment>
      <Text>댓글</Text>
      <div style={{ display: "flex", position: "relative", padding: "20px" }}>
        <div>
          {/* <Image size="33px"></Image> */}

          {/* <img
            src="https://cdn.pixabay.com/photo/2013/05/30/18/21/cat-114782_1280.jpg"
            style={{ width: "33px", height: "33px", borderRadius: "15px" }}
          ></img> */}
        </div>

        <Grid>
          <Grid display="flex">
            <Text>닉네임</Text>
            <Text>직군/직업</Text>
          </Grid>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
            tempore quasi nulla. Officiis quo quidem, nobis laudantium incidunt
            quisquam alias? A modi veritatis eaque fuga possimus odit velit
            voluptatem excepturi. Quia, nobis soluta suscipit voluptas provident
            facilis error modi ut. Nesciunt odio natus possimus minima officia
            quas sit, dicta est quos consequuntur. Libero officia dolores
            voluptas mollitia, recusandae reiciendis temporibus.
          </Text>
          <Text>답글달기</Text>
        </Grid>
        <div style={{ position: "absolute", right: "20px" }}>
          <Text>오늘</Text>
        </div>
      </div>
      <Grid display="flex"></Grid>
    </React.Fragment>
  );
};

export default Comment;
