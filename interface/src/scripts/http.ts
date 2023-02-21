import axios from 'axios';
import process from 'process';
import { serverUrl } from './server';

const instance = axios.create({
    baseURL: serverUrl || process.env.SERVER_HOST
});

export default instance;
