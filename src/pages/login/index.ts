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
import { AuthAPI } from '../../api/auth-api';
import { ProfileAPI } from '../../api/profile-api';

export class LoginPage extends Block {
    constructor() {
        super('div', {
            classNames: 'container',
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const login: HTMLInputElement | null = document.querySelector('input[name="login"]');
                    const password: HTMLInputElement | null = document.querySelector('input[name="password"]');

                    const isValidLogin = validate(login);
                    const isValidPassword = validate(password);
                    console.log(this.props.children?.inputLogin);
                    this.props.children?.inputLogin.setProps(setStatus(isValidLogin));
                    this.props.children?.inputPassword.setProps(setStatus(isValidPassword));
                    if (isValidLogin && isValidPassword) {
                        const data = {
                            login: login?.value as string,
                            password: password?.value as string,
                        };
                        new AuthAPI()
                            .signIn(data)
                            .then(() => {
                                new ProfileAPI().getUserInfo().then((data) => {
                                    if (data.status === 200) {
                                        const profileData = JSON.parse(data.response);
                                        localStorage.setItem('first_name', profileData.first_name);
                                        localStorage.setItem('second_name', profileData.second_name);
                                        localStorage.setItem('email', profileData.email);
                                        localStorage.setItem('login', profileData.login);
                                        localStorage.setItem('phone', profileData.phone);
                                        localStorage.setItem('display_name', profileData.display_name);
                                        localStorage.setItem(
                                            'avatar',
                                            profileData.avatar
                                                ? `https://ya-praktikum.tech/api/v2/resources${profileData.avatar}`
                                                : 'https://via.placeholder.com/150',
                                        );
                                        localStorage.setItem('id', profileData.id);
                                        localStorage.setItem('isAuth', 'true');

                                        router.go('/messenger');
                                    }
                                });
                            })
                            .catch((error) => {
                                console.log(new Error(error));
                            });
                    }
                },
            },
            children: {
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
