import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:7000/api"
});
export default instance;