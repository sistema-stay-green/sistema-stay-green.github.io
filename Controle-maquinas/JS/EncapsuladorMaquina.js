

// Enviaremos já com status?
// Vender = Descartar?
// Porque não tinha dataRetorno?

function encapsularTodos(id, nome, descricao, status,
                      indiceDepreciacao, valorCompra, valorAtual, dataCompra,
                      dataSaida, dataRetorno, dataBaixa){
    let maquina = new Maquina(id);
    maquina.id = id;
    maquina.nome = nome;
    maquina.tipo = "MAQUINA";
    maquina.descricao = descricao;
    maquina.status = status
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
 * @param {int} Número inteiro representando o ID da máquina;
 * @returns {boolean} Verdadeiro se a requisão for feita com sucesso, falso se não.
 * @author Guilherme Sena
 */
function encapsularCompra(id, nome, descricao, status,
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
 * @param {int} Número inteiro representando o ID da máquina;
 * @returns {boolean} Verdadeiro se a requisão for feita com sucesso, falso se não.
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
 * @returns {boolean} Verdadeiro se a requisão for feita com sucesso, falso se não.
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
 * @returns {boolean} Verdadeiro se a requisão for feita com sucesso, falso se não.
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
 * @returns {boolean} Verdadeiro se a requisão for feita com sucesso, falso se não.
 * @author Guilherme Sena
 */
function encapsularManutencao(id){
  let maquina = new Maquina(id);
  maquina.status = "EM_MANUTENCAO";
  maquina.dataSaida = new Date();
  maquina.dataRetorno = dataRetorno;

  return maquina.toJSON();
}
