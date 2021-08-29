/* eslint-disable camelcase */
import '../../index.scss';
import './index.scss';
import { compile } from 'pug';
import Block from '../../utils/block';
import template from './registration.tmpl';
import Button from '../../components/button';
import { checkForPasswordMatch, validate } from '../../utils/validate';
import Input from '../../components/input';
import { setStatus } from '../../utils/set-status';
import { router } from '../..';
import { AuthAPI } from '../../api/auth-api';

export class RegistrationPage extends Block {
    constructor() {
        super('div', {
            classNames: 'container',
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const email: HTMLInputElement | null = document.querySelector('input[name="email"]');
                    const password: HTMLInputElement | null = document.querySelector('input[name="password"]');
                    const login: HTMLInputElement | null = document.querySelector('input[name="login"]');
                    const name: HTMLInputElement | null = document.querySelector('input[name="name"]');
                    const secondName: HTMLInputElement | null = document.querySelector('input[name="secondName"]');
                    const tel: HTMLInputElement | null = document.querySelector('input[name="tel"]');
                    const passwordRepeat: HTMLInputElement | null =
                        document.querySelector('input[name="passwordRepeat"]');

                    const isValidEmail = validate(email);
                    const isValidPassword = validate(password);
                    const isValidLogin = validate(login);
                    const isValidName = validate(name);
                    const isValidSecondName = validate(secondName);
                    const isValidTel = validate(tel);
                    const isValidPasswordRepeat = validate(passwordRepeat);
                    const isPasswordsMatch = checkForPasswordMatch(password, passwordRepeat);

                    this.props.children?.inputEmail.setProps(setStatus(isValidEmail));
                    this.props.children?.inputPassword.setProps(setStatus(isValidPassword));
                    this.props.children?.inputPasswordRepeat.setProps(setStatus(isValidPasswordRepeat));
                    this.props.children?.inputLogin.setProps(setStatus(isValidLogin));
                    this.props.children?.inputName.setProps(setStatus(isValidName));
                    this.props.children?.inputSecondName.setProps(setStatus(isValidSecondName));
                    this.props.children?.inputTel.setProps(setStatus(isValidTel));
                    this.props.children?.inputPasswordRepeat.setProps(setStatus(isPasswordsMatch));

                    const isAllFieldsValid =
                        isValidEmail &&
                        isValidPassword &&
                        isValidLogin &&
                        isValidName &&
                        isValidSecondName &&
                        isValidTel &&
                        isValidPasswordRepeat &&
                        isPasswordsMatch;

                    if (isAllFieldsValid) {
                        const data = {
                            first_name: name?.value as string,
                            second_name: secondName?.value as string,
                            login: login?.value as string,
                            email: email?.value as string,
                            password: password?.value as string,
                            phone: tel?.value as string,
                        };

                        new AuthAPI()
                            .signUp(data)
                            .then((response) => {
                                if (response.status === 200) {
                                    localStorage.setItem('isAuth', 'true');
                                    router.go('/messenger');
                                }
                            })
                            .catch((error) => {
                                console.log(new Error(error));
                            });
                    }
                },
            },
            children: {
                inputEmail: new Input({
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
                }),
                inputLogin: new Input({
                    type: 'text',
                    placeholder: 'Логин',
                    classNames: 'flex label',
                    name: 'login',
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
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                inputPassword: new Input({
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
                }),
                inputPasswordRepeat: new Input({
                    type: 'password',
                    placeholder: 'Пароль еще раз',
                    classNames: 'flex label',
                    name: 'passwordRepeat',
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                button: new Button({
                    text: 'Зарегистрироваться',
                }),
            },
        });
    }

    render(): HTMLElement {
        const { children } = this.props;
        const component = compile(template, {})();
        const layout = document.createElement('div');
        layout.innerHTML = component;
        if (children) {
            Object.keys(children).forEach((key) => {
                layout.querySelector('.form')?.appendChild(children[key].getContent());
            });
        }

        setTimeout(() => {
            const link = document.querySelector('a');
            link?.addEventListener('click', () => {
                router.go('/');
            });
        }, 0);

        return layout;
    }
}
