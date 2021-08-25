import Block, { Events } from '../../utils/block';
import { compile } from 'pug';
import template from './chat-item.tmpl';
import './index.scss';
import WebSocketService from '../../utils/web-socket';
import { ChatAPI } from '../../api/chat-api';
// Import { validate } from '../../utils/validate';

export default class ChatItem extends Block {
    constructor(props: ChatItemProps) {
        super('li', {
            avatar: props.avatar,
            name: props.name,
            message: props.message,
            time: props.time,
            classNames: props.classNames,
            status: props.status,
            block: props.block,
            chatId: props.chatId,
            events: {
                ...props.events,
                click: () => {
                    localStorage.removeItem('messages');

                    const noSelectedblock = document.querySelector('.no-selected-chat-block');
                    const selectedBlock = document.querySelector('.selected-chat-block');
                    const addUserBlock = document.querySelector('.add-user-container');
                    const removeUserBlock = document.querySelector('.remove-user-container');
                    if (noSelectedblock && selectedBlock) {
                        this.hideElement(noSelectedblock);
                        this.showElement(selectedBlock);
                        this.showElement(addUserBlock);
                        this.showElement(removeUserBlock);
                    }

                    localStorage.setItem('currentChatId', this.props.chatId as string);

                    props.block?.setProps({
                        avatar: props.avatar ? props.avatar : 'https://via.placeholder.com/150',
                        name: props.name,
                        message: `${props.message ? props.message : 'Сообщений нет'}`,
                        chatId: props.chatId,
                    });

                    const userId = localStorage.getItem('id');
                    const chatId = localStorage.getItem('currentChatId');

                    if (chatId && chatId !== 'undefined' && userId) {
                        new ChatAPI().getToken(chatId).then((response) => {
                            if (response.status === 200) {
                                const token = JSON.parse(response.response);
                                localStorage.setItem('token', token.token);

                                props.block?.setProps({
                                    socket: new WebSocketService(
                                        userId,
                                        Number(props.chatId),
                                        token.token,
                                        props.block,
                                    ),
                                });
                            }
                        });
                    }
                },
            },
        });
    }

    render(): HTMLElement {
        const component = compile(template)(this.props);
        const layout = document.createElement('div');
        layout.innerHTML = component;
        return layout as HTMLElement;
    }
}

type ChatItemProps = {
    avatar?: string;
    name?: string;
    message?: string;
    time?: string;
    classNames?: string;
    events?: Events;
    status?: number;
    block?: Block;
    chatId?: number;
};
