import React from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";

const TestPage = () => {
  const test = useSelector((state) => (state.user.asd ? state.user.asd : ""));

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(userActions.testUser({ asd: "aaa" }));
  });

  return <React.Fragment>{test}</React.Fragment>;
};

export default TestPage;
