/**
 * Script para auxiliar no funcionamento do filtro.
 * @author Mei Fagundes, Maria Eduarda
 */

function getPatrimoniosFromStatus(patrimonios = [], status){
  let patrimoniosResult = [];
  for(let patrimonio of patrimonios){
      if(status == patrimonio.status())
        patrimoniosResult.push(patrimonio);
    }
    return patrimoniosResult;
}

function getPatrimoniosEmManutencao(patrimonios = []) {
    return getPatrimoniosFromStatus(patrimonios, 'EM_MANUTENCAO');

}//retorna array com elementos do patrimonio discriminados pelo status 'EM_MANUTENCAO'

function getPatrimoniosEmPosse(patrimonios = []) {
    return getPatrimoniosFromStatus(patrimonios, 'EM_POSSE');
}//retorna array com elementos do patrimonio discriminados pelo status 'EM_POSSE'

function getPatrimoniosAlugados(patrimonios = []) {
    return getPatrimoniosFromStatus(patrimonios, 'ALUGADOS');
}//retorna array com elementos do patrimonio discriminados pelo status 'ALUGADOS'

function getPatrimoniosVendidos(patrimonios = []) {
    return getPatrimoniosFromStatus(patrimonios, 'VENDIDOS');
}//retorna array com elementos do patrimonio discriminados pelo status 'VENDIDOS'

function getPatrimoniosDescartados(patrimonios = []){
    return getPatrimoniosFromStatus(patrimonios, 'DESCARTADO');
}//retorna array com elementos do patrimonio discriminados pelo status 'DESCARTADO
