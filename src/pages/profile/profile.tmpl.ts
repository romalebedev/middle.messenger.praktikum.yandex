export default `
.avatar-block.flex
    img(src="https://via.placeholder.com/150", alt="Аватар").avatar
    span.name
form.form.flex    
    ul.user-block-list 
        li.user-block-item.list-item
            span Почта
            span.input.change-input
        li.user-block-item.list-item
            span Логин
            span.input.change-input Логин
        li.user-block-item.list-item
            span Имя
            span.input.change-input Имя  
        li.user-block-item.list-item
            span Фамилия
            span.input.change-input Фамилия
        li.user-block-item.list-item
            span Имя в чате
            span.input.change-input Имя в чате
        li.user-block-item.list-item
            span Телефон
            span.input.change-input Телефон    
.wrapper-links.flex 
    .set-container
        a.link Изменить данные 
        a.link Изменить пароль
    a.link Выйти из аккаунта
    a.link Вернуться назад   
`;
