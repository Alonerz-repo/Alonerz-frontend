import axios from 'axios';
import { getCookie } from './cookie';

// 최원영
export interface ErrorData {
  error: string;
  message: string;
  statusCode: number;
}

// 최원영
export const errorHandler = (err: ErrorData) => {
  const { statusCode, message, error } = err;
  alert(message);
  console.log(error);
  console.log(statusCode);
};

// 최원영
export const baseUrl = `http://localhost:5000`;
export const getUrl = (path: string) => `${baseUrl}/${path}`;
export const getHeaders = () => ({
  Authorization: `Bearer ${getCookie('accessToken')}`,
});

// 최원영 (호출할 때마다 알아서 header에 토큰을 때려박음)
export const api = () => {
  const accessToken = getCookie('accessToken');
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return axios;
};
