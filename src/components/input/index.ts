import Block, { Events } from '../../utils/block';
import { compile } from 'pug';
import template from './input.tmpl';
import './index.scss';
import { validate } from '../../utils/validate';

export default class Input extends Block {
    constructor(props: InputProps) {
        super('label', {
            value: props.value,
            type: props.type,
            placeholder: props.placeholder,
            name: props.name,
            status: props.status,
            classNames: props.classNames,
            events: {
                focusout: (e: Event) => {
                    const element = e.target as HTMLInputElement;
                    this.props.value = element.value;
                    const isValid = validate(element);
                    this.setProps({ status: isValid ? '' : 'error' });
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

type InputProps = {
    value?: string;
    type?: string;
    placeholder?: string;
    classNames?: string;
    name?: string;
    events?: Events;
    status?: string;
};
