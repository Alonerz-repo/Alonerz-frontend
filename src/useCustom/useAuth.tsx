import { useEffect, useState } from "react";
import userAxios from "../axios/userAxios";

const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const request = async () => {
      const response = await userAxios.authUser();
      return response ? setAuth(response) : setAuth(null);
    };
    request();
  }, []);
  return auth;
};

export default useAuth;
