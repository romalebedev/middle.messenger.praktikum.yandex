import Block, { Events } from '../../utils/block';
import { compile } from 'pug';
import template from './chat-item.tmpl';
import './index.scss';
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
            events: {
                ...props.events,
                click: () => {
                    const noSelectedblock = document.querySelector('.no-selected-chat-block');
                    const selectedBlock = document.querySelector('.selected-chat-block');
                    if (noSelectedblock && selectedBlock) {
                        this.hideElement(noSelectedblock);
                        this.showElement(selectedBlock);
                    }

                    props.block?.setProps({
                        avatar: props.avatar ? props.avatar : 'https://via.placeholder.com/150',
                        name: props.name,
                        message: `${props.message ? props.message : 'Сообщений нет'}`,
                    });
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
};
