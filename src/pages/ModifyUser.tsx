import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import { useAppDispatch, useAppSelector } from "../store/config";
import { getUserAxios, setUserAxios } from "../store/slices/userSlice";
import Modify from "../components/InModifyUser";

const ModifyUser = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserAxios);
  }, []);
  return (
    <React.Fragment>
      <Modify />
    </React.Fragment>
  );
};

export default ModifyUser;
