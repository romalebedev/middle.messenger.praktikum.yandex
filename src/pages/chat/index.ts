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
import { getChats } from '../../utils/get-chats';

export class ChatPage extends Block {
    constructor() {
        super('div', {
            classNames: 'chat-container',
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
                                            getChats(chatData.id);
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(new Error(error));
                                    });
                            }
                        },
                    },
                }),
            },
        });
    }

    render(): HTMLElement {
        const { children } = this.props;
        const component = compile(template, {})();
        const layout = document.createElement('div');

        layout.innerHTML = component;
        if (children) {
            layout.querySelector('.footer')?.appendChild(children.inputMessage.getContent());
            layout.querySelector('.create-chat-container')?.appendChild(children.inputChatName.getContent());
            layout.querySelector('.create-chat-container')?.appendChild(children.createButton.getContent());
        }

        setTimeout(() => {
            const link = document.querySelector('a');
            link?.addEventListener('click', () => {
                router.go('/profile');
            });
        }, 0);

        getChats();

        return layout;
    }
}
