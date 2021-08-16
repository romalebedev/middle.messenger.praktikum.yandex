import '../../index.scss';
import './index.scss';
import '../../index';
import { compile } from 'pug';
import Block from '../../utils/block';
import template from './chat.tmpl';
import Input from '../../components/input';
import ChatItem from '../../components/chat-item';
import { router } from '../../index';

export class ChatPage extends Block {
    constructor() {
        super('div', {
            classNames: 'chat-container',
            children: {
                inputSearch: new Input({
                    type: 'text',
                    placeholder: 'Search',
                    classNames: 'flex label',
                    name: 'search',
                }),
                inputMessage: new Input({
                    type: 'text',
                    placeholder: 'Сообщение',
                    classNames: 'flex label',
                    name: 'message',
                }),
                chatItem: new ChatItem({
                    avatar: 'https://via.placeholder.com/150',
                    name: 'Иван',
                    message:
                        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quam itaque, aperiam obcaecati dolore cumque expedita consequuntur saepe quia quisquam quo quod! Iste laboriosam impedit labore ratione distinctio magni qui?',
                    time: '16:48',
                    classNames: 'list-flex',
                    status: 'unread',
                }),
                chatItem2: new ChatItem({
                    avatar: 'https://via.placeholder.com/150',
                    name: 'Вован',
                    message: 'Test',
                    time: '17:00',
                    classNames: 'list-flex',
                    status: 'unread',
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
            layout.querySelector('.chatlist-header')?.appendChild(children.inputSearch.getContent());
            layout.querySelector('.chats-list')?.appendChild(children.chatItem.getContent());
            layout.querySelector('.chats-list')?.appendChild(children.chatItem.getContent());
            layout.querySelector('.footer')?.appendChild(children.inputMessage.getContent());
        }

        setTimeout(() => {
            const link = document.querySelector('a');
            link?.addEventListener('click', () => {
                router.go('/profile');
            });
        }, 0);

        return layout;
    }
}
