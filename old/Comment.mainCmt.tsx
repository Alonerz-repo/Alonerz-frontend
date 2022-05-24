/* 작업자(수정 예정) : 최원영 */

import React, { useState, useEffect } from 'react';
import { Grid, Text, Image } from '../elements';
import commnetAxios from '../axios/commentAxios';
import SubCmt from './Comment.subCmt';
import { findCareer } from '../utils/career';

const MainCmt = (props: any) => {
  const { comments, uid, groupId } = props;

  const [onView, setView] = useState(false);
  const [getCmtNum, setCmtNum] = useState();
  const [childCmt, setChildCmt] = useState(null);

  //클릭시 댓글을 수정하는 함수입니다.
  const editCmt = (cmtId: any, content: any) => {
    const msg = '댓글을 수정합니다.';
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
        window.alert('댓글이 없슴다');
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
    const data = window.prompt('답글을 작성합니다.');
    commnetAxios
      .setChildComment(groupId, cmtId, data)
      .then((_) => window.location.reload());
  };

  const getCareer = (careerId: any) => {
    const car = findCareer(careerId);
    return `${car?.careerGroupName} / ${car?.careerItemName}`;
  };

  return (
    <React.Fragment>
      {comments.map((value: any, index: number) => {
        const career = getCareer(value.user.careerId);
        return (
          <Grid key={index}>
            <div
              style={{ display: 'flex', position: 'relative', padding: '20px' }}
              key={value.commentId}
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
                  <Text>{career}</Text>
                </Grid>
                <Text margin="6px 0px 6px 0px">{value.content}</Text>
                <Grid display="flex">
                  <Text
                    customize="color: #BDBDBD; cursor: pointer;"
                    _onClick={() => onChildCmt(value.commentId)}
                    margin="0px 10px 0px 0px"
                  >
                    댓글 보기 {value.childComments}개
                  </Text>
                </Grid>
              </Grid>
              <div style={{ position: 'absolute', right: '20px' }}>
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
