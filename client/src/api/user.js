import axios from 'axios';

export function loginAPI(data) {
    return axios.post('/api/user/login', data)
}

export function registerAPI(data) {
    return axios.post('/api/user/login', data)
}
