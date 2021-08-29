import '../../../index.scss';
import './index.scss';
import { compile } from 'pug';
import Block from '../../../utils/block';
import template from './change-password.tmpl';
import Button from '../../../components/button';
import Input from '../../../components/input';
import { checkForPasswordMatch, validate } from '../../../utils/validate';
import { setStatus } from '../../../utils/set-status';
import { router } from '../../..';
import { ProfileAPI } from '../../../api/profile-api';

export class ChagePasswordPage extends Block {
    constructor() {
        super('div', {
            classNames: 'container',
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const oldPassword: HTMLInputElement | null = document.querySelector('input[name="password"]');
                    const newPassword: HTMLInputElement | null = document.querySelector('input[name="newPassword"]');
                    const passwordRepeat: HTMLInputElement | null =
                        document.querySelector('input[name="passwordRepeat"]');

                    const isValidOldPassword = validate(oldPassword);
                    const isValidNewPassword = validate(newPassword);
                    const isValidPasswordRepeat = validate(passwordRepeat);
                    const isPasswordsMatch = checkForPasswordMatch(newPassword, passwordRepeat);

                    this.props.children?.inputNewPassword.setProps(setStatus(isValidNewPassword));
                    this.props.children?.inputOldPassword.setProps(setStatus(isValidOldPassword));
                    this.props.children?.inputPasswordRepeat.setProps(setStatus(isValidPasswordRepeat));
                    this.props.children?.inputPasswordRepeat.setProps(setStatus(isPasswordsMatch));

                    const isAllFieldsValid =
                        isValidOldPassword && isValidNewPassword && isValidPasswordRepeat && isPasswordsMatch;

                    if (isAllFieldsValid) {
                        const data = {
                            oldPassword: oldPassword?.value as string,
                            newPassword: newPassword?.value as string,
                        };
                        new ProfileAPI()
                            .setPassword(data)
                            .then(() => router.go('/profile'))
                            .catch((error) => {
                                console.log(new Error(error));
                            });
                    }
                },
            },
            children: {
                inputOldPassword: new Input({
                    type: 'password',
                    classNames: 'flex label',
                    name: 'password',
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                inputNewPassword: new Input({
                    type: 'password',
                    classNames: 'flex label',
                    name: 'newPassword',
                    events: {
                        input: (e: Event): string => {
                            const item = e.target as HTMLInputElement;
                            return item.value;
                        },
                    },
                }),
                inputPasswordRepeat: new Input({
                    type: 'password',
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
            if (avatarItem) {
                avatarImg?.setAttribute('src', `${avatarItem ? avatarItem : 'https://via.placeholder.com/150'}`);
            }

            const name = document.querySelector('.name');
            if (name) {
                name.textContent = localStorage.getItem('first_name');
            }
        }, 0);

        return layout;
    }
}
