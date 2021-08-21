import Block, { Events } from '../../utils/block';
import { compile } from 'pug';
import template from './chat-block.tmpl';
import './index.scss';

export default class ChatBlock extends Block {
    constructor(props: ChatItemProps) {
        super('div', props);
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
};
