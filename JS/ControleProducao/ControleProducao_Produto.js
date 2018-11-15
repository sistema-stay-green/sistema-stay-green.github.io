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
        this._quantEstoque = null;
        this._pontoAviso = null;
        this._item = null;
    }

    toJSON(){
        if(this._nome != null &&
               this._descricao != null &&
               this._unMedida != null &&
               this._valorProduto != null &&
               this._estoque != null){
            this._item = {
                nome: this._nome,
                descricao: this._descricao,
                unMedida: this._unMedida,
                valorProduto: this._valorProduto,
                quantEstoque: this._estoque,
                pontoAviso: this._pontoAviso 
            }
            
            console.log("pontoaviso" + this._pontoAviso);
        }

    }

    getItem(){
        return this._item;
    }
    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&operacao=adicionar&tipo=produto";
        return Request.get(url);
    }
}
