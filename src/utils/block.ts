import EventBus from './event-bus';

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    _element: HTMLElement;

    _meta: { tagName: string; props: Props };

    props: Props;

    key: string;

    eventBus: () => EventBus;

    constructor(tagName: string, props = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };

        this.props = this._makePropsProxy({ ...props });

        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources(): void {
        const { tagName } = this._meta;
        if (tagName) {
            this._element = this._createDocumentElement(tagName);
        }
    }

    init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    componentDidMount(): void {}

    _componentDidUpdate(oldProps: Props, nextProps: Props): boolean {
        return oldProps !== nextProps;
    }

    componentDidUpdate(): boolean {
        return true;
    }

    setProps = (nextProps: Props): void => {
        if (!nextProps) {
            return;
        }

        if (this._componentDidUpdate(this.props, nextProps)) {
            this._makePropsProxy(nextProps);
            Object.assign(this.props, nextProps);
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    };

    get element(): HTMLElement {
        return this._element;
    }

    private _render(): void {
        const block = this.render();
        this._removeEvents();
        const el = block as unknown as Element;

        const { classNames } = this.props;

        if (classNames) {
            classNames.split(' ').forEach((className: string) => {
                this._element?.classList.add(className);
            });
        }

        if (this._element && el) {
            this._element.innerHTML = '';

            if (el.childNodes !== undefined) {
                const children = Array.prototype.slice.call(el.childNodes);
                children.forEach((item: Element) => {
                    this._element.appendChild(item);
                });
            }

            this._addEvents();
        }
    }

    private _addEvents(): void {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName: string) => {
            this.element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this.element?.removeEventListener(eventName, events[eventName]);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(): void {}

    getContent(): HTMLElement {
        return this.element;
    }

    _makePropsProxy(props: Props): Props {
        const self = this;
        const propsProxy = new Proxy(props, {
            set(target: Props, p: string, value: unknown) {
                target[p] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, self.props, { [p]: value });
                return true;
            },
            deleteProperty() {
                throw new Error('Нет прав');
            },
            get(target: Props, p: string) {
                const value = target[p];
                return typeof value === 'function' ? value.bind(self) : value;
            },
        });
        return propsProxy;
    }

    _createDocumentElement(tagName: string): HTMLElement {
        const el = document.createElement(tagName);
        return el;
    }

    showElement(element: Element | any): void {
        element.classList.add('show');
    }

    hideElement(element: Element): void {
        element.classList.add('hide');
    }

    hide(): void {
        this.getContent().style.display = 'none';
    }

    show(): void {
        this.getContent().style.display = 'flex';
    }
}

export type Props = {
    events?: Events;
    classNames?: string;
    [key: string]: unknown;
    children?: Record<string, Block>;
};

export type Events = {
    [key: string]: (e: Event) => void;
};
