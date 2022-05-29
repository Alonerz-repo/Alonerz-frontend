import cookie from "./cookie";

// 최원영
const baseUrl = process.env.REACT_APP_API_URL;
export const getUrl = (path: string) => `${baseUrl}${path}`;
export const getHeaders = () => ({
  Authorization: `Bearer ${cookie.get("accessToken")}`,
});
