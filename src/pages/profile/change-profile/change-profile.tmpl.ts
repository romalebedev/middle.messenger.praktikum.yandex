export default `
.avatar-block.flex
    img(src="", alt="Аватар").avatar
    input(
        type='file'
        name='avatar'
        accept='image/*'
      ).invisible
form.form.flex
    ul.user-block-list 
        li.user-block-item.list-item
            span.margin Почта
        li.user-block-item.list-item
            span.margin Логин
        li.user-block-item.list-item
            span.margin Имя
        li.user-block-item.list-item
            span.margin Фамилия
        li.user-block-item.list-item
            span.margin Имя в чате
        li.user-block-item.list-item
            span.margin Телефон
.wrapper-links.flex 
    a.link Вернуться назад 
`;
