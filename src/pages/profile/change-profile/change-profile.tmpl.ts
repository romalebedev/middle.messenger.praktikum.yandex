export default `
.avatar-block.flex
    img(src="../../../resources/avatar.png", alt="Аватар").avatar
form.form.flex
    ul.user-block-list 
        li.user-block-item.list-item
            span Почта
            input(type="text" value="pochta@yandex.ru").input.change-input
        li.user-block-item.list-item
            span Логин
            input(type="text" value="Логин").input.change-input
        li.user-block-item.list-item
            span Имя
            input(type="text" value="Имя").input.change-input  
        li.user-block-item.list-item
            span Фамилия
            input(type="text" value="Фамилия").input.change-input
        li.user-block-item.list-item
            span Имя в чате
            input(type="text" value="Имя в чате").input.change-input
        li.user-block-item.list-item
            span Телефон
            input(type="text" value="Телефон").input.change-input      
.wrapper-links.flex 
    a(href="../profile.html").link Вернуться назад 
`
