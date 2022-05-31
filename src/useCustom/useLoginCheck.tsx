import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/config";
import { useNavigate } from "react-router-dom";
import { authUser } from "../store/slices/userSlice";

// 사용자가 로그인했는지 확인한 후 비로그인 시 로그인 화면으로 navigate
const useLoginCheck = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(authUser());
    if (user.userId === "-1") {
      navigate("/login");
    }
  }, []);
};
export default useLoginCheck;
