export default `
div.form-wrapper
    h1 Вход
    form.flex.form
        input(type="text", placeholder="Логин").input
        input(type="text", placeholder="Пароль").input
        span.error неверный логин/пароль
    div.wrapper-links    
        a(href="../registration/registration.html").link Нет аккаунта?  
`;
