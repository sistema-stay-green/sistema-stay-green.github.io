/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

class Produto {

    

    // encapsula e cria o objeto item
    constructor() {
        this._nomeProduto = null;
        this._descrProduto = null;
        this._unidMedProduto = null;
        this._valorUnitProduto = null;
        this._quantEstoqueProduto = null;
        this._pontoAvisoProduto = null;

        this._fotoMercadoria = null;
        this._item = null;
    }

    toJSON(){
        if(this._nomeProduto != null &&
               this._descrProduto != null &&
               this._unidMedProduto != null &&
               this._valorUnitProduto != null &&
               this._quantEstoqueProduto != null){
            this._item = {
                nomeProduto: this._nomeProduto,
                descrProduto: this._descrProduto,
                unidMedidaProduto: this._unidMedProduto,
                valorUnitProduto: this._valorUnitProduto,
                quantEstoqueProduto: this._quantEstoqueProduto,
                pontoAvisoProduto: this._pontoAvisoProduto 
            }
            
        }

    }

    getItem(){
        return this._item;
    }

    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&operacao=adicionar&tipo=produto";
        console.log(this._item);
        return Request.get(url);
    }
}
