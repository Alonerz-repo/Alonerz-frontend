import { useEffect } from "react";
import { useAppSelector } from "../store/config";
import { useNavigate } from "react-router-dom";

// 사용자가 로그인했는지 확인한 후 비로그인 시 로그인 화면으로 navigate
const useLoginCheck = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user.userId === "-1") {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }, [navigate, user.userId]);
};
export default useLoginCheck;
