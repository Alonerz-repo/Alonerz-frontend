import { useAppDispatch, useAppSelect } from "../store/config.hook";
import { authUser } from "../store/slices/userSlice";

const Auth = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelect((state) => state.user);
  if (userInfo.statusCode) {
    console.log("hello statusCode");
    switch (userInfo.statusCode) {
      case 401:
        return console.log("로그인 피료!");
    }
  }
  if (userInfo.userId === -1) {
    console.log("hello userId -1");
    dispatch(authUser);
  }
};

export default Auth;
