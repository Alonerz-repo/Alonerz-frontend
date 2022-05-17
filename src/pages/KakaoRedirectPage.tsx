import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginAxios from "../axios/loginAxios";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      const kakaoId = new URL(window.location.href).searchParams.get("kakaoId");
      const needProfile = await loginAxios.kakaoLogin(kakaoId);
      return needProfile ? navigate("/") : navigate("/");
    };
    login();
  }, []);
  return (
    <React.Fragment>
      <h1>카카오 리다이렉트 페이지</h1>
    </React.Fragment>
  );
};

export default Redirect;
