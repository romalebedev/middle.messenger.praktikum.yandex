export default `
.avatar-block.flex
    img(src="../../../resources/avatar.png", alt="Аватар").avatar
    span Имя
form.form.flex    
    ul.user-block-list 
        li.user-block-item.list-item
            span Старый пароль
            input(type="password" value="12345678").input.change-input
        li.user-block-item.list-item
            span Новый пароль
            input(type="password" value="12345678").input.change-input
        li.user-block-item.list-item
            span Повторите новый пароль
            input(type="password" value="12345678").input.change-input    
.wrapper-links.flex 
a(href="../profile.html").link Вернуться назад 
`
