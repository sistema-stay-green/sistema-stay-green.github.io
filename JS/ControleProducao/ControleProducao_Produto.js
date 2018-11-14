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
        this.encapsulaDados();
        this._item = {
            nomeProduto: this._nome,
            descrProduto: this._descricao,
            unidMedProduto: this._unMedida,
            valorUnitProduto: this._valorProduto,
            quantEstoqueProduto: this._estoque,
            pontoAvisoProduto: this._pontoAviso,
            tipo: "produto"
        };
        console.log(this._item);
    }

    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&operacao=adicionar&tipo=produto";
        return Request.get(url);
    }
}
