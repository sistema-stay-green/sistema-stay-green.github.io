/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

class Produto {



    // encapsula e cria o objeto item
    constructor() {
        this.idProduto = null;
        this.nomeProduto = null;
        this.descrProduto = null;
        this.valorUnitProduto = null;
        this.quantEstoqueProduto = null;
        this.pontoAvisoProduto = null;
        this.fotoMercadoria = null;
        this.unidMedProduto = null;
    }
    /**
     *
     * @return Id de um objeto Produto
     */
    getIdProduto() {
        return idProduto;
    }

    /**
     * Define o id de um objeto Produto
     * @param idProduto
     */
    setIdProduto(idProduto) {
        this.idProduto = idProduto;
    }

    /**
     *
     * @return nome de um objeto Produto
    */
    getNomeProduto() {
        return nomeProduto;
    }

    /**
     * Define o nome de um objeto Produto
     * @param nomeProduto
     */
    setNomeProduto(nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    /**
     * @return descrição de um objeto Produto
    */
    getDescrProduto() {
               return descrProduto;
    }

    /**
    * Define a descrição de um objeto Produto
    * @param descrProduto
    */
    setDescrProduto(descrProduto) {
      this.descrProduto = descrProduto;
    }

    /**
     * @return unidade de medida de um objeto Produto
    */
    getUnidMedProduto() {
      return unidMedProduto;
    }

    /**
    * Define a unidade de medida de um objeto Produto
    * @param unidMedProduto
    */
    setUnidMedProduto(unidMedProduto) {
      this.unidMedProduto = unidMedProduto;
    }

    /**
     * @return valor unitário de um objeto Produto
    */
    getValorUnitProduto() {
      return valorUnitProduto;
    }

    /**
    * Define o valor unitário de um objeto Produto
    * @param valorUnitProduto
    */
    setValorUnitProduto(valorUnitProduto) {
      this.valorUnitProduto = valorUnitProduto;
    }

    getQuantEstoqueProduto() {
      return quantEstoqueProduto;
    }

    /**
    * Define a quantidade no estoque de um objeto Produto
    * @param quantEstoqueProduto
    */
    setQuantEstoqueProduto(quantEstoqueProduto) {
      this.quantEstoqueProduto = quantEstoqueProduto;
    }

    /**
     * @return ponto de aviso de um objeto Produto
    */
    getPontoAvisoProduto() {
      return pontoAvisoProduto;
    }

    /**
    * Define o ponto de aviso de um objeto Produto
    * @param pontoAvisoProduto
    */
    setPontoAvisoProduto(pontoAvisoProduto) {
      this.pontoAvisoProduto = pontoAvisoProduto;
    }

    /**
     * @return url da foto de um objeto Produto
    */
    getFotoMercadoria() {
      return fotoMercadoria;
    }

    /**
    * Define a foto de um objeto Produto
    * @param fotoMercadoria
    */
    setFotoMercadoria(fotoMercadoria) {
      this.fotoMercadoria = fotoMercadoria;
    }

    /**
    * Faz a requisição para adicionar o produto no bd
    */
    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&operacao=adicionar&tipo=produto";
        return Request.get(url);
    }
}
