/* Arquivo provisório
 */

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

};