/* eslint-disable camelcase */
import { baseUrl } from '../constants';
import HTTPTransport from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

export class AuthAPI extends BaseAPI {
    signUp(options: ISignUpOptions): Promise<XMLHttpRequest> {
        return new HTTPTransport().post(`${baseUrl}/auth/signup`, {
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(options),
        });
    }

    signIn(options: ISignInOptions): Promise<XMLHttpRequest> {
        return new HTTPTransport().post(`${baseUrl}/auth/signin`, {
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(options),
        });
    }

    logOut(): Promise<XMLHttpRequest> {
        return new HTTPTransport().post(`${baseUrl}/auth/logout`);
    }
}

type ISignUpOptions = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

type ISignInOptions = {
    login: string;
    password: string;
};
