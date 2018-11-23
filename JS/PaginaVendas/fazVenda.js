const modalConfirma = document.getElementById('div-modal');
const nomeInput = modalConfirma.querySelector('input[name=nome]');
const modoPagamentoSelect = modalConfirma.querySelector('select[name=modoPagamento]');
const dataEntregaInput = modalConfirma.querySelector('input[name=dataEntrega]');
const regiaoSelect = modalConfirma.querySelector('select[name=regiao]');
const enderecoInput = modalConfirma.querySelector('input[name=endereco]');
const cepInput = modalConfirma.querySelector('input[name=cep]');
const confirmaButton = modalConfirma.querySelector('#confirmaModal');
const regexCEP = /(\d{5})-?(\d{3})/;

class Comprador{
    constructor(nomeComprador, enderecoComprador, cepComprador, modoPagamento){
        this.nomeComprador = nomeComprador;
        this.enderecoComprador = enderecoComprador;
        this.cepComprador = cepComprador;
        this.modoPagamento = modoPagamento;
    }
}

class Venda{
    constructor(){
        this.freteVenda = 10;
        this.tempoEntregaVenda = 10;
    }
}

class Transacao{
    constructor(idItemTransacao, valorTransacao, quantTransacao){
        this.idItemTransacao = idItemTransacao;
        this.valorTransacao = valorTransacao;
        this.quantTransacao = quantTransacao;

    }
}

/**
 * representa a data
 */
class dataEntrega{
    constructor(dataEntrega = new Date()){
        this.dia = dataEntrega.getDate();
        this.mes = dataEntrega.getMonth()+1;
        this.ano = dataEntrega.getFullYear();
    }
}

confirmaButton.addEventListener('click', e => {
    let dataTransacao = new dataEntrega(dataEntregaInput.valueAsDate);

    let venda = new Venda();
    let transacoes = Array();
    for (const objeto of arrayCarrinho) {
        transacoes.push(new Transacao(objeto.id, objeto.valor , objeto.quantidade));
    }
    let cepExp = regexCEP.exec(cepInput.value)
    let comprador = new Comprador(nomeInput.value, enderecoInput.value, cepExp[1] + cepExp[2] , modoPagamentoSelect.value);
    let query = `?`;
    for (const key in venda) {
        if (venda.hasOwnProperty(key)) {
            const elemento = venda[key];
            query += `${key}=${encodeURI(elemento)}&`
        }
    }
    for (const key in dataTransacao) {
        if (dataTransacao.hasOwnProperty(key)) {
            const elemento = dataTransacao[key];
            query += `${key}=${encodeURI(elemento)}&`
        }
    }
    for (const key in comprador) {
        if (comprador.hasOwnProperty(key)) {
            const elemento = comprador[key];
            query += `${key}=${encodeURI(elemento)}&`
        }
    }
    query += `transacoes=${encodeURI(JSON.stringify(transacoes))}`;
    console.log(query);
    Request.get(`http://localhost:8080/StayGreen/DadosVendasServlet${query}`);
});