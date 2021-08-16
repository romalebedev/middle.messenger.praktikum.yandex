import '../../index.scss';
import './index.scss';
import { compile } from 'pug';
import Block from '../../utils/block';
import template from './login.tmpl';
import Button from '../../components/button';
import Input from '../../components/input';
import { validate } from '../../utils/validate';
import { setStatus } from '../../utils/set-status';
import { router } from '../../index';

export class LoginPage extends Block {
    constructor() {
        super('div', {
            classNames: 'container',
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const email: HTMLInputElement | null = document.querySelector('input[name="email"]');
                    const password: HTMLInputElement | null = document.querySelector('input[name="password"]');

                    const isValidEmail = validate(email);
                    const isValidPassword = validate(password);

                    this.props.children?.inputEmail.setProps(setStatus(isValidEmail));
                    this.props.children?.inputPassword.setProps(setStatus(isValidPassword));
                    if (isValidEmail && isValidPassword) {
                        router.go('/messenger');
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
                        input: (e: Event): void => {
                            console.log('event input');
                            setTimeout(() => {
                                const item = e.target as HTMLInputElement;
                                return item.value;
                            }, 0);
                        },
                        focusout: (e: Event) => {
                            console.log('event focsuot');
                            const element = e.target as HTMLInputElement;
                            this.props.value = element.value;
                            const isValid = validate(element);
                            this.setProps({ status: isValid ? '' : 'error' });
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
                button: new Button({
                    text: 'Авторизоваться',
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
                router.go('/sign-up');
            });
        }, 0);

        return layout;
    }
}
