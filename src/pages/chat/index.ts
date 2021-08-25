import '../../index.scss';
import './index.scss';
import '../../index';
import { compile } from 'pug';
import Block from '../../utils/block';
import template from './chat.tmpl';
import Input from '../../components/input';
import { router } from '../../index';
import Button from '../../components/button';
import { ChatAPI } from '../../api/chat-api';
import { validate } from '../../utils/validate';
import { setStatus } from '../../utils/set-status';
import { ChatsRender, getChats } from '../../utils/get-chats';
import ChatBlock from '../../components/chat-block';

export class ChatPage extends Block {
    constructor() {
        super('div', {
            classNames: 'chat-container',
            socket: null,
            children: {
                inputChatName: new Input({
                    type: 'text',
                    placeholder: 'Название чата',
                    classNames: 'flex label create-chat',
                    inputClassNames: 'input-create-chat',
                    name: 'login',
                }),
                inputMessage: new Input({
                    type: 'text',
                    placeholder: 'Сообщение',
                    classNames: 'flex label',
                    name: 'message',
                }),
                inputUserID: new Input({
                    type: 'text',
                    placeholder: 'ID пользователя',
                    classNames: 'flex label create-chat add-user',
                    inputClassNames: 'input-create-chat',
                    name: 'number',
                }),
                inputUserIDForRemove: new Input({
                    type: 'text',
                    placeholder: 'ID пользователя',
                    classNames: 'flex label create-chat remove-user',
                    inputClassNames: 'input-create-chat',
                    name: 'numberForRemove',
                }),
                createButton: new Button({
                    text: 'Создать новый чат',
                    classNames: 'create-chat-button',
                    events: {
                        click: () => {
                            const createInput: HTMLInputElement | null = document.querySelector('input[name="login"]');
                            const data = {
                                title: createInput?.value as string,
                            };
                            const isValidinputChatName = validate(createInput);

                            this.props.children?.inputChatName.setProps(setStatus(isValidinputChatName));

                            if (isValidinputChatName) {
                                new ChatAPI()
                                    .createChat(data)
                                    .then((response) => {
                                        if (response.status === 200) {
                                            const chatData = JSON.parse(response?.response);
                                            if (this.props.children?.chatBlock) {
                                                getChats(
                                                    ChatsRender.LAST_CHAT,
                                                    this.props.children?.chatBlock,
                                                    chatData.id,
                                                );
                                            }
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(new Error(error));
                                    });
                            }
                        },
                    },
                }),
                addUserButton: new Button({
                    text: 'Добавить пользователя',
                    classNames: 'create-chat-button',
                    events: {
                        click: () => {
                            const addUserInput: HTMLInputElement | null =
                                document.querySelector('input[name="number"]');

                            const isValid = validate(addUserInput);

                            this.props.children?.inputUserID.setProps(setStatus(isValid));

                            if (isValid) {
                                const chatId = localStorage.getItem('currentChatId');
                                const data = {
                                    users: [Number(addUserInput?.value)],
                                    chatId: Number(chatId),
                                };
                                new ChatAPI().addUser(data).then();
                            }
                        },
                    },
                }),
                removeUserButton: new Button({
                    text: 'Удалить из чата',
                    classNames: 'create-chat-button',
                    events: {
                        click: () => {
                            const removeUserInput: HTMLInputElement | null = document.querySelector(
                                'input[name="numberForRemove"]',
                            );

                            const isValid = validate(removeUserInput);

                            this.props.children?.inputUserIDForRemove.setProps(setStatus(isValid));

                            if (isValid) {
                                const chatId = localStorage.getItem('currentChatId');
                                const data = {
                                    users: [Number(removeUserInput?.value)],
                                    chatId: Number(chatId),
                                };
                                new ChatAPI().removeUser(data).then();
                            }
                        },
                    },
                }),
                chatBlock: new ChatBlock({
                    classNames: 'selected-chat-block',
                }),
            },
        });
    }

    render(): HTMLElement {
        localStorage.removeItem('messages');
        const { children } = this.props;
        const component = compile(template, {})();
        const layout = document.createElement('div');

        layout.innerHTML = component;
        if (children) {
            layout.querySelector('.chats-container')?.appendChild(children.chatBlock.getContent());
            layout.querySelector('.create-chat-container')?.appendChild(children.inputChatName.getContent());
            layout.querySelector('.add-user-container')?.appendChild(children.inputUserID.getContent());
            layout.querySelector('.remove-user-container')?.appendChild(children.inputUserIDForRemove.getContent());
            layout.querySelector('.create-chat-container')?.appendChild(children.createButton.getContent());
            layout.querySelector('.add-user-container')?.appendChild(children.addUserButton.getContent());
            layout.querySelector('.remove-user-container')?.appendChild(children.removeUserButton.getContent());
        }

        setTimeout(() => {
            const link = document.querySelector('a');
            link?.addEventListener('click', () => {
                router.go('/profile');
            });
        }, 0);

        if (children?.chatBlock) {
            getChats(ChatsRender.ALL, children?.chatBlock);
        }

        return layout;
    }
}
