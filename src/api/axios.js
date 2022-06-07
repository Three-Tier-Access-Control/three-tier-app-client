import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL_PRODUCTION;
const HARDWARE_URL = process.env.REACT_APP_HARDWARE_URL_PRODUCTION;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosHardware = axios.create({
    baseURL: HARDWARE_URL
});
