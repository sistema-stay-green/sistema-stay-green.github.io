/**
 * Função base para filtrar os Patrimonios recebidos por um determinado Status.
 * @author Mei Fagundes, Maria Eduarda, Sávio Cardoso, Rafaerl Herbert
 */
function getPatrimoniosFromStatus(patrimonios = [], status){
  let patrimoniosResult = [];

  for(let patrimonio of patrimonios){
      if(status == patrimonio.status)
        patrimoniosResult.push(patrimonio);
    }
    if (patrimoniosResult.length !== 0)
        return patrimoniosResult;
    else
        return null;
}

/**
 * Filtra o Array de Patrimônios recebidos pelo Status "EM_MANUTENCAO".
 * @param {Array} patrimonios
 */
function getPatrimoniosEmManutencao(patrimonios = []) {
    return getPatrimoniosFromStatus(patrimonios, 'EM_MANUTENCAO');
}

/**
 * Filtra o Array de Patrimônios recebidos pelo Status "EM_POSSE".
 * @param {Array} patrimonios
 */
function getPatrimoniosEmPosse(patrimonios = []) {
    return getPatrimoniosFromStatus(patrimonios, 'EM_POSSE');
}

/**
 * Filtra o Array de Patrimônios recebidos pelo Status "ALUGADO".
 * @param {Array} patrimonios
 */
function getPatrimoniosAlugados(patrimonios = []) {
    return getPatrimoniosFromStatus(patrimonios, 'ALUGADO');
}

/**
 * Filtra o Array de Patrimônios recebidos pelo Status "VENDIDO".
 * @param {Array} patrimonios
 */
function getPatrimoniosVendidos(patrimonios = []) {
    return getPatrimoniosFromStatus(patrimonios, 'VENDIDO');
}

/**
 * Filtra o Array de Patrimônios recebidos pelo Status "DESCARTADO".
 * @param {Array} patrimonios
 */
function getPatrimoniosDescartados(patrimonios = []){
    return getPatrimoniosFromStatus(patrimonios, 'DESCARTADO');
}

/**
 * Função base para filtrar os Patrimonios recebidos por um determinado Status.
 */

function getPatrimoniosFromTipo(patrimonios = [],tipo){
  let patrimoniosResult = [];

  for(let patrimonio of patrimonios){
      if(tipo == patrimonio.tipo){
        patrimoniosResult.push(patrimonio);
    }
    if (patrimoniosResult.length !== 0)
        return patrimoniosResult;
    else
        return null;
}

/**
 * Filtra o Array de Patrimônios recebidos pelo Status "DESCARTADO".
 * @param {Array} patrimonios
 */
function getPatrimoniosMaquina(patrimonios = []){
    return getPatrimoniosFromStatus(patrimonios, 'MAQUINA');
}

/**
 * Filtra o Array de Patrimônios recebidos pelo Status "DESCARTADO".
 * @param {Array} patrimonios
 */
function getPatrimoniosOutros(patrimonios = []){
    return getPatrimoniosFromStatus(patrimonios, 'OUTROS');
}
