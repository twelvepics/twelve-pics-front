import axios from 'axios';
import store from '../store/store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    // console.log('In interceptor')
    const token = store.getters.getToken;
    // console.log('------------------------------')
    // console.log(token);
    // console.log('-------------------------------')
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;
