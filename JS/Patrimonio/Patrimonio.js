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
        this._finalidade = null;
        this._status = null;
        this._indiceDepreciacao = null;
        this._valorCompra = null;
        //this._valorAtual = null;
        this._dataCompra = null;
        this._dataSaida = null;
        this._dataRetorno = null;
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
        console.log("Finalidade: " + this._finalidade);
        console.log("Status: " + this._status);
        console.log("Índice de depreciação: " + this._indiceDepreciacao);
        console.log("Valor da Compra: " + this._valorCompra);
        console.log("Valor Atual: " + this.calculateValorAtual());
        console.log("Data da Compra: " + this._dataCompra);
        console.log("Data da Saída: " + this._dataSaida);
        console.log("Data do Retorno: " + this._dataRetorno);
        console.log("Data da Baixa: " + this._dataBaixa);
    }

    /**
     * Tenta converter uma string para o seu valor em Float e a retorna.
     * @param {string} number String a ser convertida.
     * @returns {number} Valor em Float correspondente ou o valor inicial.
     * @author Mei
     */
    tryParse(number){

        if (isNaN(number) == true && typeof number === "string")
            return parseFloat(number);
        else
            return number;
    }

    /**
     * Calcula o valor atual de cada patrimônio. Valor mímimo = 10% do valor de compra.
     * @returns {number} valor em Float correspondente ao valor atual.
     * @author Mei, Maria Eduarda
     */
    calculateValorAtual(){

        if (this._valorCompra !== null && this._dataCompra !== null) {
            let anoCompra = this._dataCompra.getFullYear();
            let diferencaData = new Date().getFullYear() - anoCompra;
            let valorAtt = this._valorCompra -
                ((diferencaData * (this._indiceDepreciacao/100))
                * this._valorCompra);
            let valorMinimo = this._valorCompra/10;
            if(valorAtt > valorMinimo){
              return valorAtt;
            }else
              return valorMinimo;
        }
        else
            return null;
    }

    /**
     * Converte objeto Patrimonio em string JSON.
     * @returns {string} String com formatação JSON do objeto.
     * @author Guilherme Sena
     */
    toJSON(){

        let patrimonioJSON = {};

        if (this._id !== null)
            patrimonioJSON["idPatrimonio"] = this._id;

        if (this._nome !== null)
            patrimonioJSON["nomePatrimonio"] = this._nome;

        if (this._tipo !== null)
            patrimonioJSON["tipoPatrimonio"] = this._tipo;

        if (this._finalidade !== null)
            patrimonioJSON["finalidadePatrimonio"] = this._finalidade;

        if (this._status !== null)
            patrimonioJSON["statusPatrimonio"] = this._status;

        if (this._indiceDepreciacao !== null)
            patrimonioJSON["indDeprecPatrimonio"] = this._indiceDepreciacao;

        if (this._valorCompra !== null)
            patrimonioJSON["valorCompraPatrimonio"] = this._valorCompra;

        if (this._dataCompra !== null){
            let dC = this._dataCompra.toISOString().slice(0,10).replace("/-/g","").split("-");
            patrimonioJSON["dataCompraPatrimonio"] = {"year":parseInt(dC[0]), "month":parseInt(dC[1]) - 1, "dayOfMonth":parseInt(dC[2])};
        }
        if (this._dataSaida !== null){
            let dS = this._dataSaida.toISOString().slice(0,10).replace("/-/g","").split("-");
            patrimonioJSON["dataSaidaPatrimonio"] = {"year":parseInt(dS[0]), "month":parseInt(dS[1]) - 1, "dayOfMonth":parseInt(dS[2])};
        }
        if (this._dataRetorno !== null){
            let dR = this._dataRetorno.toISOString().slice(0,10).replace("/-/g","").split("-");
            patrimonioJSON["dataRetornoPatrimonio"] = {"year":parseInt(dR[0]), "month":parseInt(dR[1]) - 1, "dayOfMonth":parseInt(dR[2])};
        }
        if (this._dataBaixa !== null){
            let dB = this._dataBaixa.toISOString().slice(0,10).replace("/-/g","").split("-");
            patrimonioJSON["dataBaixaPatrimonio"] = {"year":parseInt(dB[0]), "month":parseInt(dB[1]) - 1, "dayOfMonth":parseInt(dB[2])};
        }

      return JSON.stringify(patrimonioJSON);
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

    get finalidade(){
        return this._finalidade;
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
        return this.calculateValorAtual();
        //return this._valorAtual;
    }

    get dataCompra(){
        return this._dataCompra;
    }

    get dataSaida(){
        return this._dataSaida;
    }

    get dataRetorno(){
        return this._dataRetorno;
    }

    get dataBaixa(){
        return this._dataBaixa;
    }

    get dataCompraString(){
        return this._dataCompra.toISOString().slice(0,10).replace("/-/g","");
    }

    get dataSaidaString(){
        return this._dataSaida.toISOString().slice(0,10).replace("/-/g","");
    }

    get dataRetornoString(){
        return this._dataRetorno.toISOString().slice(0,10).replace("/-/g","");
    }

    get dataBaixaString(){
        return this._dataBaixa.toISOString().slice(0,10).replace("/-/g","");
    }

    // Setter

    set id(id){
        this._id = this.tryParse(id);
    }

    set nome(nome){
        this._nome = nome;
    }

    set tipo(tipo){
        switch (tipo) {

            case 'MAQUINA':
            case 'OUTROS':
                this._tipo = tipo;
                break;

            default:
                console.log(new Error("O Tipo recebido não corresponde a nenhum dos valores possíveis."));
                break;
        }
    }

    set finalidade(finalidade){
        this._finalidade = finalidade;
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

    set dataCompra(dataCompra = new Date()){
        if (!(dataCompra instanceof Date) && dataCompra !== null)
            console.log(new Error("dataCompra precisa receber um objeto instância de Date."));
        else
            this._dataCompra = dataCompra;
    }

    set dataSaida(dataSaida = new Date()){
        if (!(dataSaida instanceof Date) && dataSaida !== null)
            console.log(new Error("dataSaida precisa receber um objeto instância de Date."));
        else
            this._dataSaida = dataSaida;
    }

    set dataRetorno(dataRetorno = new Date()){
        if (!(dataRetorno instanceof Date) && dataRetorno !== null)
            console.log(new Error("dataRetorno precisa receber um objeto instância de Date."));
        else
            this._dataRetorno = dataRetorno;
    }

    set dataBaixa(dataBaixa = new Date()){
        if (!(dataBaixa instanceof Date) && dataBaixa !== null)
            console.log(new Error("dataBaixa precisa receber um objeto instância de Date."));
        else
            this._dataBaixa = dataBaixa;
    }
}
