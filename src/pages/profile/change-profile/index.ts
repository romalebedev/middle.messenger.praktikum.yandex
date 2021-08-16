import '../../../index.scss';
import './index.scss';
import { compile } from 'pug';
import Block from '../../../utils/block';
import template from './change-profile.tmpl';
import Button from '../../../components/button';
import Input from '../../../components/input';
import { validate } from '../../../utils/validate';
import { setStatus } from '../../../utils/set-status';
import { router } from '../../..';

export class SettingsPage extends Block {
    constructor() {
        super('div', {
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

                    this.props.children?.inputEmail.setProps(setStatus(isValidEmail));
                    this.props.children?.inputChatName.setProps(setStatus(isValidChatName));
                    this.props.children?.inputLogin.setProps(setStatus(isValidLogin));
                    this.props.children?.inputName.setProps(setStatus(isValidName));
                    this.props.children?.inputSecondName.setProps(setStatus(isValidSecondName));
                    this.props.children?.inputTel.setProps(setStatus(isValidTel));

                    const isAllFieldsValid =
                        isValidEmail &&
                        isValidChatName &&
                        isValidLogin &&
                        isValidName &&
                        isValidSecondName &&
                        isValidTel;

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
            children: {
                inputEmail: new Input({
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
                }),
                inputLogin: new Input({
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
                }),
                inputName: new Input({
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
                }),
                inputSecondName: new Input({
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
                }),
                inputChatName: new Input({
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
                }),
                inputTel: new Input({
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
                }),
                button: new Button({
                    text: 'Сохранить',
                }),
            },
        });
    }

    render(): HTMLElement {
        const { children } = this.props;
        const component = compile(template, {})();
        const layout = document.createElement('div');
        layout.innerHTML = component;
        const userBlockItem = layout.querySelectorAll('.user-block-item');
        if (children) {
            Object.keys(children).forEach((key, i) => {
                if (key !== 'button') {
                    userBlockItem[i]?.appendChild(children[key].getContent());
                }
            });
            layout.querySelector('.form')?.appendChild(children.button.getContent());
        }

        setTimeout(() => {
            const link = document.querySelector('a');
            link?.addEventListener('click', () => {
                router.go('/profile');
            });
        }, 0);

        return layout;
    }
}
