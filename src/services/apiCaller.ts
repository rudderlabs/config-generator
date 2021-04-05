import Axios from 'axios';

const BACKEND_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || 'https://api.rudderlabs.com/';
// process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/';
const apiCaller = () => {
  return Axios.create({
    baseURL: BACKEND_BASE_URL,
    timeout: 4000,
    headers: { 'Content-Type': 'application/json' },
  });
};

const apiServerCaller = () => {
  let axiosInstance = Axios.create({
    baseURL: '',
    // timeout: timeout,
    headers: {
      'Content-Type': 'application/json',
    },
    // withCredentials: true,
  });
  return axiosInstance;
};

export { apiCaller, apiServerCaller };
