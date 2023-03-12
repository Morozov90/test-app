import axios from 'axios';
import { ILogin } from '../pages/Login';
import { ISignUp } from '../pages/Signup';
import { ILoginResponse, IUserResponse } from './types';

const BASE_URL = 'http://localhost:3030/api/';

export const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const signUpUserFn = async (user: ISignUp) => {
    const response = await authApi.post<ILoginResponse>('auth/register', user);
    return response.data;
};

export const loginUserFn = async (user: ILogin) => {
    const response = await authApi.post<ILoginResponse>('auth/login', user);
    return response.data;
};

export const getMeFn = async () => {
    const token = localStorage.getItem('token');

    let headers = {}
    if (token) {
        headers = {
            headers: { Authorization: `Bearer ${token}` },
        };
    }
    const response = await authApi.get<IUserResponse>('users/current', headers);
    return response.data;
};
