export class BaseAPI {
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
    create(): void {
        throw new Error('Not implemented');
    }

    request(): void {
        throw new Error('Not implemented');
    }

    update(): void {
        throw new Error('Not implemented');
    }

    delete(): void {
        throw new Error('Not implemented');
    }
}
