let modalConfirma = document.getElementById('div-modal');
let nomeInput = modalConfirma.querySelector('input[name=nome]');
let modoPagamentoSelect = modalConfirma.querySelector('select[name=modoPagamento]');
let dataEntregaInput = modalConfirma.querySelector('input[name=dataEntrega]');
let regiaoSelect = modalConfirma.querySelector('select[name=reagiao]');
let estadoInput = modalConfirma.querySelector('input[name=estado]');
let cidadeInput = modalConfirma.querySelector('input[name=cidade]');
let bairroInput = modalConfirma.querySelector('input[name=bairro]');
let ruaInput = modalConfirma.querySelector('input[name=rua]');
let numeroInput = modalConfirma.querySelector('input[name=numero]');
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
    contructor(idItemTransacao, valorTransacao, quantTransacao, dataEntrega = new Date()){
        this.idItemTransacao = idItemTransacao
        this.valorTransacao = valorTransacao
        this.quantTransacao = quantTransacao
        this.dia = dataEntrega.getDate();
        this.mes = dataEntrega.getMonth()+1;
        this.ano = dataEntrega.getFullYear();
        this.freteVenda = 10;
        this.tempoEntregaVenda = 10;
    }
}

confirmaButton.addEventListener('click', e => {
    let venda = new Venda(null, null, null, dataEntregaInput.valueAsDate);
    let endereco = `${ruaInput.value}, nº ${numeroInput.value} - Bairro ${bairroInput.value}`
        + ` - ${cidadeInput.value}`;
    let comprador = new Comprador(nomeInput.value, endereco, cepInput.value, modoPagamentoSelect.value);
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
});