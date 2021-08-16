import Block, { Events } from '../../utils/block';
import { compile } from 'pug';
import template from './button.tmpl';
import './index.scss';

export default class Button extends Block {
    constructor(props: ButtonProps) {
        super('button', props);
    }

    render(): HTMLElement {
        const { text } = this.props;
        const component = compile(template)({ text });
        const layout = document.createElement('button');
        layout.innerHTML = component;
        return layout as HTMLElement;
    }
}

type ButtonProps = {
    text?: string;
    events?: Events;
};
