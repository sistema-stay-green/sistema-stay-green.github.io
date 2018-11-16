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

getDescrProduto() {
           return descrProduto;
       }

setDescrProduto(descrProduto) {
           this.descrProduto = descrProduto;
       }

 getUnidMedProduto() {
           return unidMedProduto;
       }

setUnidMedProduto(unidMedProduto) {
           this.unidMedProduto = unidMedProduto;
       }

 getValorUnitProduto() {
           return valorUnitProduto;
       }

setValorUnitProduto(valorUnitProduto) {
           this.valorUnitProduto = valorUnitProduto;
       }

 getQuantEstoqueProduto() {
           return quantEstoqueProduto;
       }

setQuantEstoqueProduto(quantEstoqueProduto) {
           this.quantEstoqueProduto = quantEstoqueProduto;
       }

getPontoAvisoProduto() {
           return pontoAvisoProduto;
       }

setPontoAvisoProduto(pontoAvisoProduto) {
           this.pontoAvisoProduto = pontoAvisoProduto;
       }

getFotoMercadoria() {
           return fotoMercadoria;
       }
setFotoMercadoria(fotoMercadoria) {
           this.fotoMercadoria = fotoMercadoria;
       }

    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this._item) + "&operacao=adicionar&tipo=produto";
        return Request.get(url);
    }
}
