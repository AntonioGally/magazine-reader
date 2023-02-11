import axios from 'axios';
import { serverUrl } from './server';

const instance = axios.create({
    baseURL: serverUrl
});

export default instance;
