import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import Modify from "../components/InModifyUser";
import userAxios from "../axios/userAxios";
import { useAppDispatch, useAppSelector } from "../store/config";
import { getUserAxios } from "../store/slices/userSlice";

const ModifyUser = () => {
  const dispatch = useAppDispatch();
  const infomaion = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserAxios());
  }, []);
  return (
    <React.Fragment>
      <Modify user={infomaion} />
    </React.Fragment>
  );
};

export default ModifyUser;
