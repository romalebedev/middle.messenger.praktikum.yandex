import '../../index.scss';
import './index.scss';
import { compile } from 'pug';
import Block, { Props } from '../../utils/block';
import { renderDom } from '../../utils/render-DOM';
import template from './login.tmpl';
import Button from '../../components/button';
import Input from '../../components/input';
import { validate } from '../../utils/validate';
import { setStatus } from '../../utils/set-status';

class Page extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return compile(template, {})(this.props);
    }
}

const page: Page = new Page({
    classNames: 'container',
    events: {
        submit: (e: Event) => {
            e.preventDefault();
            const email: HTMLInputElement | null = document.querySelector('input[name="email"]');
            const password: HTMLInputElement | null = document.querySelector('input[name="password"]');

            const isValidEmail = validate(email);
            const isValidPassword = validate(password);

            inputEmail.setProps(setStatus(isValidEmail));
            inputPassword.setProps(setStatus(isValidPassword));
        },
    },
});

const button = new Button({
    text: 'Авторизоваться',
});

const inputEmail = new Input({
    type: 'email',
    placeholder: 'Email',
    classNames: 'flex label',
    name: 'email',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement;
            return item.value;
        },
    },
});

const inputPassword = new Input({
    type: 'password',
    placeholder: 'Пароль',
    classNames: 'flex label',
    name: 'password',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement;
            return item.value;
        },
    },
});

renderDom('#root', page);
renderDom('.form', inputEmail);
renderDom('.form', inputPassword);
renderDom('.form', button);
