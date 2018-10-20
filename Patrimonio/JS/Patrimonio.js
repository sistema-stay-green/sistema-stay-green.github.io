/**
 * Classe objeto para a encapsulação de dados do Patrimonio.
 * @author Mei
 */
class Patrimonio {

    constructor(id) {

        // Setting all attributes as null to differ from the default 'undefined'
        this._id = id;
        this._nome = null;
        this._tipo = null;
        this._descricao = null;
        this._status = null;
        this._indiceDepreciacao = null;
        this._valorCompra = null;
        this._valorAtual = null;
        this._dataCompra = null;
        this._dataSaida = null;
        this._dataBaixa = null;
    }

    /**
     * Imprime no console todos os valores da classe.
     * @author Mei
     */
    printToConsole(){

        console.log("Id: " + this._id);
        console.log("Nome: " + this._nome);
        console.log("Tipo: " + this._tipo);
        console.log("Descrição: " + this._descricao);
        console.log("Status: " + this._status);
        console.log("Índice de depreciação: " + this._indiceDepreciacao);
        console.log("Valor da Compra: " + this._valorCompra);
        console.log("Valor Atual: " + this._valorAtual);
        console.log("Data da Compra: " + this._dataCompra);
        console.log("Data da Saída: " + this._dataSaida);
        console.log("Data da Baixa: " + this._dataBaixa);
    }

    /**
     * Tenta converter uma string para o seu valor em Float e a retorna.
     * @param {string} number String a ser convertida.
     * @returns {number} Valor em Float correspondente ou o valor inicial.
     * @author Mei
     */
    tryParse(number){

        if (isNaN(number) == true && number !== undefined)
            return parseFloat(number);
        else
            return number;
    }

    // Getter

    get id(){
        return this._id;
    }

    get nome(){
        return this._nome;
    }

    get tipo(){
        return this._tipo;
    }

    get descricao(){
        return this._descricao;
    }

    get status(){
        return this._status;
    }

    get indiceDepreciacao(){
        return this._indiceDepreciacao;
    }

    get valorCompra(){
        return this._valorCompra;
    }

    get valorAtual(){
        return this._valorAtual;
    }

    get dataCompra(){
        return this._dataCompra;
    }

    get dataSaida(){
        return this._dataSaida;
    }

    get dataBaixa(){
        return this._dataBaixa;
    }

    // Setter

    set id(id){
        if (isNaN(id) == true && id !== undefined)
            this._id = parseInt(id);
        else
            this._id = id;
    }

    set nome(nome){
        this._nome = nome;
    }

    set tipo(tipo){
        this._tipo = tipo;
    }

    set descricao(descricao){
        this._descricao = descricao;
    }

    set status(status){
        switch (status) {

            case 'VENDIDO':
            case 'ALUGADO':
            case 'EM_POSSE':
            case 'DESCARTADO':
            case 'EM_MANUTENCAO':
                this._status = status;
                break;

            default:
                console.log(new Error("O Status recebido não corresponde a nenhum dos valores possíveis."));
                break;
        }
    }

    set indiceDepreciacao(indiceDepreciacao){
            this._indiceDepreciacao = this.tryParse(indiceDepreciacao);
    }

    set valorCompra(valorCompra){
            this._valorCompra = this.tryParse(valorCompra);
    }

    set valorAtual(valorAtual){
            this._valorAtual = this.tryParse(valorAtual);
    }

    set dataCompra(dataCompra){
        if (!(dataCompra instanceof Date))
            console.log(new Error("dataCompra precisa receber um objeto instância de Date."));
        else
            this._dataCompra = dataCompra;
    }

    set dataSaida(dataSaida){
        if (!(dataSaida instanceof Date))
            console.log(new Error("dataSaida precisa receber um objeto instância de Date."));
        else
            this._dataSaida = dataSaida;
    }

    set dataBaixa(dataBaixa){
        if (!(dataBaixa instanceof Date))
            console.log(new Error("dataBaixa precisa receber um objeto instância de Date."));
        else
            this._dataBaixa = dataBaixa;
    }
}
