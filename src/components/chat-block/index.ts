/* eslint-disable camelcase */
import Block, { Events } from '../../utils/block';
import { compile } from 'pug';
import template from './chat-block.tmpl';
import './index.scss';
import Input from '../input';
import { ChatAPI } from '../../api/chat-api';
import { ChatsRender, getChats } from '../../utils/get-chats';
import Message from '../message';
import { checkUserId } from '../../utils/check-user-id';

export default class ChatBlock extends Block {
    constructor(props: ChatItemProps) {
        super('div', {
            ...props,
            children: {
                input: new Input({
                    type: 'text',
                    placeholder: 'Введите сообщение',
                    classNames: 'flex label send-message-label',
                    inputClassNames: 'send-message-input',
                    name: 'message',
                }),
            },
            socket: null,
        });
    }

    render(): HTMLElement {
        const { messages, socket } = this.props;

        const component = compile(template)(this.props);
        const layout = document.createElement('div');
        layout.innerHTML = component;
        if (this.props.children) {
            layout.querySelector('.footer')?.appendChild(this.props.children.input.getContent());
        }

        layout.querySelector('.delete-chat')?.addEventListener('click', () => {
            const data = {
                chatId: this.props.chatId as number,
            };
            if (data) {
                new ChatAPI().deleteChat(data).then((response) => {
                    if (response.status === 200) {
                        const noSelectedblock = document.querySelector('.no-selected-chat-block');
                        const selectedBlock = document.querySelector('.selected-chat-block');
                        const addUserBlock = document.querySelector('.add-user-container');
                        const removeUserBlock = document.querySelector('.remove-user-container');
                        if (noSelectedblock && selectedBlock && addUserBlock && removeUserBlock) {
                            this.showElement(noSelectedblock);
                            this.hideElement(selectedBlock);
                            this.hideElement(addUserBlock);
                            this.hideElement(removeUserBlock);
                        }

                        getChats(ChatsRender.AFTER_REMOVE, this);
                    }
                });
            }
        });

        const messageInput: HTMLInputElement | null = layout.querySelector('input[name="message"]');
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const chatBlock = layout.querySelector('.chat');
        if (userId && token && messageInput) {
            layout.querySelector('.send-icon')?.addEventListener('click', () => {
                socket?.send({ content: messageInput?.value || 'message', type: 'message' });
                this.props.children?.input.setProps({ value: '' });
            });
        }

        if (Array.isArray(messages) && chatBlock && userId) {
            messages.forEach((item): void => {
                chatBlock.appendChild(
                    new Message({
                        text: item.content,
                        classNames: `message${!checkUserId(item.user_id, userId) ? ' color' : ''}`,
                    }).getContent(),
                );
            });
        } else if (messages && chatBlock && userId) {
            chatBlock?.appendChild(new Message({ text: messageInput?.value, classNames: 'message' }).getContent());
        }

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
    chatId?: number;
    messages?: MessageProps[];
};

type MessageProps = {
    chat_id?: number;
    content?: string;
    file?: null;
    id?: number;
    is_read?: boolean;
    time?: string;
    type?: string;
    user_id?: number;
};
