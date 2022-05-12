import React from "react";
import MyInfo from "../components/MyInfo";
import Header from "../components/Header";

const User = () => {
  return (
    <React.Fragment>
      <Header text="프로필"></Header>
      <MyInfo></MyInfo>
    </React.Fragment>
  );
};
export default User;
