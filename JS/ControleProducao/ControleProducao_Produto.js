/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

class Produto {

    encapsulaDados() {
        this._nome = document.querySelector("#selNomeProduto").value;
        this._descricao = document.querySelector("#selDescricaoProduto").value;
        if (document.querySelector("#tdNomeProduto").innerHTML == "KG (Kilograma)") {
            this._unMedida = "KG";
        } else {
            this._unMedida = "L";
        }
        this._valorProduto = parseFloat(document.querySelector("#inpValorProduto").value);
        this._estoque = parseInt(document.querySelector("#inpQuantEstoqueProduto").value);

        //verifica se há um ponto de aviso (valor opcional);
        var aux = parseInt(document.querySelector("#inpPontoAvisoProduto").value);
        this._pontoAviso = aux == null ? "" : aux;

    }

    // encapsula e cria o objeto item
    constructor() {
        this._nome = null;
        this._descricao = null;
        this._unMedida = null;
        this._valorProduto = null;
        this._estoque = null;
        this._pontoAviso = null;
    }

    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&operacao=adicionar&tipo=produto";
        return Request.get(url);
    }
}
