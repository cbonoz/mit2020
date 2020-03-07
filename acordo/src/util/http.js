const axios = require('axios');

const BASE_URL = `http://localhost:5000`;

export const getCode = (text) => axios.post(`${BASE_URL}/generate`, { text });
export const uploadFile = (name, code) => axios.post(`${BASE_URL}/upload`, { name, code });
