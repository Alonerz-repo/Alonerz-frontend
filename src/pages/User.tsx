import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button } from "../elements";
import Card from "../components/Card";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { getUserAxios } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import MyInfo from "../components/MyInfo";

const User = () => {
  return (
    <React.Fragment>
      <MyInfo></MyInfo>
    </React.Fragment>
  );
};
export default User;
