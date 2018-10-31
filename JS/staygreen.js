/** Sistema de Agronegocio :: Stay Green
 * CEFET-MG
 * INF-2A 2018
 * * * * * * * * * * * * * * * * * * * *
 * @file JavaScript para propósito geral.
 */

 /**
  * Classe que contém métodos estáticos para a realização
  * mais facilitada de requisições AJAX.
  */
class Request {

    /**
     * Realiza uma requisição GET, retornando uma Promise com a resposta.
     *
     * @param {string} url - A URL de onde se quer fazer a requisição
     * @param {string} [responseType=json] - O tipo de resposta que se deseja
     * obter. Por padrão, o tipo será JSON
     * @returns {Promise} Uma Promise que retorna a resposta do servidor
     */
    static async get(url, responseType = 'json') {

        return await new Promise(function(resolve, reject) {

            let request = new XMLHttpRequest();
            request.responseType = responseType;
            request.open('GET', url, true);
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200)
                    resolve(request.response);
            };
            request.onerror = reject;
            request.send();

        });

    }

    /**
     * Realiza uma requisição POST, retornando uma Promise com a resposta.
     *
     * @param {string} url - A URL de onde se quer fazer a requisição
     * @param {string} params - String contendo os parâmetros a serem
     *  passados na requisição. Exemplo: 'id=3&parametro=valor'
     * @param {string} [responseType=json] - O tipo de resposta que se deseja
     * obter. Por padrão, o tipo será JSON
     * @returns {Promise} Uma Promise que retorna a resposta do servidor
     */
    static async post(url, params = '', responseType = 'json') {

        return await new Promise(function(resolve, reject) {

            let request = new XMLHttpRequest();
            request.responseType = responseType;
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
