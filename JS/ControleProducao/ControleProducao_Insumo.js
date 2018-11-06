/* Autor: Diego Demétrio
   Grupo 1: Controle de produção
   líder: Arthur Marcolino */

class Insumo {

  constructor(){
    encapsulaDados();
    this._item = {
      nome: this._nome,
      finalidade: this._finalidade,
      valorUnidade: this._valorUnidade,
      estoque: this._estoque,
      pontoAviso: this._pontoAviso,
      Tipo: "Insumo"
    }
  }

  //encapsula os dados
  encapsulaDados(){
    this._nome = document.querySelector("#inpNomeInsumo");
    this._finalidade = document.querySelector("#inpFinalidadeInsumo");
    this._valorUnidade = document.querySelector("#inpValorUniInsumo");
    this._estoque = document.querySelector("#inpQuantEstoqueInsumo");

    //verifica se há um ponto de aviso
    var aux = document.querySelector("#inpPontoAvisoInsumo");
    this._pontoAviso = (aux == null) ? "" : aux;
  }

  //faz requisição utilizando classe fornecida pela gerência

    fazRequisicao(){
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item);
        return Request.get(url);

      }
    }
