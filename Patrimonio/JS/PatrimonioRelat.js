/*
@author Rafael Herbert
Lider: Mei Fagundes

*/

  function relatOcorr(patrimonio = new Patrimonio(), key){
    let PatrimonioOccor = getPatrimonioTipo(patrimonio, key);
    console.log(PatrimonioOccor.tipo()+" ocorrência" + Patrimonio.lenght + "unidades");
  }
  function relatPorcentTipo(){

  }

  function relatManutTotal(){

  }
  function relatManutTipo(){

  }
  function relatBaixasTotal(){

  }
  function relatBaixasTipo(){

  }

// getters que retornam arrays com todos os elementos em discriminação solicitada
function getPatrimonioTipo(patrimonio = new Patrimonio(), key){
    let patrimonioTipos;
    for(let item of patrimonio){
      switch (key) {
        case 'MAQUINA':
          if(key == patrimonio.tipo())
            patrimonioTipos.push(patrimonio.getPrototypeOf(item));
          break;
        case 'OUTROS':
          if(key == patrimonio.tipo())
            patrimonioTipos.push(patrimonio.getPrototypeOf(item));
          break;
        default:
      }//chave switch
    }//chave for(..of)
}//retorna uma array


function allBaixas(patrimonio = new Patrimonio()){
    let patrimonioBaixas;
    patrimonioBaixas.push(getPatrimoniosVendidos);
    patrimonioBaixas.push(getPatrimoniosDescartados);
    return patrimonioBaixas;
  }//retorna array com elementos do patrimonio em baixa

function getPatrimonioBase(patrimonio = new Patrimonio(), key){
  let patrimonioBase;
  for(let item of patrimonio){
    switch (key) {
      case 'EM_MANUTENCAO':
        if(key == patrimonio.status())
          patrimonioBase.push(patrimonio.getPrototypeOf(item));
        break;

      case 'EM_POSSE':
        if(key == patrimonio.status())
          patrimonioBase.push(patrimonio.getPrototypeOf(item));
        break;

      case 'ALUGADOS':
        if(key == patrimonio.status())
          patrimonioBase.push(patrimonio.getPrototypeOf(item));
        break;

      case 'VENDIDOS':
        if(key == patrimonio.status())
          patrimonioBase.push(patrimonio.getPrototypeOf(item));
        break;

      case 'DESCARTADO':
        if(key == patrimonio.status())
          patrimonioBase.push(patrimonio.getPrototypeOf(item));
        break;

      default:
        console.log(new Error("Parametro não suportado pela função discrimina()."));
      }
    }
    return patrimonioBase;
  }

function getPatrimoniosEmManutencao(patrimonio = new Patrimonio()) {
    return getPatrimonioBase(patrimonio, 'EM_MANUTENCAO');
}//retorna array com elementos do patrimonio discriminados pelo status 'EM_MANUTENCAO'

function getPatrimoniosEmPosse(patrimonio = new Patrimonio()) {
    return getPatrimonioBase(patrimonio, 'EM_POSSE');
}//retorna array com elementos do patrimonio discriminados pelo status 'EM_POSSE'

function getPatrimoniosAlugados(patrimonio = new Patrimonio()) {
    return getPatrimonioBase(patrimonio, 'ALUGADOS');
}//retorna array com elementos do patrimonio discriminados pelo status 'ALUGADOS'

function getPatrimoniosVendidos(patrimonio = new Patrimonio()) {
    return getPatrimonioBase(patrimonio, 'VENDIDOS');
}//retorna array com elementos do patrimonio discriminados pelo status 'VENDIDOS'

function getPatrimoniosDescartados(patrimonio = new Patrimonio()){
    return getPatrimonioBase(patrimonio, 'DESCARTADO');
}//retorna array com elementos do patrimonio discriminados pelo status 'DESCARTADO
