import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (key: any, value: any) => {
  cookie.set(key, value);
};

export const getCookie = (key: any) => {
  try {
    return cookie.get(key);
  } catch {
    return "";
  }
};

export const removeCookie = (key: any) => {
  return cookie.remove(key);
};
