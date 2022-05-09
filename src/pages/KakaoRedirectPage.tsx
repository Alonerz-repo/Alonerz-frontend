import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useAppDispatch } from "../store/config";
import { kakaoLogin, kakaoGetToken } from "../store/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";

const Redirect = () => {
  const kakaoId = new URL(window.location.href).searchParams.get("kakaoId");
  // const kakaoId = "thisiskakaoid";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(kakaoId);
    console.log(process.env.REACT_APP_API_URL);
    try {
      dispatch(kakaoGetToken(kakaoId)).then((res) => {
        console.log(res.payload);
        const isSignup = res.payload.isSignup;
        switch (isSignup) {
          case true:
            return navigate("/");
          case false:
            return navigate("/signup");
          default:
            window.alert("ERROR!");
            return navigate("/login");
        }
      });
    } catch (err) {
      console.log(err);
      debugger;
    }
  }, []);
  return (
    <React.Fragment>
      <h1>카카오 리다이렉트 페이지</h1>
    </React.Fragment>
  );
};

export default Redirect;
