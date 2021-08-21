/* eslint-disable camelcase */
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
import { ProfileAPI } from '../../../api/profile-api';

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
                        const profileData = {
                            first_name: name?.value as string,
                            second_name: secondName?.value as string,
                            login: login?.value as string,
                            display_name: chatName?.value as string,
                            email: email?.value as string,
                            phone: tel?.value as string,
                        };
                        new ProfileAPI().setProfile(profileData).then((data) => {
                            if (data.status === 200) {
                                const newProfileData = JSON.parse(data.response);
                                localStorage.setItem('first_name', newProfileData.first_name);
                                localStorage.setItem('second_name', newProfileData.second_name);
                                localStorage.setItem('email', newProfileData.email);
                                localStorage.setItem('login', newProfileData.login);
                                localStorage.setItem('phone', newProfileData.phone);
                                localStorage.setItem('display_name', newProfileData.display_name);
                                localStorage.setItem('avatar', newProfileData.avatar);
                                localStorage.setItem('id', newProfileData.id);
                            }
                        });
                    }
                },
            },
            children: {
                inputEmail: new Input({
                    type: 'email',
                    placeholder: '',
                    classNames: 'flex label',
                    name: 'email',
                    value: localStorage.getItem('email') || '',
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                inputLogin: new Input({
                    type: 'text',
                    placeholder: '',
                    classNames: 'flex label',
                    name: 'login',
                    value: localStorage.getItem('login') || '',
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                inputName: new Input({
                    type: 'text',
                    placeholder: '',
                    classNames: 'flex label',
                    name: 'name',
                    value: localStorage.getItem('first_name') || '',
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                inputSecondName: new Input({
                    type: 'text',
                    placeholder: '',
                    classNames: 'flex label',
                    name: 'secondName',
                    value: localStorage.getItem('second_name') || '',
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                inputChatName: new Input({
                    type: 'text',
                    placeholder: '',
                    classNames: 'flex label',
                    name: 'chatName',
                    value:
                        (localStorage.getItem('display_name') === 'null' ? '' : localStorage.getItem('display_name')) ||
                        '',
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                inputTel: new Input({
                    type: 'tel',
                    placeholder: '',
                    classNames: 'flex label',
                    name: 'tel',
                    value: localStorage.getItem('phone') || '',
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

            const avatarImg = document.querySelector('.avatar');
            const avatarItem = localStorage.getItem('avatar');
            avatarImg?.setAttribute('src', `${avatarItem ? avatarItem : 'https://via.placeholder.com/150'}`);

            const avatarInput = document.querySelector('input[name="avatar"]');
            avatarInput?.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                const form = new FormData();

                if (target.files) {
                    form.append('avatar', target.files[0]);
                }

                new ProfileAPI().setAvatar(form).then((data) => {
                    if (data.status === 200) {
                        const profileData = JSON.parse(data.response);
                        localStorage.setItem(
                            'avatar',
                            `https://ya-praktikum.tech/api/v2/resources${profileData.avatar}`,
                        );
                        avatarImg?.setAttribute(
                            'src',
                            `https://ya-praktikum.tech/api/v2/resources${profileData.avatar}`,
                        );
                    }
                });
            });
        }, 0);

        return layout;
    }
}
