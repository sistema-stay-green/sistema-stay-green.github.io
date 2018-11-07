/**
 * Script para auxiliar no funcionamento do filtro.
 * @author Mei Fagundes, Maria Eduarda
 */

function getPatrimonioBase(patrimonios = new Patrimonio()[], status){
  let patrimonioBase = new Patrimonio()[];
  for(let patrimonio of patrimonios){
      if(status == patrimonio.status())
        patrimonioBase.push(patrimonio);
    }
    return patrimonioBase;
  }

function getPatrimoniosEmManutencao(patrimonios = new Patrimonio()[]) {
    return getPatrimonioBase(patrimonios, 'EM_MANUTENCAO');

}//retorna array com elementos do patrimonio discriminados pelo status 'EM_MANUTENCAO'

function getPatrimoniosEmPosse(patrimonios = new Patrimonio()[]) {
    return getPatrimonioBase(patrimonios, 'EM_POSSE');
}//retorna array com elementos do patrimonio discriminados pelo status 'EM_POSSE'

function getPatrimoniosAlugados(patrimonios = new Patrimonio()[]) {
    return getPatrimonioBase(patrimonios, 'ALUGADOS');
}//retorna array com elementos do patrimonio discriminados pelo status 'ALUGADOS'

function getPatrimoniosVendidos(patrimonios = new Patrimonio()[]) {
    return getPatrimonioBase(patrimonios, 'VENDIDOS');
}//retorna array com elementos do patrimonio discriminados pelo status 'VENDIDOS'

function getPatrimoniosDescartados(patrimonios = new Patrimonio()[]){
    return getPatrimonioBase(patrimonios, 'DESCARTADO');
}//retorna array com elementos do patrimonio discriminados pelo status 'DESCARTADO
