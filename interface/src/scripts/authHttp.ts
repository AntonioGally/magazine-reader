import axios from 'axios';
import { serverUrl } from './server';

const instance = axios.create({
    baseURL: serverUrl
});

instance.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('access_token');
    const userid = localStorage.getItem('user_id');
    request.headers["x-token"] = accessToken;
    request.headers["x-userId"] = userid;
    return request;
});


export default instance;