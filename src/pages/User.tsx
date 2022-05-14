import React, { useEffect, useState } from "react";
import MyInfo from "../components/MyInfo";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { auth } from "../store/slices/userSlice";
import userAxios, { userState } from "../axios/userAxios";

const User = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState(userState.user);
  const user = useAppSelect((state) => state.user);

  useEffect(() => {
    dispatch(auth());
    userAxios.getUser().then((res) => {
      setState(res.user);
    });
  }, []);
  if (param.userId === user.userId?.toString()) {
    return (
      <React.Fragment>
        <Header
          type="user"
          text="프로필"
          home={() => navigate("/")}
          setting={() => navigate("/user/config")}
        ></Header>
        <MyInfo user={state} uid={param.userId}></MyInfo>
      </React.Fragment>
    );
  } else if (param.userId !== user.userId?.toString()) {
    return (
      <React.Fragment>
        <Header text="프로필"></Header>
        <MyInfo user={state} uid={param.userId}></MyInfo>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Header text="프로필"></Header>
        <h1>no infomation</h1>
      </React.Fragment>
    );
  }
};
export default User;
