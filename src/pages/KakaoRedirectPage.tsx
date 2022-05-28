import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginAxios from "../axios/loginAxios";
import authAxios from "../axios/authAxios";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      //프론트에서 카카오 로그인페이지로 이동하면 카카오에선 백엔드로 응답을 보냅니다.
      //응답을 받은 백엔드에서 이 페이지로 이동요청과 kakaoid를 쿼리스트링으로 보내줍니다.
      //쿼리에서 kakaoid만 분리하여 백엔드로 카카오 아이디를 보내서 사용자 정보를 조회합니다.
      const kakaoId = new URL(window.location.href).searchParams.get("kakaoId");

      try {
        await loginAxios.Login(kakaoId);
        const {
          auth: { needProfile },
        } = await authAxios.authUser();
        return needProfile ? navigate("/user/profile/edit") : navigate("/");
      } catch (err) {
        console.log(err);
      }
      //백엔드에서 카카오 아이디로 사용자 등록 여-부를 파악하고 엑세스토큰, 리프레시토큰, needProfile정보를 바디로 보내줍니다.
      // needProfile은 boolean으로 최초 1회는 true 이후로 false를 내보냅니다.
    };
    login();
  }, [navigate]);

  return <></>;
};

export default Redirect;
