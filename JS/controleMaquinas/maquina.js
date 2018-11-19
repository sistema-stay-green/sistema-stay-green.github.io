/**
 * Classe objeto para a encapsulação de dados do Patrimonio.
 * @author
 */
class Maquina {

    constructor(id) {

        // Setting all attributes as null to differ from the default 'undefined'
        this._id = id;
        this._nome = null;
        this._tipo = null;
        this._finalidade = null;
        this._status = null;
        this._indiceDepreciacao = null;
        this._valorCompra = null;
        this._valorAtual = null;
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
        console.log("Valor Atual: " + this._valorAtual);
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

    calculateValorAtual(){
        if (this._valorCompra !== null && this._dataCompra !== null) {
            let anoCompra = this._dataCompra.getFullYear();
            let diferencaData = new Date().getFullYear() - anoCompra;
            this._valorAtual = this._valorCompra -
                ((diferencaData * (this._indiceDepreciacao/100))
                * this._valorCompra);
        }
    }

    /**
     * Converte objeto Maquina em string JSON.
     * @returns {string} String com formatação JSON do objeto.
     * @author Guilherme Sena
     */
    toJSON(){
      let patrimonioJSON = {
        "idPatrimonio": this._id,
        "nomePatrimonio": this._nome,
        "tipoPatrimonio": this._tipo,
        "finalidadePatrimonio": this._descricao,
        "statusPatrimonio": this._status,
        "indDeprecPatrimonio": this._indiceDepreciacao,
        "valorCompraPatrimonio": this._valorCompra,
        "valorAtual": this._valorAtual,
      }
      return JSON.stringify(patrimonioJSON);
    }

    /**
     * Coloca valores nas váriaveis de máquina a partir de um JSON
     * @param {string} patrimonoString com formatação JSON do objeto.
     * @author Guilherme Sena
     */
    fromJSON(patrimonioString){
      patrimonioJSON = JSON.parse(patrimonioString);
      this._id = patrimonioJSON.idPatrimonio;
      this._nome = patrimonioJSON.nomePatrimonio;
      this._tipo = patrimonioJSON.tipoPatrimonio;
      this._descricao = patrimonioJSON.finalidadePatrimonio;
      this._status = patrimonioJSON.statusPatrimonio;
      this._indiceDepreciacao = patrimonioJSON.indDeprecPatrimonio;
      this._valorCompra = patrimonioJSON.valorCompraPatrimonio;
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
        return this._valorAtual;
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

    set valorAtual(valorAtual){
            this._valorAtual = this.tryParse(valorAtual);
    }


}
