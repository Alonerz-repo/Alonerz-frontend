import { useEffect, useState } from "react";
import authAxios from "../axios/authAxios";

const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const request = async () => {
      const response = await authAxios.authUser();
      return response ? setAuth(response) : setAuth(null);
    };
    request();
  }, []);
  return auth;
};

export default useAuth;
