// const textRegexp = /^[a-z_0-9]+$/i;
const emailRegexp = /^[0-9a-z\-\.]+\@[0-9a-z\-]{2,}\.[a-z]{2,}$/i;
// const phoneRegexp = /^(\+7|8)[0-9]{10}$/i;
// const nameRegexp = /^[a-zа-яё]{2,}$/i;
const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z0-9!@#$%^&*]{6,}$/i;

enum InputTypes {
    email = 'email',
    password = 'password'
}

export const validate = (input: HTMLInputElement | null) => {
    if (!input) {
        return false
    }
    const name = input.name
    const value = input.value
    switch (name) {
        case InputTypes.email:
            return emailRegexp.test(value)
        case InputTypes.password:
            return passwordRegexp.test(value)
    }
}
