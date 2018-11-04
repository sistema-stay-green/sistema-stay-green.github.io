//feito pela gerência
const Request = class {

    static async get(url, resposeType = 'json') {

        return await new Promise(function(resolve, reject) {

            let request = new XMLHttpRequest();
            request.responseType = resposeType;
            request.open('GET', url, true);
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200)
                    resolve(request.response);
            };
            request.onerror = reject;
            request.send();

        });

    }

    static async post(url, params = '', resposeType = 'json') {

        return await new Promise(function(resolve, reject) {

            let request = new XMLHttpRequest();
            request.responseType = resposeType;
            request.open('POST', url, true);
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200)
                    resolve(request.response);
            };
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.onerror = reject;
            request.send(params);

        });

    }

};
