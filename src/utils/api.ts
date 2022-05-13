import axios from 'axios';
import cookie from './cookie';

// 최원영
export interface ErrorData {
  error: string;
  message: string;
  statusCode: number;
}

// 최원영
export const errorHandler = (err: ErrorData) => {
  const { statusCode, message, error } = err;
  console.log(statusCode);
  console.log(message);
  console.log(error);
};

// 최원영
export const baseUrl = `http://localhost:5000`;
export const getUrl = (path: string) => `${baseUrl}${path}`;
export const getHeaders = () => ({
  Authorization: `Bearer ${cookie.get('accessToken')}`,
});

// 최원영 (호출할 때마다 알아서 header에 토큰을 때려박음)
// 아직 아무곳에서도 사용하지 않음
export const api = () => {
  const accessToken = cookie.get('accessToken');
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return axios;
};
