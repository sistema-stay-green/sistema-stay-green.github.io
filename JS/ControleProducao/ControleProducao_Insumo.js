/* Autor: Diego Demétrio
   Grupo 1: Controle de produção
   líder: Arthur Marcolino */

class Insumo {
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

  constructor(){
    encapsulaDados();
    this._item = {
      nome: this._nome,
      finalidade: this._finalidade,
      valorUnidade: this._valorUnidade,
      estoque: this._estoque,
      pontoAviso: this._pontoAviso,
      Tipo: "insumo",
      id: 0
    }
  }


  //faz requisição utilizando classe fornecida pela gerência
  fazRequisicao(){
    var url = "ControleProducaoServlet?json=" + JSON.stringify(this._item) + "&botao=adicionar&tipo=insumo";
    return Request.get(url);
  }
}
