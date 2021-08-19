enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method?: string;
    data?: unknown;
    mode?: string;
    timeout?: number;
    headers?: Record<string, string>;
};

export default class HTTPTransport {
    get = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(
            url,
            {
                ...options,
                method: METHOD.GET,
            },
            options.timeout,
        );
    };

    post = (url: string, options?: Options): Promise<XMLHttpRequest> =>
        this.request(url, { ...options, method: METHOD.POST });

    put = (url: string, options: Options): Promise<XMLHttpRequest> =>
        this.request(url, { ...options, method: METHOD.PUT });

    delete = (url: string, options: Options): Promise<XMLHttpRequest> =>
        this.request(url, { ...options, method: METHOD.DELETE });

    request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
        const { method, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method'));
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.open(method, url);
            xhr.onload = () => {
                resolve(xhr);
            };

            Object.keys(headers).forEach((key: string) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.withCredentials = true;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (!data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}
