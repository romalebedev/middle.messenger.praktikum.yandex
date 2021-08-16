export default `
.chatlist-container
    .chatlist-header.flex
        a.link.chat-link Профиль
    ul.chats-list    
.chats-container
    .no-selected-chat-block
        span Выберите чат чтобы отправить сообщение
    .selected-chat-block
        .header
            img(src="https://via.placeholder.com/150", alt="Аватар").user-avatar  
            span.user-name Иван
            img(src="https://image.flaticon.com/icons/png/512/875/875550.png", alt="Удалить").delete-icon
        .chat
        .footer
            img(src="https://image.flaticon.com/icons/png/512/3814/3814305.png", alt="Отправить").send-icon    
`;
