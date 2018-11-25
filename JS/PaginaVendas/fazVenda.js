let fretes = {};
Request.get('http://localhost:8080/StayGreen/GetFretesServlets')
    .then(resp => {
        resp.forEach(element => {
            fretes[element.regiaoFrete] = element.precoFrete;
        });
    });
/**
 * Classe que auxilia a passar dados do comprador
 */
class Comprador {
    /**
     * 
     * @param {String} nomeComprador nome do comprador
     * @param {String} enderecoComprador endereço do comprador
     * @param {String} cepComprador cep do comprador
     * @param {String} modoPagamento modo de pagamento do comprador 
     */
    constructor(nomeComprador, enderecoComprador, cepComprador, modoPagamento) {
        this.nomeComprador = nomeComprador;
        this.enderecoComprador = enderecoComprador;
        this.cepComprador = cepComprador;
        this.modoPagamento = modoPagamento;
    }
}

/**
 * Classe que auxilia a passar dados do frete e tempo de entrega
 */
class Venda {
    /**
     * 
     * @param {Number} freteVenda valor do frete
     * @param {Number} tempoEntregaVenda dias faltantes para a entrega
     */
    constructor(freteVenda = 10, tempoEntregaVenda = new Date()) {
        this.freteVenda = freteVenda;
        this.diaEntregaVenda = tempoEntregaVenda.getUTCDate();
        this.mesEntregaVenda = tempoEntregaVenda.getMonth();
        this.anoEntregaVenda = tempoEntregaVenda.getFullYear();
    }
}

/**
 * Classe que auxilia a passar dados de transação
 */
class Transacao {
    /**
     * 
     * @param {any} idItemTransacao id do item 
     * @param {Number} valorTransacao valor da transação 
     * @param {Number} quantTransacao quantidade de itens na transação
     */
    constructor(idItemTransacao, valorTransacao, quantTransacao) {
        this.idItemTransacao = idItemTransacao;
        this.valorTransacao = valorTransacao;
        this.quantTransacao = quantTransacao;

    }
}

/**
 * representa a data
 */
class DataTransacao {
    constructor(dataEntrega = new Date()) {
        this.dia = dataEntrega.getDate();
        this.mes = dataEntrega.getMonth();
        this.ano = dataEntrega.getFullYear();
    }
}


function fazVenda(dataTransacao, venda, comprador, ...transacoes) {
    let query = `?`; //inicia a querystring

    //adiciona os elementos presentes no objeto venda
    for (const key in venda) {
        if (venda.hasOwnProperty(key)) {
            const elemento = venda[key];
            query += `${key}=${encodeURI(elemento)}&`
        }
    }

    //adiociona os elementos presentes no objeto dataTransacao
    for (const key in dataTransacao) {
        if (dataTransacao.hasOwnProperty(key)) {
            const elemento = dataTransacao[key];
            query += `${key}=${encodeURI(elemento)}&`
        }
    }

    //adiciona os elementos presentes no objeto comprador
    for (const key in comprador) {
        if (comprador.hasOwnProperty(key)) {
            const elemento = comprador[key];
            query += `${key}=${encodeURI(elemento)}&`
        }
    }

    //adiciona as transacoes
    query += `transacoes=${encodeURI(JSON.stringify(transacoes))}`;

    //faz a requisição
    Request.get(`http://localhost:8080/StayGreen/DadosVendasServlet${query}`);
}
