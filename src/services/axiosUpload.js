import axios from 'axios'
import store from '../store/store';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    },
})

instance.interceptors.request.use(
    config => {
        const token = store.getters.getToken
        // console.log('------------------------------')
        // console.log(token);
        // console.log('-------------------------------')
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// instance.interceptors.response.use((res) => {
//     // Do something with response data
//     // console.log('#----------------- RESPONSE INTERCEPTOR ---------------#')
//     // console.log(res)
//     // console.log('#------------------------------------------------------#')
//     return res;
// }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
// });

export default instance