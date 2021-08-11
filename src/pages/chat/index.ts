import '../../index.scss';
import './index.scss';
import { compile } from 'pug';
import Block, { Props } from '../../utils/block';
import template from './chat.tmpl';
import { renderDom } from '../../utils/render-DOM';
import Input from '../../components/input';
import ChatItem from '../../components/chat-item';

class Page extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return compile(template, {})(this.props);
    }
}

const page: Page = new Page({
    classNames: 'chat-container',
});

const inputSearch = new Input({
    type: 'text',
    placeholder: 'Search',
    classNames: 'flex label',
    name: 'search',
});

const inputMessage = new Input({
    type: 'text',
    placeholder: 'Сообщение',
    classNames: 'flex label',
    name: 'message',
});

const chatItem = new ChatItem({
    avatar: 'https://via.placeholder.com/150',
    name: 'Иван',
    message:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quam itaque, aperiam obcaecati dolore cumque expedita consequuntur saepe quia quisquam quo quod! Iste laboriosam impedit labore ratione distinctio magni qui?',
    time: '16:48',
    classNames: 'list-flex',
    status: 'unread',
});

const chatItem2 = new ChatItem({
    avatar: 'https://via.placeholder.com/150',
    name: 'Вован',
    message: 'Test',
    time: '17:00',
    classNames: 'list-flex',
    status: 'unread',
});

renderDom('#root', page);
renderDom('.chatlist-header', inputSearch);
renderDom('.footer', inputMessage);
renderDom('.chats-list', chatItem);
renderDom('.chats-list', chatItem2);
