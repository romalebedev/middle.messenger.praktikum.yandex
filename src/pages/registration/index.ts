import '../../index.scss';
import './index.scss';
import {compile} from 'pug'
import Block, { Props } from '../../utils/block';
import { renderDom } from '../../utils/render-DOM';
import template from './registration.tmpl';
import Button from '../../components/button';
import {checkForPasswordMatch, validate} from "../../utils/validate";
import Input from "../../components/input";

class Page extends Block {
    constructor(props: Props) {
        super('div', props)
    }

    render() {
        return (compile(template, {})(this.props))
    }
}

const page: Page = new Page({
    classNames: 'container',
    events: {
        submit: (e: Event) => {
            e.preventDefault()
            const email:HTMLInputElement | null = document.querySelector('input[name="email"]')
            const password:HTMLInputElement | null = document.querySelector('input[name="password"]')
            const login:HTMLInputElement | null = document.querySelector('input[name="login"]')
            const name:HTMLInputElement | null = document.querySelector('input[name="name"]')
            const secondName:HTMLInputElement | null = document.querySelector('input[name="secondName"]')
            const tel:HTMLInputElement | null = document.querySelector('input[name="tel"]')
            const passwordRepeat:HTMLInputElement | null = document.querySelector('input[name="passwordRepeat"]')

            const isValidEmail = validate(email)
            const isValidPassword = validate(password)
            const isValidLogin = validate(login)
            const isValidName = validate(name)
            const isValidSecondName = validate(secondName)
            const isValidTel = validate(tel)
            const isValidPasswordRepeat = validate(passwordRepeat)
            const isPasswordsMatch = checkForPasswordMatch(password, passwordRepeat)

            if (!isValidEmail) {
                inputEmail.setProps({status: "error"})
            } else {
                inputEmail.setProps({status: ""})
            }

            if (!isValidPassword) {
                inputPassword.setProps({status: "error"})
            } else {
                inputPassword.setProps({status: ""})
            }

            if (!isValidPasswordRepeat) {
                inputPasswordRepeat.setProps({status: "error"})
            } else {
                inputPasswordRepeat.setProps({status: ""})
            }

            if (!isValidLogin) {
                inputLogin.setProps({status: "error"})
            } else {
                inputLogin.setProps({status: ""})
            }

            if (!isValidName) {
                inputName.setProps({status: "error"})
            } else {
                inputName.setProps({status: ""})
            }

            if (!isValidSecondName) {
                inputSecondName.setProps({status: "error"})
            } else {
                inputSecondName.setProps({status: ""})
            }

            if (!isValidTel) {
                inputTel.setProps({status: "error"})
            } else {
                inputTel.setProps({status: ""})
            }

            if (!isPasswordsMatch) {
                inputPasswordRepeat.setProps({status: "error"})
            } else {
                inputPasswordRepeat.setProps({status: ""})
            }

            const isAllFieldsValid = isValidEmail && isValidPassword && isValidLogin && isValidName && isValidSecondName && isValidTel && isValidPasswordRepeat && isPasswordsMatch

            if (isAllFieldsValid) {
                console.log(
    `
    Польхователь успешно создан:
    email: ${email?.value}
    login: ${login?.value}
    name: ${name?.value}
    secondName: ${secondName?.value}
    tel: ${tel?.value}
    password: ${password?.value}
    `
                )
            }
        }
    }

})

const button = new Button({
    text: 'Зарегистрироваться'
})

const inputEmail = new Input({
    type: 'email',
    placeholder: 'Email',
    classNames: 'flex label',
    name: 'email',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement
            return item.value
        }
    }
})

const inputLogin = new Input({
    type: 'text',
    placeholder: 'Логин',
    classNames: 'flex label',
    name: 'login',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement
            return item.value
        }
    }
})

const inputName = new Input({
    type: 'text',
    placeholder: 'Имя',
    classNames: 'flex label',
    name: 'name',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement
            return item.value
        }
    }
})

const inputSecondName = new Input({
    type: 'text',
    placeholder: 'Фамилия',
    classNames: 'flex label',
    name: 'secondName',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement
            return item.value
        }
    }
})

const inputTel = new Input({
    type: 'tel',
    placeholder: 'Номер телефона',
    classNames: 'flex label',
    name: 'tel',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement
            return item.value
        }
    }
})

const inputPassword = new Input({
    type: 'password',
    placeholder: 'Пароль',
    classNames: 'flex label',
    name: 'password',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement
            return item.value
        }
    }
})

const inputPasswordRepeat = new Input({
    type: 'password',
    placeholder: 'Пароль еще раз',
    classNames: 'flex label',
    name: 'passwordRepeat',
    events: {
        input: (e: Event): string => {
            const item = e.target as HTMLInputElement
            return item.value
        }
    }
})

renderDom('#root', page)
renderDom('.form', inputEmail)
renderDom('.form', inputLogin)
renderDom('.form', inputName)
renderDom('.form', inputSecondName)
renderDom('.form', inputTel)
renderDom('.form', inputPassword)
renderDom('.form', inputPasswordRepeat)
renderDom('.form', button)
