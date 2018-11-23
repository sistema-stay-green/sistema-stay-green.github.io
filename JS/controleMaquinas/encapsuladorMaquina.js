
/**
 * Envia dados para o Servlet para Compra de máquinas.
 * @param {int} id inteiro representando o ID da máquina;
 * @param {String} nome representando o nome da máquina;
 * @param {String} finalidade breve finalidade da máquina;
 * @param {float} indiceDepreciacao real positivo representando a porcentagem a depreciacao por ano;
 * @param {int} valorCompra inteiro positivo representando o valor da compra da máquina;
 * @param {String} dataCompra representa a data em que a compra foi realizada;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularCadastrar(nome, finalidade,
  indiceDepreciacao, valorCompra){
    let maquina = new Maquina(0);
    maquina.nome = nome;
    maquina.finalidade = finalidade;
    maquina.status = "EM_POSSE";
    maquina.indiceDepreciacao = indiceDepreciacao;
    maquina.valorCompra = valorCompra;

    return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para Comprar máquina.
 * @param {int} Id um inteiro representando o ID da máquina;
 * @param {int} dataBaixa uma string com a data de baixa;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularVenda(id, dataBaixa){
    let maquina = new Maquina(id);
    maquina.status = "VENDIDO";
    maquina.dataBaixa = formatarData(dataBaixa);

    return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para Vender máquina.
 * @param {int} Número inteiro representando o ID da máquina;
 * @param {int} dataBaixa uma string com a data de baixa;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularDescarte(id,dataBaixa){
    let maquina = new Maquina(id);
    maquina.status = "DESCARTADO";
    maquina.dataBaixa = formatarData(dataBaixa);

    return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para Alugar máquina.
 * @param {int} Número inteiro representando o ID da máquina;
 * @param {String} dataRetorno string representando data de retorno;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularAluguel(id, dataRetorno, valorAluguel){
  let maquina = new Maquina(id);
  maquina.status = "ALUGADO";
  maquina.dataRetorno = formatarData(dataRetorno);
  maquina.dataSaida = novaData();


  return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para Enviar máquina à manutenção.
 * @param {int} Número inteiro representando o ID da máquina;
 * @param {String} dataRetorno string representando data de retorno;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularManutencao(id, dataRetorno){
  let maquina = new Maquina(id);
  maquina.status = "EM_MANUTENCAO";
  maquina.dataSaida = new Date();
  maquina.dataRetorno = dataRetorno;

  return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para edição de máquinas.
 * @param {int} id inteiro representando o ID da máquina;
 * @param {String} nome representando o nome da máquina;
 * @param {String} finalidade breve finalidade da máquina;
 * @param {float} indiceDepreciacao real positivo representando a porcentagem a depreciacao por ano;
 * @param {int} valorCompra inteiro positivo representando o valor da compra da máquina;
 * @param {String} dataCompra representa a data em que a compra foi realizada;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularEditar(id, nome, finalidade, indiceDepreciacao, valorCompra, dataCompra){
    let maquina = new Maquina(id);
    maquina.nome = nome;
    maquina.finalidade = finalidade;
    maquina.indiceDepreciacao = indiceDepreciacao;
    maquina.valorCompra = valorCompra;
    maquina.dataCompra = dataCompra;

    return maquina.toJSON();
}
