import '../../../index.scss';
import './index.scss';
import {compile} from 'pug';
import Block, {Props} from '../../../utils/block';
import {renderDom} from '../../../utils/render-DOM';
import template from './change-password.tmpl';
import Button from '../../../components/button';
import Input from "../../../components/input";
import {checkForPasswordMatch, validate} from "../../../utils/validate";

class Page extends Block {
	constructor(props: Props) {
		super('div', props);
	}

	render() {
		return (compile(template, {})(this.props));
	}
}

const page: Page = new Page({
	classNames: 'container',
	events: {
		submit: (e: Event) => {
			e.preventDefault();
			const oldPassword:HTMLInputElement | null = document.querySelector('input[name="password"]');
			const newPassword:HTMLInputElement | null = document.querySelector('input[name="newPassword"]');
			const passwordRepeat:HTMLInputElement | null = document.querySelector('input[name="passwordRepeat"]');

			const isValidOldPassword = validate(oldPassword);
			const isValidNewPassword = validate(newPassword);
			const isValidPasswordRepeat = validate(passwordRepeat);
			const isPasswordsMatch = checkForPasswordMatch(newPassword, passwordRepeat);

			if (!isValidOldPassword) {
				inputOldPassword.setProps({status: 'error'});
			} else {
				inputOldPassword.setProps({status: ''});
			}

			if (!isValidNewPassword) {
				inputNewPassword.setProps({status: 'error'});
			} else {
				inputNewPassword.setProps({status: ''});
			}

			if (!isValidPasswordRepeat) {
				console.log('is NOT valid')
				inputPasswordRepeat.setProps({status: 'error'});
			} else {
				console.log('is valid')
				inputPasswordRepeat.setProps({status: ''});
			}

			if (!isPasswordsMatch) {
				inputPasswordRepeat.setProps({status: 'error'});
			} else {
				inputPasswordRepeat.setProps({status: ''});
			}

			const isAllFieldsValid = isValidOldPassword && isValidNewPassword && isValidPasswordRepeat && isPasswordsMatch;

			if (isAllFieldsValid) {
				console.log("Пароль успешно изменен!");
			}
		},
	},
});

const button = new Button({
	text: 'Сохранить',
});

const inputOldPassword = new Input({
	type: 'password',
	classNames: 'flex label',
	name: 'password',
	events: {
		input: (e: Event): string => {
			const item = e.target as HTMLInputElement;
			return item.value;
		},
	},
});

const inputNewPassword = new Input({
	type: 'password',
	classNames: 'flex label',
	name: 'newPassword',
	events: {
		input: (e: Event): string => {
			const item = e.target as HTMLInputElement;
			return item.value;
		},
	},
});

const inputPasswordRepeat = new Input({
	type: 'password',
	classNames: 'flex label',
	name: 'passwordRepeat',
	events: {
		input: (e: Event): string => {
			const item = e.target as HTMLInputElement;
			return item.value;
		},
	},
});

renderDom('#root', page);
renderDom('.list-item', inputOldPassword);
renderDom('.list-item:nth-child(2)', inputNewPassword);
renderDom('.list-item:nth-child(3)', inputPasswordRepeat);
renderDom('.form', button);
