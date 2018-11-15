/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

class Insumo {

    constructor() {
        this._nome = null;
        this._finalidade = null;
        this._valorCompra = null;
        this._quantEstoque = null;
        this._pontoAviso = null;
        this._item = null;
    }

    //encapsula os dados
      toJSON(){
        this._item = {};
        if(this._nome != null &&
               this._finalidade != null &&
               this._valorCompra != null &&
               this._quantEstoque != null ){
            this._item = {
                nome: this._nome,
                finalidade: this._finalidade,
                valorCompra: this._valorCompra,
                quantEstoque: this._quantEstoque,
                pontoAviso: this._pontoAviso 
            }
            this._item[nome] = this._nome;
            this._item[descricao] = this._descricao;
            this._item[valorProduto] = this._valorProduto;
            this._item[estoque] = this._estoque;
            this._item[pontoAviso] = this._pontoAviso;
            console.log(this._item);
        }
      }

    //faz requisição utilizando classe fornecida pela gerência
    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&botao=adicionar&tipo=insumo";
        console.log(url);
        return Request.get(url);
    }
}
