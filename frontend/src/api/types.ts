import { AxiosError } from 'axios';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
}

export interface ILoginResponse {
    userId: string;
    token: string;
    email: string;
}

export interface IUserResponse {
    data: IUser
}

export interface IErrorBase extends AxiosError<{ message: string }> {}
