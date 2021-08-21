/* eslint-disable camelcase */
import { baseUrl } from '../constants';
import HTTPTransport from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

export class ChatAPI extends BaseAPI {
    createChat(options: ICreateChatOptions): Promise<XMLHttpRequest> {
        return new HTTPTransport().post(`${baseUrl}/chats`, {
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(options),
        });
    }

    getChats(): Promise<XMLHttpRequest> {
        return new HTTPTransport().get(`${baseUrl}/chats`);
    }

    // signIn(options: ISignInOptions): Promise<XMLHttpRequest> {
    //     return new HTTPTransport().post(`${baseUrl}/auth/signin`, {
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         data: JSON.stringify(options),
    //     });
    // }

    // logOut(): Promise<XMLHttpRequest> {
    //     return new HTTPTransport().post(`${baseUrl}/auth/logout`);
    // }
}

type ICreateChatOptions = {
    title: string;
};

type ISignInOptions = {
    login: string;
    password: string;
};
