/* Autor: Diego Demétrio
   Grupo 1: Controle de produção
   líder: Arthur Marcolino */

class Produto {

  encapsulaDados(){
    this._nome = document.querySelector("#inpNomeProduto").value;
    this._unMedida = document.querySelector("#inpUniMedProduto").value;
    this._descricao = document.querySelector("#inpDescricaoProduto").value;
    this._valorProduto = parseFloat(document.querySelector("#inpValorProduto").value);
    this._estoque = (document.querySelector("#inpQuantEstoqueProduto").value);

    //verifica se há um ponto de aviso (valor opcional);
    var aux = document.querySelector("#inpPontoAvisoProduto").value;
    this._pontoAviso =  aux == null? "" : aux;

  }
  // encapsula e cria o objeto item
  constructor(){
    this.encapsulaDados();
    this._item = {
      nome: this._nome,
      unMedida: this._unMedida,
      descricao: this._descricao,
      pontoAviso: this._pontoAviso,
      estoque: this._estoque,
      valorProduto: this._valorProduto,
      tipo: "Produto"
    };
    console.log(this._item);
  }

  //encapsula os dados


  fazRequisicao(){
    var url = "nome_servlet?" + JSON.stringify(this._item);

    return Request.get(url);
  }
}
