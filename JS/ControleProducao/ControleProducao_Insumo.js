/* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

class Insumo {

    construtorSemParametros() {
        this.idInsumo = null;
        this.nomeInsumo = null;
        this.finalidadeInsumo = null;
        this.valorCompraInsumo = null;
        this.quantEstoqueInsumo = null;
        this.pontoAvisoInsumo = null;
    }

    /**
     *
     * @return Id de um objeto insumo
     */
    getIdInsumo() {
        return idInsumo;
    }

    /**
     * Define o id de um objeto insumo
     * @param idInsumo
     */
   setIdInsumo(idInsumo) {
        this.idInsumo = idInsumo;
    }

    /**
     *
     * @return nome de um objeto insumo
     */
   getNomeInsumo() {
        return nomeInsumo;
    }

    /**
     * Define o nome de um objeto insumo
     * @param nomeInsumo
     */
   setNomeInsumo(nomeInsumo) {
        this.nomeInsumo = nomeInsumo;
    }

    /**
     *
     * @return a finalidade de um objeto insumo
     */
 getFinalidadeInsumo() {
        return finalidadeInsumo;
    }

    /**
     * Define o nome de um objeto insumo
     * @param finalidadeInsumo
     */
 setFinalidadeInsumo(finalidadeInsumo) {
        this.finalidadeInsumo = finalidadeInsumo;
    }

    /**
     *
     * @return o valor de cada unidade de um objeto insumo
     */
 getValorCompraInsumo() {
        return valorCompraInsumo;
    }

    /**
     * Define o valor de cada unidade de um objeto insumo
     * @param valorCompraInsumo
     */
setValorCompraInsumo(valorCompraInsumo) {
        this.valorCompraInsumo = valorCompraInsumo;
    }

    /**
     *
     * @return estoque de um objeto insumo
     */
 getQuantEstoqueInsumo() {
        return quantEstoqueInsumo;
    }

    /**
     * Define o estoque de um objeto insumo
     * @param quantEstoqueInsumo
     */
setQuantEstoqueInsumo(quantEstoqueInsumo) {
        this.quantEstoqueInsumo = quantEstoqueInsumo;
    }

    /**
     *
     * @return ponto de aviso para o estoque baixo de um objeto insumo
     */
getPontoAvisoInsumo() {
        return pontoAvisoInsumo;
    }

    /**
     * Define o ponto de aviso para o estoque baixo de um objeto insumo
     * @param pontoAvisoInsumo
     */
 setPontoAvisoInsumo(pontoAvisoInsumo) {
        this.pontoAvisoInsumo = pontoAvisoInsumo;
    }

    //faz requisição utilizando classe fornecida pela gerência
    fazRequisicao() {
        var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=" + JSON.stringify(this) + "&operacao=adicionar&tipo=insumo";
        return Request.get(url);
    }
}
