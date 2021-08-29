/* eslint-disable camelcase */
import { ChatAPI } from '../api/chat-api';
import ChatItem from '../components/chat-item';
import Block from './block';

export const getChats = (status: string, block: Block, id?: number): void => {
    new ChatAPI().getChats().then((response) => {
        const data = JSON.parse(response?.response);
        if (status === ChatsRender.ALL) {
            data.forEach((chat: IChats) => {
                const item = new ChatItem({
                    avatar: chat.avatar ? chat.avatar : 'https://via.placeholder.com/150',
                    name: chat.title,
                    message: `${chat.last_message ? chat.last_message.content : 'Сообщений нет'}`,
                    classNames: 'list-flex',
                    chatId: chat.id,
                    block,
                });
                document.querySelector('.chats-list')?.appendChild(item.getContent());
            });
        }

        if (status === ChatsRender.LAST_CHAT) {
            const lastChat = data.filter((el: IChats) => el.id === id);
            const item = new ChatItem({
                avatar: lastChat[0].avatar ? lastChat[0].avatar : 'https://via.placeholder.com/150',
                name: lastChat[0].title,
                message: `${lastChat[0].last_message ? lastChat[0].last_message : 'Сообщений нет'}`,
                classNames: 'list-flex',
                chatId: lastChat[0].id,
                block,
            });
            document.querySelector('.chats-list')?.prepend(item.getContent());
        }

        if (status === ChatsRender.AFTER_REMOVE) {
            const chatList = document.querySelector('.chats-list');
            while (chatList?.firstChild) {
                chatList.firstChild.remove();
            }

            getChats(ChatsRender.ALL, block);
        }
    });
};

export enum ChatsRender {
    ALL = 'allChats',
    LAST_CHAT = 'lastChat',
    AFTER_REMOVE = 'afterRemove',
}

export type IChats = {
    avatar: string | null;
    created_by: number;
    id: number;
    last_message: unknown | null;
    title: string;
    unread_count: number;
};
