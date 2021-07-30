enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method: string;
    headers: object;
    data?: any;
};

function queryStringify(data: any) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => (
        `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
    ), '?');
}

export default class HTTPTransport {
    get = (url: string, options: Options): Promise<XMLHttpRequest> => {
        const { data } = options;
        const queryUrl = url + queryStringify(data);
        delete options.data;

        return this.request(queryUrl, { ...options, method: METHOD.GET });
    };

    post = (url: string, options: Options) => (
        this.request(url, { ...options, method: METHOD.POST })
    );

    put = (url: string, options: Options) => (
        this.request(url, { ...options, method: METHOD.PUT })
    );

    delete = (url: string, options: Options) => (
        this.request(url, { ...options, method: METHOD.DELETE })
    );

    request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
        const { method, data } = options;

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
