/*
@author Rafael Herbert
Lider: Mei Fagundes

Version backup
*/

class  PatrimonioRelat  {
  constructor(patrimonio) {
    //let patrimonioRelat = patrimonio;// não sei qual o certo mas vou fazendo
    this.patrimonio = patrimonio;
  }// Recebe a array do patrimonio
  relatOcorr(){


  }
  relatPorcentTipo(){

  }

  relatManutTotal(){

  }
  relatManutTipo(){

  }
  relatBaixasTotal(){

  }
  relatBaixasTipo(){

  }
  // getters que retornam arrays com todos os elementos em discriminação solicitada

  get allTipos(){
    var patrimonioTipos = {maquina,outros};
    for(var item in patrimonio){
      switch (item.tipo) {
        case 'MAQUINA':
          patrimonioTipos[maquina].push(patrimonio.getPrototypeOf(item));
          break;
        case 'OUTROS':
          patrimonioTipos[outros].push(patrimonio.getPrototypeOf(item));
          break;
        default:

      }
      //patrimonio.foreach(discrimina(item.tipo));

    }
  }//retorna uma array encadeada os tipos discriminados

  get allManut(){
    var patrimonioManut = [];
    for(var patrimonio_EM_MANUTENCAO in patrimonio){
      if(patrimonio_EM_MANUTENCAO.status == 'EM_MANUTENCAO'){
        patrimonioManut.push(patrimonio.getPrototypeOf( patrimonio_EM_MANUTENCAO));
      }
    }
    return patrimonioManut;
  }//retorna array com elementos do patrimonio discriminados pelo status 'EM_MANUTENCAO'

  get allBaixas(){
    var patrimonioBaixas = [];
    for(var patrimonio_EM_BAIXA in patrimonio){
      if(patrimonio_EM_BAIXA.status == 'VENDIDO'){
        patrimonioBaixas.push(patrimonio_EM_BAIXA);
      }
      if(patrimonio_EM_BAIXA.status == 'DESCARTADO'){
        patrimonioBaixas.push(patrimonio_EM_BAIXA);
      }
    }
    return patrimonioBaixas;
  }//retorna array com elementos do patrimonio discriminados pelo status 'EM_MANUTENCAO'

  function discrimina(opcao){
      var saida = [];
      for(var item in patrimonio){
          switch (opcao) {
            case patrimonio.tipo:
            case patrimonio.status:
            case patrimonio.nome:
              saida.push(patrimonio.getPrototypeOf(item));
              break;
            default:
            //console.log(New error("Parametro não suportado pela função discrimina()."));
            break;
          }
      }
      return saida;
  }
  //  retorna uma array com os elementos do patrimonio discriminados de acordo
  // com o parâmetro que receber. Parametros de busca suportados: id,nome,tipo,status.
}
