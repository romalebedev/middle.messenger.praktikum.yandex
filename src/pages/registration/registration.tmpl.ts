export default `
h1 Регистрация
form.flex.form     
    input(type="text", placeholder="Почта").input
    input(type="text", placeholder="Логин").input
    input(type="text", placeholder="Имя").input
    input(type="text", placeholder="Фамилия").input
    input(type="text", placeholder="Номер телефона").input
    input(type="text", placeholder="Пароль").input
    input(type="text", placeholder="Пароль еще раз").input
    span.error все поля обазательны для заполнения
div.flex    
    a(href="#").link Войти
`
