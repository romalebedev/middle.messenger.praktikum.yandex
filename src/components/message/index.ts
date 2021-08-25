import Block, { Events } from '../../utils/block';
import { compile } from 'pug';
import template from './message.tmpl';
import './index.scss';

export default class Message extends Block {
    constructor(props: ButtonProps) {
        super('div', props);
    }

    render(): HTMLElement {
        const component = compile(template)(this.props);
        const layout = document.createElement('div');
        layout.innerHTML = component;
        return layout as HTMLElement;
    }
}

type ButtonProps = {
    text?: string;
    events?: Events;
    classNames?: string;
    chatId?: number;
};
