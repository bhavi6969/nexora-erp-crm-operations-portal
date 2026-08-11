import axios from 'axios';
const api = axios.create({ baseURL: '/api' });
console.log("Axios resolved URL:", api.getUri({ url: '/stock/movements' }));
console.log("Axios resolved URL 2:", api.getUri({ url: 'stock/movements' }));
