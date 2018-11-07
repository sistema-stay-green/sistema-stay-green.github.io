class Tarefa{
  constructor(){

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
  tryParse(number, typeFloat = false){
      if (!isNaN(number) && number != undefined)
        return typeFloat? parseFloat(number) : parseInt(number);
      else
        return number;
  }

  /*
  * Converte objeto Patrimonio em string JSON.
  * @returns {string} String com formatação JSON do objeto.
  * @author Guilherme Sena
  */
  toJSONString(){
   let tarefaJSON = {
     "nomeTarefa": this.nomeTarefa,
     "descricao": this.descricao,
     "tipoTarefa": this.tipoTarefa,
     "dataInicialTarefa": this.dataInicialTarefa,
     "periodoRepetTarefa": this.periodoRepetTarefa,
     "insumosTarefa": this.insumosTarefa,
     "qtInsumosTarefa": this.qtInsumosTarefa,
     "qtProduzTarefa": this.qtProduzTarefa,
     "gastoTarefa": this.gastoTarefa
   }

    return JSON.stringify(tarefaJSON);
  }


  //Setters
  set nomeTarefa(nomeTarefa){
    this._nomeTarefa = nomeTarefa;
  }

  set descrTarefa(descrTarefa){
    this._descrTarefa = descrTarefa;
  }

  set tipoTarefa(tipoTarefa){
    this._tipoTarefa = tipoTarefa;
  }

  set dataInicialTarefa(dataInicialTarefa){
     if(!(dataInicialTarefa instanceof Date))
        this._dataInicialTarefa = new Date();
     else
        this._dataInicialTarefa = dataInicialTarefa;
  }

  set periodoRepetTarefa(periodoRepetTarefa){
    this._periodoRepetTarefa = this.tryParse(periodoRepetTarefa);
  }

  set insumosTarefa(insumosTarefa){
    this._insumosTarefa = insumosTarefa;
  }

  set qtInsumosTarefa(qtInsumosTarefa){
    this._qtInsumosTarefa = this.tryParse(qtInsumosTarefa);
  }

  set qtProduzTarefa(qtProduzTarefa){
    this._qtProduzTarefa = this.tryParse(qtProduzTarefa, true);
  }

  set gastoTarefa(gastoTarefa){
    this._gastoTarefa = this.tryParse(gastoTarefa, true);
  }

  //Getters
  get nomeTarefa(){
    return this._nomeTarefa;
  }

  get descrTarefa(){
    return this._descrTarefa;
  }

  get tipoTarefa(){
    return this._tipoTarefa;
  }

  get dataInicialTarefa(){
    return this._dataInicialTarefa;
  }

  get periodoRepetTarefa(){
    return this._periodoRepetTarefa;
  }

  get insumosTarefa(){
    return this._insumosTarefa;
  }

  get qtInsumosTarefa(){
    return this._qtInsumosTarefa;
  }

  get qtProduzTarefa(){
    return this._qtProduzTarefa;
  }

  get gastoTarefa(){
    return this._gastoTarefa;
  }

}
