import Block from './block';

export default class WebSocketService {
    private static instance: WebSocketService;
    private socket;
    block?: Block;

    constructor(userId?: string, chatId?: number, chatToken?: string, block?: Block) {
        this.block = block;
        if (userId && chatId && chatToken) {
            this.socket?.close();
            this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`);
            this.socket.addEventListener('open', this.onOpen.bind(this));
            this.socket.addEventListener('message', this.onMessage.bind(this));
            this.socket.addEventListener('error', this.onError.bind(this));
            this.socket.addEventListener('close', this.onClose.bind(this));
        }
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }

        return WebSocketService.instance;
    }

    send(payload: messagePayload): void {
        console.log('Сообщение отправлено');

        this.socket?.send(JSON.stringify(payload));
    }

    onOpen(): void {
        console.log('Соединение установлено');
        this.send({
            content: '0',
            type: 'get old',
        });
    }

    onMessage(event: MessageEvent): void {
        console.log('Получены данные');

        const messages = event.data;
        if (messages) {
            const parsedMessages = JSON.parse(messages);
            if (Array.isArray(parsedMessages)) {
                localStorage.setItem('messages', messages);
                this.block?.setProps({ messages: parsedMessages.reverse() });
            } else {
                const oldMessages = localStorage.getItem('messages');

                if (oldMessages) {
                    const parsedOldMessages = JSON.parse(oldMessages);
                    parsedOldMessages.unshift(parsedMessages);
                    localStorage.setItem('messages', JSON.stringify(parsedOldMessages));
                    this.block?.setProps({ messages: parsedOldMessages.reverse() });
                }
            }
        }
    }

    onError(event: Error): void {
        console.log('Error: ', event.message);
    }

    onClose(event: CloseEvent): void {
        if (event.wasClean) {
            console.log('Соединение закрыто');
        } else {
            console.log('Обрыв соединения');
        }
    }
}

type messagePayload = {
    content: string;
    type: string;
};
