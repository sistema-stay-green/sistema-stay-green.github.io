function recebeDadosCompra(){
    let patrimonio = new Patrimonio(5);
    patrimonio.nome = document.querySelector('#nome_patrimonio').value;
    patrimonio.tipo = document.querySelector('#tipo_patrimonio').value;
    patrimonio.descricao = document.querySelector('#descricao_patrimonio').value;
    patrimonio.status = "EM POSSE";
    patrimonio.indiceDepreciacao = document.querySelector('#indice_depreciacao').value;
    patrimonio.valorCompra = document.querySelector('#valor_compra').value;
    patrimonio.valorAtual = document.querySelector('#valor_compra').value;
    patrimonio.dataCompra = document.querySelector('#data_compra').value;
    patrimonio.dataBaixa = null;
    patrimonio.dataSaida = null;

    patrimonio.printToConsole();
}

function recebeDadosEntrada(){}

function recebeDadosSaida(){}

function atualizaTabela(){
  
}
