import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../store/config";
import { kakaoLogin } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoId = new URL(window.location.href).searchParams.get("kakaoId");
    try {
      dispatch(kakaoLogin(kakaoId)).then((res) => {
        const isSignup = res.payload.needProfile;

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
