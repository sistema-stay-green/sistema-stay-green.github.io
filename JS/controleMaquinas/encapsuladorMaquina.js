/**
 * Envia dados para o Servlet para Compra de máquinas.
 * @param {int} id inteiro representando o ID da máquina;
 * @param {String} nome representando o nome da máquina;
 * @param {String} descricao breve descricao da máquina;
 * @param {String} status em qual situação se encontra a máquina;
 * @param {int} indiceDepreciacao inteiro representando a porcentagem a depreciacao por ano;
 * @param {int} valorCompra inteiro negativo representando o valor da compra da máquina;
 * @param {int} valorCompra inteiro negativo representando o valor da compra da máquina;
 * @param {object} dataCompra Objeto Data representando data de compra;
 * @param {object} dataSaida Objeto Data representando data de saída;
 * @param {object} dataRetorno Objeto Data representando data de retorno;
 * @param {object} dataBaixa Objeto Data representando data de baixa;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularTodos(id, nome, descricao, status,
                      indiceDepreciacao, valorCompra, valorAtual, dataCompra,
                      dataSaida, dataRetorno, dataBaixa){
    let maquina = new Maquina(id);
    maquina.id = id;
    maquina.nome = nome;
    maquina.tipo = "MAQUINA";
    maquina.descricao = descricao;
    maquina.status = status;
    maquina.indiceDepreciacao = indiceDepreciacao;
    maquina.valorCompra = valorCompra;
    maquina.valorAtual = valorAtual;
    maquina.dataCompra = dataCompra;
    maquina.dataSaida = dataSaida;
    maquina.dataRetorno = dataRetorno;
    maquina.dataBaixa = dataBaixa;
    return maquina;
}

/**
 * Envia dados para o Servlet para Compra de máquinas.
 * @param {int} id inteiro representando o ID da máquina;
 * @param {String} nome representando o nome da máquina;
 * @param {String} descricao breve descricao da máquina;
 * @param {String} status em qual situação se encontra a máquina;
 * @param {int} indiceDepreciacao inteiro representando a porcentagem a depreciacao por ano;
 * @param {int} valorCompra inteiro negativo representando o valor da compra da máquina;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularCadastrar(id, nome, descricao, status,
                      indiceDepreciacao, valorCompra){
    let maquina = new Maquina(id);
    maquina.id = id;
    maquina.nome = nome;
    maquina.descricao = descricao;
    maquina.status = status;
    maquina.indiceDepreciacao = indiceDepreciacao;
    maquina.valorCompra = valorCompra;
    maquina.dataCompra = new Date();

    return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para Comprar máquina.
 * @param {int} ID que é um inteiro representando o ID da máquina;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularVenda(id){
    let maquina = new Maquina(id);
    maquina.status = "VENDIDO";
    maquina.dataBaixa = new Date();
    return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para Vender máquina.
 * @param {int} Número inteiro representando o ID da máquina;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularDescarte(id){
    let maquina = new Maquina(id);
    maquina.status = "DESCARTADO";
    maquina.dataBaixa = new Date();

    return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para Alugar máquina.
 * @param {int} Número inteiro representando o ID da máquina;
 * @param {object} dataRetorno Objeto Data representando data de retorno;
 * @returns {String} Retorna uma string com formatação JSON;
 * @author Guilherme Sena
 */
function encapsularAluguel(id, dataRetorno){
  let maquina = new Maquina(id);
  maquina.status = "ALUGADO";
  maquina.dataSaida = new Date();
  maquina.dataRetorno = dataRetorno;

  return maquina.toJSON();
}

/**
 * Envia dados para o Servlet para Enviar máquina à manutenção.
 * @param {int} Número inteiro representando o ID da máquina;
 * @param {object} dataRetorno Objeto Data representando data de retorno;
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
