const emailRegexp = /^[0-9a-z\-\.]+\@[0-9a-z\-]{2,}\.[a-z]{2,}$/i;
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const loginRegexp = /^[a-z_0-9]+$/i;
const telRegexp = /^(\+7|8)[0-9]{10}$/i;
const nameRegexp = /^[a-zа-яё]{2,}$/i;

enum InputTypes {
    email = 'email',
    password = 'password',
    passwordRepeat = 'passwordRepeat',
    name = 'name',
    secondName = 'secondName',
    tel = 'tel',
    login = 'login',
	chatName = 'chatName',
	newPassword = "newPassword",
	oldPassword = "oldPassword"
}

export const validate = (input: HTMLInputElement | null) => {
	if (!input) {
		return false;
	}
	const {name} = input;
	const {value} = input;
	switch (name) {
		case InputTypes.email:
			return emailRegexp.test(value);
		case InputTypes.password:
		case InputTypes.passwordRepeat:
		case InputTypes.oldPassword:
		case InputTypes.newPassword:
			return passwordRegexp.test(value);
		case InputTypes.name:
		case InputTypes.secondName:
			return nameRegexp.test(value);
		case InputTypes.tel:
			return telRegexp.test(value);
		case InputTypes.login:
		case InputTypes.chatName:
			return loginRegexp.test(value);
	}
};

export const checkForPasswordMatch = (pass: HTMLInputElement | null, passRepeat: HTMLInputElement | null) => {
	if (pass?.value !== '' && passRepeat?.value !== '') {
		return pass?.value === passRepeat?.value;
	}
	return false
}
