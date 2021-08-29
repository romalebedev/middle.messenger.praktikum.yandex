import Block from './block';
import { renderDom } from './render-DOM';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export class Route {
    private _pathname: string;
    private _blockClass: any;
    private _block: Block | null;
    private _props: Record<string, any>;

    constructor(pathname: string, view: any, props: Record<string, unknown>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        const root = document.querySelector(this._props.rootQuery);

        if (root) {
            root.removeChild(this._block?.element);
        }

        this._block = null;
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        this._block = new this._blockClass();
        renderDom(this._props.rootQuery, this._block);
    }
}

export class Router {
    private static __instance: Router;
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: Route | null | undefined;
    private _rootQuery: string | undefined;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: Block): this {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes?.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = (() => {
            this._onRoute(window.location.pathname);
            // eslint-disable-next-line no-extra-bind
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history?.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history?.back();
    }

    forward(): void {
        this.history?.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes?.find((route) => route.match(pathname));
    }
}
