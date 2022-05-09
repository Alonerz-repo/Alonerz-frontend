import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useAppDispatch } from "../store/config";
import { kakaoLogin } from "../store/slices/loginSlice";

const Redirect = () => {
  const kakaoId = new URL(window.location.href).searchParams.get("kakaoId");
  console.log(kakaoId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(kakaoLogin());
  });
  return (
    <React.Fragment>
      <h1>카카오 리다이렉트 페이지</h1>
    </React.Fragment>
  );
};

export default Redirect;
