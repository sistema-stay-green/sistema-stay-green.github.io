class Tarefa {
  constructor() {

  }

  /**
 * Tenta converter uma string para o seu valor em Float e a retorna.
 * @param {string} number String a ser convertida.
 * @param {boolean} typeFloat Indica se a String deve ser convertida para
 * formato float ou não (padrão false)
 * @returns {number} Valor em Float/Int correspondente ou o valor inicial.
 * @author Mei, Pedro
 *
 */
  tryParse(number, typeFloat = false) {
    if (!isNaN(number) && number != undefined)
      return typeFloat ? parseFloat(number) : parseInt(number);
    else
      return number;
  }

  /**
   * Formata uma data no formato de um objeto contendo seu ano, dia, mês, e horário adequado
   * para o envio para o Servlet
   * @param {Date} data a data a ser formatada
   * @returns {object} data formatada
   * @author Pedro
   */
  formatDataServlet(data) {
    let dataFormatada = {
      "year": data.getUTCFullYear(),
      "month": data.getMonth(),
      "dayOfMonth": data.getDate(),
      "hourOfDay": data.getHours(),
      "minute": data.getMinutes(),
      "second": data.getSeconds()
    }

    return dataFormatada;
  }

  /**
   * Converte uma data no formato de data enviado pelo Servlet para um objeto Date do JavaScript
   * @param {Object} servletData
   * @returns {Date} objeto Date formatado
   * @author Pedro
   */
  static toDateObject(servletData){
    let stringData = servletData.year + "-" + (servletData.month + 1 < 10 ? "0" + (servletData.month + 1) :
    servletData.month + 1) + "-" + (servletData.dayOfMonth < 10 ? "0" +
      servletData.dayOfMonth : servletData.dayOfMonth);

    let dataFormatadaClient = new Date(stringData);
    dataFormatadaClient.setDate(dataFormatadaClient.getUTCDate());

    return dataFormatadaClient;
  }

  /**
  * Converte objeto Patrimonio em string JSON.
  * @returns {string} String com formatação JSON do objeto.
  * @author Guilherme Sena
  */
  toJSONString() {
    let tarefaJSON = {
      "idTarefa": this.idTarefa,
      "nomeTarefa": this.nomeTarefa,
      "descrTarefa": this.descrTarefa,
      "tipoTarefa": this.tipoTarefa,
      "dataInicialTarefa": this.formatDataServlet(this.dataInicialTarefa),
      "periodRepetTarefa": this.periodRepetTarefa,
      "insumosTarefa": this.insumosTarefa,
      "quantInsumosTarefa": this.quantInsumosTarefa,
      "quantProduzTarefa": this.quantProduzTarefa,
      "gastoTarefa": this.gastoTarefa
    }
    return JSON.stringify(tarefaJSON);
  }


  //Setters
  set idTarefa(idTarefa) {
    this._idTarefa = this.tryParse(idTarefa);
  }

  set nomeTarefa(nomeTarefa) {
    this._nomeTarefa = nomeTarefa;
  }

  set descrTarefa(descrTarefa) {
    this._descrTarefa = descrTarefa;
  }

  set tipoTarefa(tipoTarefa) {
    this._tipoTarefa = tipoTarefa;
  }

  set dataInicialTarefa(dataInicialTarefa) {
    if (!(dataInicialTarefa instanceof Date))
      this._dataInicialTarefa = new Date();
    else
      this._dataInicialTarefa = dataInicialTarefa;
  }

  set periodRepetTarefa(periodRepetTarefa) {
    this._periodRepetTarefa = this.tryParse(periodRepetTarefa);
  }

  set insumosTarefa(insumosTarefa) {
    this._insumosTarefa = insumosTarefa;
  }

  set quantInsumosTarefa(quantInsumosTarefa) {
    this._quantInsumosTarefa = this.tryParse(quantInsumosTarefa);
  }

  set quantProduzTarefa(quantProduzTarefa) {
    this._quantProduzTarefa = this.tryParse(quantProduzTarefa, true);
  }

  set gastoTarefa(gastoTarefa) {
    this._gastoTarefa = this.tryParse(gastoTarefa, true);
  }

  //Getters
  get idTarefa() {
    return this._idTarefa;
  }

  get nomeTarefa() {
    return this._nomeTarefa;
  }

  get descrTarefa() {
    return this._descrTarefa;
  }

  get tipoTarefa() {
    return this._tipoTarefa;
  }

  get dataInicialTarefa() {
    return this._dataInicialTarefa;
  }

  get periodRepetTarefa() {
    return this._periodRepetTarefa;
  }

  get insumosTarefa() {
    return this._insumosTarefa;
  }

  get quantInsumosTarefa() {
    return this._quantInsumosTarefa;
  }

  get quantProduzTarefa() {
    return this._quantProduzTarefa;
  }

  get gastoTarefa() {
    return this._gastoTarefa;
  }

}
