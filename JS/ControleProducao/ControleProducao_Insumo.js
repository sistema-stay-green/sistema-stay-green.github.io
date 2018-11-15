/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

class Insumo {

    constructor() {
        this._nomeInsumo = null;
        this._finalidadeInsumo = null;
        this._valorCompraInsumo = null;
        this._quantEstoqueInsumo = null;
        this._pontoAvisoInsumo = null;
        this._item = null;
    }

    //encapsula os dados
      toJSON(){
        this._item = {};
        if(this._nomeInsumo != null &&
               this._finalidadeInsumo != null &&
               this._valorCompraInsumo != null &&
               this._quantEstoqueInsumo != null ){
            this._item = {
                nomeInsumo: this._nomeInsumo,
                finalidadeInsumo: this._finalidadeInsumo,
                valorCompraInsumo: this._valorCompraInsumo,
                quantEstoqueInsumo: this._quantEstoqueInsumo,
                pontoAvisoInsumo: this._pontoAvisoInsumo 
            }
            
            console.log(this._item);
        }
      }

    //faz requisição utilizando classe fornecida pela gerência
    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&botao=adicionar&tipo=insumo";
        return Request.get(url);
    }
}
