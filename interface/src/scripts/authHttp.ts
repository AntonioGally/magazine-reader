import axios from 'axios';

import { serverUrl } from './server';

const instance = axios.create({
    baseURL: serverUrl
});

instance.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('user_token');
    const userid = localStorage.getItem('user_id');
    request.headers["x-token"] = accessToken;
    request.headers["x-userId"] = userid;
    return request;
});


instance.interceptors.response.use(response => {
    if (response.status === 401) {
        localStorage.setItem("user_token", "");
        localStorage.setItem("user_id", "");

    }
    return response;
}, function (error) {
    if (error.response.data === "Forbidden") {
        window.location.href = window.location.origin;
    }
    // if (window.location.hash !== '/magazines' && window.location.hash !== '/editions') {
    //     window.location.hash = '/';
    // }
})

export default instance;