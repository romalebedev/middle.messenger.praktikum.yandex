export default `
.avatar-block.flex
    img(src="../../../resources/avatar.png", alt="Аватар").avatar
    span Имя
form.form.flex    
    ul.user-block-list 
        li.user-block-item.list-item
            span.margin Старый пароль
        li.user-block-item.list-item
            span.margin Новый пароль
        li.user-block-item.list-item
            span.margin Повторите новый пароль
.wrapper-links.flex 
a(href="../profile.html").link Вернуться назад 
`;
