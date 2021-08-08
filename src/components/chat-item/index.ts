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
            events: {
                ...props.events,
                click: () => {
                    const noSelectedblock = document.querySelector('.no-selected-chat-block');
                    const selectedBlock = document.querySelector('.selected-chat-block');
                    if (noSelectedblock && selectedBlock) {
                        this.hide(noSelectedblock);
                        this.show(selectedBlock);
                    }
                },
            },
        });
    }

    render() {
        const { avatar, name, message, time, classNames, status } = this.props;
        const component = compile(template);
        return component({ avatar, name, message, time, classNames, status });
    }
}

type ChatItemProps = {
    avatar?: string;
    name?: string;
    message?: string;
    time?: string;
    classNames?: string;
    events?: Events;
    status?: string;
};
