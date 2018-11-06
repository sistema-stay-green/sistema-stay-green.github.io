/* Autor: Diego Demétrio
   Grupo 1: Controle de produção
   líder: Arthur Marcolino */

class Produto {

  encapsulaDados(){
    this._nome = document.querySelector("#selNomeProduto").value;
    this._descricao = document.querySelector("#inpDescricaoProduto").value;
    if (document.querySelector("#tdNomeProduto").innerHTML === "KG (Kilograma)") {
      this._unMedida = "KG";
    }else {
      this._unMedida = "L";
    }
    this._valorProduto = parseFloat(document.querySelector("#inpValorProduto").value);
    this._estoque = parseInt(document.querySelector("#inpQuantEstoqueProduto").value);
    //verifica se há um ponto de aviso (valor opcional);
    var aux = parseInt(document.querySelector("#inpPontoAvisoProduto").value);
    this._pontoAviso = (aux == null) ? "" : aux;
  }
  // encapsula e cria o objeto item
  constructor(){
    this.encapsulaDados();
    this._item = {
      nome: this._nome,
      descricao: this._descricao,
      unMedida: this._unMedida,
      valorProduto: this._valorProduto,
      estoque: this._estoque,
      pontoAviso: this._pontoAviso,
      id: 0,
      tipo: "produto"
    };
    console.log(this._item);
  }

  //encapsula os dados


  fazRequisicao(){
    var url = "ControleProducaoServlet?json=" + JSON.stringify(this._item) + "&botao=adicionar&tipo=produto";

    return Request.get(url);
  }
}
