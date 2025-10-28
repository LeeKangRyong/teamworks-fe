import axios from 'axios';
import { ENV } from '../config/env';

const apiClient = axios.create({
    baseURL: ENV.BASE_URL,
    timeout: 10000,
});

export { apiClient };