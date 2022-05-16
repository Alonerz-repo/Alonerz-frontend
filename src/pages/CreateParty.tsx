import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { partyAxios } from "../axios/partyAxios";
import Create from "../components/Create";
import { useAppSelector } from "../store/config";

const CreateParty = () => {
  const time = useParams().time;
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.userId) {
      if (window.confirm("로그인이 필요합니다.")) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, []);

  if (time) {
    return (
      <Create
        group={partyAxios.initialState.group}
        time={parseInt(time)}
      ></Create>
    );
  }
  return <Create group={partyAxios.initialState.group}></Create>;
};

export default CreateParty;
