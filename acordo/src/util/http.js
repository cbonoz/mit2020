const axios = require('axios');

const BASE_URL = `http://localhost:5000`;

export const getCode = (text) => axios.post(`${BASE_URL}/generate`, { text });
export const uploadFile = (name, code) => axios.post(`${BASE_URL}/upload`, { name, code });
export const pullFile = (skylink) => axios.post(`${BASE_URL}/pull`, { skylink });
export const getFiles = () => axios.get(`${BASE_URL}/all`);
