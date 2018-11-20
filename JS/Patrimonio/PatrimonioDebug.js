/**
 * Script de testes e debug da página e suas interações.
 * @author Mei Fagundes
 */

// --- CONSTANTE DE MODO DE OPERAÇÃO DA PÁGINA ---
// Define se a página será executada de forma estática ou dinâmica (com conexão).
const staticDebugMode = false;

let lastIdGenerated = 0;
let patrimonioStaticStash = [];

// --- FUNCTIONS ---

/**
 * Gera placeholders no caso da página estar rodando de forma estática.
 * @author Mei Fagundes
 */
function generatePlaceholders() {

    const nome = ["Trator 1", "Saca de café 1", "Trator 2", "Saca de café 2", "Trator 3"];
    const tipo = ["MAQUINA", "OUTROS", "MAQUINA", "OUTROS", "MAQUINA"];
    const finalidade = ["Uma máquina que ajuda na colheita do café.", "Saca com 20KG de grãos de café",
        "Uma máquina que ajuda na colheita do café.", "Saca com 20KG de grãos de café", "Uma máquina que ajuda na colheita do café."];
    const status = ["EM_POSSE", "VENDIDO", "EM_MANUTENCAO", "DESCARTADO", "ALUGADO"];
    const indiceDepreciacao = [10, 1, 20, 2, 30];
    const valorCompra = [10000, 8000, 50000, 35000, 800000];
    const dC = [new Date(2017, 5, 9), new Date(2016, 10, 20), new Date(2015, 12, 13), new Date(2017, 3, 5), new Date(2017, 10 ,3)];
    const dS = [null, new Date(2018, 10, 20), new Date(), null, new Date()];
    const dR = [new Date(), null, null, null, null];
    const dB = [null, null, null, new Date(), null];

    for (let i = 0; i < nome.length; i++) {

        let patrimonio = new Patrimonio(lastIdGenerated);
        patrimonio.nome = nome[i];
        patrimonio.tipo = tipo[i];
        patrimonio.finalidade = finalidade[i];
        patrimonio.status = status[i];
        patrimonio.indiceDepreciacao = indiceDepreciacao[i];
        patrimonio.valorCompra = valorCompra[i];
        patrimonio.dataCompra = dC[i];
        patrimonio.dataSaida = dS[i];
        patrimonio.dataRetorno = dR[i];
        patrimonio.dataBaixa = dB[i];
        lastIdGenerated++;

        patrimonioStaticStash.push(patrimonio);

        insertPatrimonioIntoTable(patrimonio);
    }
}
