/**
 * Arquivo JavaScript de testes e debug da página e suas interações.
 * @author Mei
 */

// --- CONST ---

const id = ["0", "1", "2", "3", "4"];
const nome = ["Trator 1", "Saca de café 1", "Trator 2", "Saca de café 2", "Trator 3"];
const tipo = ["MAQUINA", "OUTROS", "MAQUINA", "OUTROS", "MAQUINA"];
const finalidade = ["Uma máquina que ajuda na colheita do café.", "Saca com 20KG de grãos de café",
     "Uma máquina que ajuda na colheita do café.", "Saca com 20KG de grãos de café", "Uma máquina que ajuda na colheita do café."];
const status = ["EM_POSSE", "VENDIDO", "EM_MANUTENCAO", "DESCARTADO", "ALUGADO"];
const indiceDepreciacao = [10, 1, 20, 2, 30];
const valorCompra = [10000, null, 50000, null, 800000];
const dataCompra = [new Date(2017, 5, 9), new Date(2016, 10, 20), new Date(2015, 12, 13), new Date(2017, 3, 5), new Date(2017, 10 ,3)];
const dataSaida = [null, new Date(2018, 10, 20), new Date(), null, new Date()];
const dataRetorno = [new Date(), null, null, null, null];
const dataBaixa = [null, null, null, new Date(), null];

// --- FUNCTIONS ---

function generatePlaceholders() {

    for (let i = 0; i < id.length; i++) {

        let patrimonio = new Patrimonio(id[i]);
        patrimonio.nome = nome[i];
        patrimonio.tipo = tipo[i];
        patrimonio.finalidade = finalidade[i];
        patrimonio.status = status[i];
        patrimonio.indiceDepreciacao = indiceDepreciacao[i];
        patrimonio.valorCompra = valorCompra[i];
        patrimonio.dataCompra = dataCompra[i];
        patrimonio.dataSaida = dataSaida[i];
        patrimonio.dataRetorno = dataRetorno[i];
        patrimonio.dataBaixa = dataBaixa[i];

        patrimonio.calculateValorAtual();

        insertPatrimonioIntoTable(patrimonio);
    }
}

// --- CODE ---

generatePlaceholders();
hidePatrimonioTable();
showPatrimonioTable();
