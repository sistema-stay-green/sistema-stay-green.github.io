let modalConfirma = document.getElementById('div-modal');
let nomeInput = modalConfirma.querySelector('input[name=nome]');
let modoPagamentoSelect = modalConfirma.querySelector('select[name=modoPagamento]');
let dataEntregaInput = modalConfirma.querySelector('input[name=dataEntrega]');
let regiaoSelect = modalConfirma.querySelector('select[name=regiao]');
let enderecoInput = modalConfirma.querySelector('input[name=endereco]');
let cepInput = modalConfirma.querySelector('input[name=cep]');
let confirmaButton = modalConfirma.querySelector('#confirmaModal');

class Comprador{
    constructor(nomeComprador, enderecoComprador, cepComprador, modoPagamento){
        this.nomeComprador = nomeComprador;
        this.enderecoComprador = enderecoComprador;
        this.cepComprador = cepComprador;
        this.modoPagamento = modoPagamento;
    }
}

class Venda{
    constructor(idItemTransacao, valorTransacao, quantTransacao, dataEntrega = new Date()){
        this.idItemTransacao = idItemTransacao;
        this.valorTransacao = valorTransacao;
        this.quantTransacao = quantTransacao;
        this.dia = dataEntrega.getDate();
        this.mes = dataEntrega.getMonth()+1;
        this.ano = dataEntrega.getFullYear();
        this.freteVenda = 10;
        this.tempoEntregaVenda = 10;
    }
}

confirmaButton.addEventListener('click', e => {
    let venda = new Venda(arrayCarrinho[0].id, arrayCarrinho[0].valor , arrayCarrinho[0].quantidade, dataEntregaInput.valueAsDate);
    let comprador = new Comprador(nomeInput.value, enderecoInput.value, cepInput.value, modoPagamentoSelect.value);
    let query = "?";
    for (const key in venda) {
        if (venda.hasOwnProperty(key)) {
            const elemento = venda[key];
            query += `${key}=${encodeURI(elemento)}&`
        }
    }
    for (const key in comprador) {
        if (comprador.hasOwnProperty(key)) {
            const elemento = comprador[key];
            query += `${key}=${encodeURI(elemento)}&`
        }
    }
    console.log(query);
    Request.get(`http://localhost:8080/StayGreen/DadosVendasServlet${query}`);
});