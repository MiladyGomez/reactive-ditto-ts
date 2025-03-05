import axios from 'axios';

const instance = axios.create({
    baseURL: `${(window as any)._dittoURL_}/wp-json/`
});

export default instance;