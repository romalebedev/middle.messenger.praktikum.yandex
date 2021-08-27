import '../../index.scss';
import './index.scss';
import '../../components/button';
import './change-password/index.scss';
import { compile } from 'pug';
import Block from '../../utils/block';
import template from './profile.tmpl';
import { router } from '../..';
import { AuthAPI } from '../../api/auth-api';

export class ProfilePage extends Block {
    constructor() {
        super('div', { classNames: 'container' });
    }

    render(): HTMLElement {
        const component = compile(template, {})();
        const layout = document.createElement('div');
        layout.innerHTML = component;

        setTimeout(() => {
            const links = document.querySelectorAll('a');
            links[0]?.addEventListener('click', () => {
                router.go('/settings');
            });
            links[1]?.addEventListener('click', () => {
                router.go('/change-password');
            });
            links[2]?.addEventListener('click', () => {
                new AuthAPI()
                    .logOut()
                    .then((response) => {
                        if (response.status === 200) {
                            localStorage.setItem('isAuth', 'false');
                            router.go('/');
                        }
                    })
                    .catch((error) => {
                        console.log(new Error(error));
                    });
            });
            links[3]?.addEventListener('click', () => {
                router.go('/messenger');
            });

            const fields = document.querySelectorAll('.input');
            fields[0].textContent = localStorage.getItem('email');
            fields[1].textContent = localStorage.getItem('login');
            fields[2].textContent = localStorage.getItem('first_name');
            fields[3].textContent = localStorage.getItem('second_name');
            fields[4].textContent =
                localStorage.getItem('display_name') !== 'null' ? localStorage.getItem('display_name') : '';
            fields[5].textContent = localStorage.getItem('phone');

            const name = document.querySelector('.name');
            if (name) {
                name.textContent = localStorage.getItem('first_name');
            }

            const avatarImg = document.querySelector('.avatar');
            const avatarItem = localStorage.getItem('avatar');
            if (avatarItem) {
                avatarImg?.setAttribute('src', `${avatarItem ? avatarItem : 'https://via.placeholder.com/150'}`);
            }
        }, 0);

        return layout;
    }
}
