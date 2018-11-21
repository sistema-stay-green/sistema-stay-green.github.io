const modalVenda = document.getElementById('div-registra');
const idInput = modalVenda.querySelector('input[name=input]');
const dataEntregaInput = modalVenda.querySelector('input[name=dataEntrega]');
const quantVendidaInput = modalVenda.querySelector('input[name=quant]');
const nomeInput = modalVenda.querySelector('input[name=nome]');
const modoPagamentoSelect = modalVenda.querySelector('select[name=modoPagamento]');
const regiaoSelect = modalVenda.querySelector('select[name=regiao]');
const enderecoInput = modalVenda.querySelector('input[name=endereco]');
const cepInput = modalVenda.querySelector('input[name=cep]');
const confirmaButton = modalVenda.querySelector('button[name=confirmaModal]');

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
    let transacoes = [
        new Transacao(idInput.value, arrayProdutos[idInput.value-1].preco * quantVendidaInput.value , quantVendidaInput.value)
    ];
    let comprador = new Comprador(nomeInput.value, enderecoInput.value, cepInput.value, modoPagamentoSelect.value);
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