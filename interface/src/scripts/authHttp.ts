import axios from 'axios';

import { serverUrl } from './server';

const instance = axios.create({
    baseURL: serverUrl || process.env.SERVER_HOST
});

instance.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('user_token');
    const userid = localStorage.getItem('user_id');
    request.headers["x-token"] = accessToken;
    request.headers["x-userId"] = userid;
    return request;
});


instance.interceptors.response.use(response => {
    return response;
}, function (error) {
    if (error.response.data === "Forbidden" || error.response.data === "Unauthorized") {
        localStorage.setItem("user_token", "");
        localStorage.setItem("user_id", "");
        window.location.href = window.location.origin;
    }
    return Promise.reject(error);
})

export default instance;