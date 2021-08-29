/* eslint-disable camelcase */
import { baseUrl } from '../constants';
import HTTPTransport from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

export class ProfileAPI extends BaseAPI {
    getUserInfo(): Promise<XMLHttpRequest> {
        return new HTTPTransport().get(`${baseUrl}/auth/user`, {
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    setPassword(options: ISetPasswordOptions): Promise<XMLHttpRequest> {
        return new HTTPTransport().put(`${baseUrl}/user/password`, {
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(options),
        });
    }

    setProfile(options: ISetProfileOptions): Promise<XMLHttpRequest> {
        return new HTTPTransport().put(`${baseUrl}/user/profile`, {
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(options),
        });
    }

    setAvatar(form: FormData): Promise<XMLHttpRequest> {
        return new HTTPTransport().put(`${baseUrl}/user/profile/avatar`, {
            data: form,
        });
    }
}

type ISetPasswordOptions = {
    oldPassword: string;
    newPassword: string;
};

type ISetProfileOptions = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};
