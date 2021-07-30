import EventBus from './event-bus';

export default class Block {
  static EVENTS = {
  	INIT: 'init',
  	FLOW_CDM: 'flow:component-did-mount',
  	FLOW_CDU: 'flow:component-did-update',
  	FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement;

  _meta: { tagName: string, props: Props };

  props: Props;

  rawHTML: string;

  key: string;

  eventBus: () => EventBus;

  constructor(tagName: string, props = {}) {
  	const eventBus = new EventBus();
  	this._meta = {
  		tagName,
  		props,
  	};

  	this.props = this._makePropsProxy({...props});

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
  	const {tagName} = this._meta;
  	if (tagName) {
  		this._element = this._createDocumentElement(tagName);
  	}
  }

  init(): void {
  	this._createResources();
  	this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // _makeComponentsEntryPoints(): void {
  //   if (this.props.components) {
  //     Object.entries(this.props.components).forEach(([componentName, componentValue]: [string, Block]) => {
  //       if (Array.isArray(componentValue)) {
  //         this.props[componentName] = componentValue.reduce((acc, val) => { acc.push(`<component data-key=${val.key}></component>`); return acc; }, []);
  //       } else {
  //         this.props[componentName] = `<component data-key=${componentValue.key}></component>`;
  //       }
  //     });
  //   }
  // }

  _componentDidMount(): void {
  	this.componentDidMount();
  	this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {
  }

  _componentDidUpdate(oldProps: Props, nextProps: Props) {
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

  get element() {
  	return this._element;
  }

  _render(): void {
  	this._removeEvents();
  	this._element.innerHTML = this.render();

  	const {classNames} = this.props;

  	if (classNames) {
  		classNames.split(' ').forEach((className: string) => {
  			this._element?.classList.add(className);
  		});
  	}

  	this._addEvents();
  }

  _addEvents(): void {
  	const {events = {}} = this.props;

  	Object.keys(events).forEach(eventName => {
  		this._element.addEventListener(eventName, events[eventName]);
  	});
  }

  _removeEvents(): void {
  	const {events = {}} = this.props;

  	Object.keys(events).forEach(eventName => {
  		this._element.addEventListener(eventName, events[eventName]);
  	});
  }

  render(): string {
  	return '';
  }

  getContent(): HTMLElement {
  	return this.element;
  }

  _makePropsProxy(props: Props) {
  	const self = this;
  	const propsProxy = new Proxy(props, {
  		set(target: Props, p: string, value: unknown) {
  			target[p] = value;
  			self.eventBus().emit(Block.EVENTS.FLOW_CDU, self.props, {[p]: value});
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

  show(): void {
  	this.getContent().style.display = 'block';
  }

  hide(): void {
  	this.getContent().style.display = 'none';
  }
}

export type Props = {
  events?: Events,
  classNames?: string,
  [key: string]: unknown
};

export type Events = {
  [key: string]: (e: Event) => void,
};
