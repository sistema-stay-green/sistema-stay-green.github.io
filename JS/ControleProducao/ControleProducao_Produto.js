/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

class Produto {

    

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
