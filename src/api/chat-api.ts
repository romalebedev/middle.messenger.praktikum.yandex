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

    getChatUsers(id: number): Promise<XMLHttpRequest> {
        return new HTTPTransport().get(`${baseUrl}/chats/${id}/users`);
    }

    deleteChat(options: IDeleteChatOptions): Promise<XMLHttpRequest> {
        return new HTTPTransport().delete(`${baseUrl}/chats`, {
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(options),
        });
    }

    addUser(options: IAddUserOptions): Promise<XMLHttpRequest> {
        return new HTTPTransport().put(`${baseUrl}/chats/users`, {
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(options),
        });
    }

    removeUser(options: IAddUserOptions): Promise<XMLHttpRequest> {
        return new HTTPTransport().delete(`${baseUrl}/chats/users`, {
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify(options),
        });
    }

    getToken(id: number | string): Promise<XMLHttpRequest> {
        return new HTTPTransport().post(`${baseUrl}/chats/token/${id}`);
    }
}

type ICreateChatOptions = {
    title: string;
};

type IDeleteChatOptions = {
    chatId: number;
};

type IAddUserOptions = {
    users: number[];
    chatId: number;
};
