import '../../index.scss';
import './index.scss';
import '../../components/button';
import './change-password/index.scss';
import { compile } from 'pug';
import Block from '../../utils/block';
import template from './profile.tmpl';
import { router } from '../..';

export class ProfilePage extends Block {
    constructor() {
        super('div', { classNames: 'container' });
    }

    render(): HTMLElement {
        const component = compile(template, {})();
        const layout = document.createElement('div');
        layout.innerHTML = component;

        setTimeout(() => {
            const link = document.querySelectorAll('a');
            link[0]?.addEventListener('click', () => {
                router.go('/settings');
            });
            link[1]?.addEventListener('click', () => {
                router.go('/change-password');
            });
        }, 0);

        return layout;
    }
}
