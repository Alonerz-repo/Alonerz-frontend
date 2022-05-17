import { useEffect } from "react";
import { useAppSelector } from "../store/config";
import { useNavigate } from "react-router-dom";

const useLoginCheck = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user.userId === "-1") {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }, []);
};
export default useLoginCheck;
