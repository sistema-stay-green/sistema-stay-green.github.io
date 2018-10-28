/*   Autor: Sávio Cardoso
     Grupo 5: patrimônio
     líder: Mei Fagundes */

// --- DOM ---

let enviarComprarButton = document.querySelector("button[name='enviarComprarButton']");
let modalPage = document.querySelector("#comprar");

// --- FUNCTIONS ---
function encapsulaDados(){
    modalPage.classList.remove("aparece");
    let patrimonio = new Patrimonio(5);
    patrimonio.nome = document.querySelector('#nome_patrimonio').value;
    patrimonio.tipo = document.querySelector('#tipo_patrimonio').value;
    patrimonio.descricao = document.querySelector('#descricao_patrimonio').value;
    patrimonio.status = 'EM_POSSE';
    patrimonio.indiceDepreciacao = document.querySelector('#indice_depreciacao').value;
    patrimonio.valorCompra = document.querySelector('#valor_compra').value;
    patrimonio.valorAtual = document.querySelector('#valor_compra').value;
    let data = document.querySelector('#data_compra').value.split('-');
    patrimonio.dataCompra = new Date(data[0], data[1], data[2]);;

    patrimonio.printToConsole();
}

// --- EVENT LISTENERS ---
enviarComprarButton.addEventListener("click", encapsulaDados);
