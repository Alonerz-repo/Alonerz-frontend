import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initialState } from "../axios/partyAxios";
import Create from "../components/Create";
import { useAppSelector } from "../store/config";

const CreateParty = () => {
  const time = useParams().time;
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user.userId) {
  //     alert("로그인이 필요한 서비스입니다.");
  //     navigate("/login");
  //   }
  // }, []);

  if (time) {
    return <Create time={parseInt(time)}></Create>;
  }
  return <Create></Create>;
};

export default CreateParty;
