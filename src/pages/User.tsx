import React, { useEffect, useState } from "react";
import MyInfo from "../components/MyInfo";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import partyAxios from "../axios/partyAxios";
import { useAppSelect } from "../store/config.hook";
import { Group } from "../common/interface";

//유저 프로필 페이지 뷰 입니다.
const User = () => {
  const param = useParams();
  const navigate = useNavigate();
  const userInfo = useAppSelect((state) => state.user);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    //유저가 참여했던 파티들의 리스트를 요청합니다.
    try {
      partyAxios.getJoinedParty(param.userId).then((res) => {
        // setGroups(res.data.groups);
      });
    } catch (err) {
      console.log(err);
    }
  }, [param]);

  // 프로필을 렌더링 합니다.
  const renderUserInfo = () => {
    const text = "프로필";
    const headerProps =
      param.userId === userInfo.userId
        ? {
            text,
            type: "user",
            home: () => {
              navigate("/");
            },
            setting: () => {
              navigate("/user/config");
            },
          }
        : { text };

    // 이것은 프롭스 입니다.
    const infoProps = { groups, uid: param.userId };

    // 여기에서 컴포넌트들을 리턴합니다.
    return (
      <React.Fragment>
        <Header {...headerProps} />
        <MyInfo {...infoProps} />
      </React.Fragment>
    );
  };

  // 그러면 여기에서 렌더링이 됩니다.
  return renderUserInfo();
};
export default User;
