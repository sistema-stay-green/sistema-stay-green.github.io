/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

class Insumo {

    encapsulaDados() {
        this._nome = document.querySelector("#inpNomeInsumo").value;
        this._finalidade = document.querySelector("#inpFinalidadeInsumo").value;
        this._valorUnidade = parseFloat(document.querySelector("#inpValorUniInsumo").value);
        this._estoque = parseInt(document.querySelector("#inpQuantEstoqueInsumo").value);

        //verifica se há um ponto de aviso
        var aux = parseInt(document.querySelector("#inpPontoAvisoInsumo").value);
        this._pontoAviso = (aux == null) ? "" : aux;
    }
    constructor() {
        this.encapsulaDados();
        this._item = {
            nomeInsumo: this._nome,
            finalidadeInsumo: this._finalidade,
            valorCompraInsumo: this._valorUnidade,
            quantEstoqueInsumo: this._estoque,
            pontoAvisoInsumo: this._pontoAviso,

            Tipo: "Insumo"
        }
    }

    //encapsula os dados


    //faz requisição utilizando classe fornecida pela gerência

    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&botao=adicionar&tipo=insumo";
        console.log(url);
        return Request.get(url);

    }
}
