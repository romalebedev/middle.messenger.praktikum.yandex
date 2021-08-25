import Block, { Events } from '../../utils/block';
import { compile } from 'pug';
import template from './popup.tmpl';
import './index.scss';

export default class Popup extends Block {
    constructor(props: any) {
        super('div', props);
    }

    render(): HTMLElement {
        const component = compile(template)(this.props);
        const layout = document.createElement('div');
        layout.innerHTML = component;
        console.log(layout);
        return layout as HTMLElement;
    }
}

// Type ButtonProps = {
//     text?: string;
//     events?: Events;
//     classNames?: string;
// };
