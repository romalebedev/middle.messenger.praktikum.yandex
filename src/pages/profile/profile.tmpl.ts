export default `
.avatar-block.flex
    img(src="../../resources/profile.svg", alt="Аватар").avatar
    span Имя
form.form.flex    
    ul.user-block-list 
        li.user-block-item.list-item
            span Почта
            span.input.change-input pochta@yandex.ru
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
    a(href="./change-password/change-password.html").link Изменить пароль 
`
