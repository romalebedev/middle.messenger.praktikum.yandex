import '../../../index.scss';
import './index.scss';
import { compile } from 'pug';
import Block, { Props } from '../../../utils/block';
import { renderDom } from '../../../utils/render-DOM';
import template from './change-profile.tmpl';
import Button from '../../../components/button';
import Input from '../../../components/input';
import { validate } from '../../../utils/validate';
import { setStatus } from '../../../utils/set-status';

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
            const login: HTMLInputElement | null = document.querySelector('input[name="login"]');
            const name: HTMLInputElement | null = document.querySelector('input[name="name"]');
            const chatName: HTMLInputElement | null = document.querySelector('input[name="chatName"]');
            const secondName: HTMLInputElement | null = document.querySelector('input[name="secondName"]');
            const tel: HTMLInputElement | null = document.querySelector('input[name="tel"]');

            const isValidEmail = validate(email);
            const isValidLogin = validate(login);
            const isValidName = validate(name);
            const isValidSecondName = validate(secondName);
            const isValidTel = validate(tel);
            const isValidChatName = validate(chatName);
            
            inputEmail.setProps(setStatus(isValidEmail));
            inputChatName.setProps(setStatus(isValidChatName));
            inputLogin.setProps(setStatus(isValidLogin));
            inputName.setProps(setStatus(isValidName));
            inputSecondName.setProps(setStatus(isValidSecondName));
            inputTel.setProps(setStatus(isValidTel));

            const isAllFieldsValid =
                isValidEmail && isValidChatName && isValidLogin && isValidName && isValidSecondName && isValidTel;

            if (isAllFieldsValid) {
                console.log(
                    `
    Данные успешно сохранены:
    email: ${email?.value}
    login: ${login?.value}
    name: ${name?.value}
    secondName: ${secondName?.value}
    chatName: ${chatName?.value}
    tel: ${tel?.value}
    `,
                );
            }
        },
    },
});

const button = new Button({
    text: 'Сохранить',
});

// Li.user-block-item.list-item
// span Почта
// input(type="text" value="pochta@yandex.ru").input.change-input
// li.user-block-item.list-item
// span Логин
// input(type="text" value="Логин").input.change-input
// li.user-block-item.list-item
// span Имя
// input(type="text" value="Имя").input.change-input
// li.user-block-item.list-item
// span Фамилия
// input(type="text" value="Фамилия").input.change-input
// li.user-block-item.list-item
// span Имя в чате
// input(type="text" value="Имя в чате").input.change-input
// li.user-block-item.list-item
// span Телефон
// input(type="text" value="Телефон").input.change-input

const inputEmail = new Input({
    type: 'email',
    placeholder: 'Email',
    classNames: 'flex label',
    name: 'email',
    value: 'pochta@gmail.com',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement;
            return item.value;
        },
    },
});

const inputLogin = new Input({
    type: 'text',
    placeholder: 'Логин',
    classNames: 'flex label',
    name: 'login',
    value: 'ivan777',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement;
            return item.value;
        },
    },
});

const inputName = new Input({
    type: 'text',
    placeholder: 'Имя',
    classNames: 'flex label',
    name: 'name',
    value: 'Иван',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement;
            return item.value;
        },
    },
});

const inputSecondName = new Input({
    type: 'text',
    placeholder: 'Фамилия',
    classNames: 'flex label',
    name: 'secondName',
    value: 'Иванов',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement;
            return item.value;
        },
    },
});

const inputChatName = new Input({
    type: 'text',
    placeholder: 'Имя в чате',
    classNames: 'flex label',
    name: 'chatName',
    value: 'ivan777',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement;
            return item.value;
        },
    },
});

const inputTel = new Input({
    type: 'tel',
    placeholder: 'Номер телефона',
    classNames: 'flex label',
    name: 'tel',
    value: '89999999999',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement;
            return item.value;
        },
    },
});

renderDom('#root', page);
renderDom('.list-item', inputEmail);
renderDom('.list-item:nth-child(2)', inputLogin);
renderDom('.list-item:nth-child(3)', inputName);
renderDom('.list-item:nth-child(4)', inputSecondName);
renderDom('.list-item:nth-child(5)', inputChatName);
renderDom('.list-item:nth-child(6)', inputTel);
renderDom('.form', button);
