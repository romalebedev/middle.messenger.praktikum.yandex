/* eslint-disable camelcase */
import { ChatAPI } from '../api/chat-api';
import ChatItem from '../components/chat-item';
import Block from './block';

export const getChats = (block: Block, id?: number): void => {
    new ChatAPI().getChats().then((response) => {
        const data = JSON.parse(response?.response);
        if (data && !id && block) {
            data.forEach((chat: IChats) => {
                const item = new ChatItem({
                    avatar: chat.avatar ? chat.avatar : 'https://via.placeholder.com/150',
                    name: chat.title,
                    message: `${chat.last_message ? chat.last_message : 'Сообщений нет'}`,
                    time: '16:48',
                    classNames: 'list-flex',
                    status: chat.unread_count,
                    block,
                });
                document.querySelector('.chats-list')?.appendChild(item.getContent());
            });
        }

        if (data && id && block) {
            const lastChat = data.filter((el: IChats) => el.id === id);
            const item = new ChatItem({
                avatar: lastChat[0].avatar ? lastChat[0].avatar : 'https://via.placeholder.com/150',
                name: lastChat[0].title,
                message: `${lastChat[0].last_message ? lastChat[0].last_message : 'Сообщений нет'}`,
                time: '16:48',
                classNames: 'list-flex',
                status: lastChat[0].unread_count,
                block,
            });
            document.querySelector('.chats-list')?.prepend(item.getContent());
        }
    });
};

export type IChats = {
    avatar: string | null;
    created_by: number;
    id: number;
    last_message: unknown | null;
    title: string;
    unread_count: number;
};
