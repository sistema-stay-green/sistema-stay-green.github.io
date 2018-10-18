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
        if (isNaN(id) == true)
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
        this._status = status;
    }

    set indiceDepreciacao(indiceDepreciacao){
        if (isNaN(indiceDepreciacao) == true)
            this._indiceDepreciacao = parseFloat(indiceDepreciacao);
        else
            this._indiceDepreciacao = indiceDepreciacao;
    }

    set valorCompra(valorCompra){
        if (isNaN(valorCompra) == true)
            this._valorCompra = parseFloat(valorCompra);
        else
            this._valorCompra = valorCompra;
    }

    set valorAtual(valorAtual){
        if (isNaN(valorAtual) == true)
            this._valorAtual = parseFloat(valorAtual);
        else
            this._valorAtual = valorAtual;
    }

    set dataCompra(dataCompra){
        if (!(dataCompra instanceof Date))
            console.log("ERRO! dataCompra precisa receber um objeto instância de Date.");
        else
            this._dataCompra = dataCompra;
    }

    set dataSaida(dataSaida){
        if (!(dataSaida instanceof Date))
            console.log("ERRO! dataSaida precisa receber um objeto instância de Date.");
        else
            this._dataSaida = dataSaida;
    }

    set dataBaixa(dataBaixa){
        if (!(dataBaixa instanceof Date))
            console.log("ERRO! dataBaixa precisa receber um objeto instância de Date.");
        else
            this._dataBaixa = dataBaixa;
    }
}
