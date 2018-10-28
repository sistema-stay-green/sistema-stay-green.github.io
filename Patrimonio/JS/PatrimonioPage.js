/*   Autor: Sávio Cardoso
     Grupo 5: patrimônio
     líder: Mei Fagundes */

// --- DOM ---

const patrimonioMenuButton = document.querySelector("button[name='patrimonioMenuButton']");
const addPatrimonioButton = document.querySelector("#addPatrimonioButton");
const entradaOptionButton = document.querySelectorAll("button[name='entradaOptionButton']");
const saidaOptionButton = document.querySelectorAll("button[name='saidaOptionButton']");
const cancelarModalButton = document.querySelectorAll("button[name='cancelarModalButton']");
const enviarEntradaModalButton = document.querySelector("button[name='enviarEntradaModalButton']");
const enviarSaidaModalButton = document.querySelector("button[name='enviarSaidaModalButton']");

const entradaModal = document.querySelector("#entrada");
const saidaModal = document.querySelector("#saida");
const comprarModal = document.querySelector("#comprar");
const patrimonioTable = document.querySelector("#patrimonioTable tbody");

const NA = "N/A";

// --- FUNCTIONS ---

function showComprarPage(){
    comprarModal.classList.toggle("aparece");
    entradaModal.classList.remove("aparece");
    saidaModal.classList.remove("aparece");
}

function showEntradaModal(){
    entradaModal.classList.toggle("aparece");
    saidaModal.classList.remove("aparece");
    comprarModal.classList.remove("aparece");
}

function showSaidaModal(){
    saidaModal.classList.toggle("aparece");
    entradaModal.classList.remove("aparece");
    comprarModal.classList.remove("aparece");
}

function showPatrimonioPage(){
    document.querySelector("#header").style.display = "block";
    document.querySelector("#tabela").style.display = "block";
}

function recebeDadosEntrada(){
    entradaModal.classList.remove("aparece");
}

function  recebeDadosSaida(){
    saidaModal.classList.remove("aparece");
}

function cancelarModal(){
    saidaModal.classList.remove("aparece");
    entradaModal.classList.remove("aparece");
    comprarModal.classList.remove("aparece");
}

/**
 * Indenta um objeto Patrimonio na tabela principal.
 * @param {Patrimonio} patrimonio 
 * @author Mei
 */
function insertPatrimonioIntoTable(patrimonio = new Patrimonio()){

    let tr = document.createElement("tr");
    let td;
    let button;

    td = document.createElement("td");
    if(patrimonio.id !== undefined)
        td.innerHTML = patrimonio.id;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.nome !== null && patrimonio.nome !== "")
        td.innerHTML = patrimonio.nome;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.tipo !== null && patrimonio.tipo !== "")
        td.innerHTML = patrimonio.tipo;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.finalidade !== null && patrimonio.finalidade !== "")
        td.innerHTML = patrimonio.finalidade;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.status !== null && patrimonio.status !== "")
        td.innerHTML = patrimonio.status;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.indiceDepreciacao !== null && patrimonio.indiceDepreciacao !== "")
        td.innerHTML = patrimonio.indiceDepreciacao;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.valorCompra !== null && patrimonio.valorCompra !== "")
        td.innerHTML = patrimonio.valorCompra;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.valorAtual !== null && patrimonio.valorAtual !== "")
        td.innerHTML = patrimonio.valorAtual;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataCompra !== null)
        td.innerHTML = patrimonio.dataCompra.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataSaida !== null)
        td.innerHTML = patrimonio.dataSaida.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataRetorno !== null)
        td.innerHTML = patrimonio.dataRetorno.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataBaixa !== null)
        td.innerHTML = patrimonio.dataBaixa.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    // Adicionando os botões com id's variáveis. Ex: 'edit-7'
    td = document.createElement("td"); 

    button = document.createElement("button");
    button.id = "edit-" + patrimonio.id;
    button.innerHTML = "Editar";
    td.appendChild(button);

    button = document.createElement("button");
    button.id = "delete-" + patrimonio.id;
    button.innerHTML = "Deletar";
    td.appendChild(button);

    tr.appendChild(td);

    patrimonioTable.appendChild(tr);

}

/**
 * Esconde a tabela principal e a substui por uma mensagem de aviso
 * @author Mei
 */
function hidePatrimonioTable(){

    //let table = document.querySelector("#tabela");
    document.querySelector("table").style.display = "none";

    let span = document.createElement("span");
    span.id = "noResults";

    let message = document.createElement("p");
    message.innerHTML = "Nenhum Patrimônio foi encontrado.";
    span.appendChild(message);

    message = document.createElement("p");
    message.innerHTML = "Tente mudar o filtro selecionado ou registrar um novo Patrimônio.";
    span.appendChild(message);

    document.querySelector("#tabela").appendChild(span);

}

/**
 * Mostra novamete a tabela e remove a mensagem de aviso
 * @author Mei
 */
function showPatrimonioTable(){

    document.querySelector("table").style.display = "block";
    document.querySelector("#noResults").remove();
}

function recoverPatrimonioFromModal(){

    let patrimonio = new Patrimonio();

    patrimonio.nome = document.querySelector("#comprar [name='nomeInput']").value;
    patrimonio.tipo = document.querySelector("#comprar [name='tipoInput']").value;
    patrimonio.finalidade = document.querySelector("#comprar [name='finalidadeInput']").value;
    patrimonio.indiceDepreciacao = document.querySelector("#comprar [name='indiceDepreciacaoInput']").value;
    patrimonio.valorCompra = document.querySelector("#comprar [name='valorCompraInput']").value;
    let data = document.querySelector("#comprar [name='dataCompraInput']").value.split('-');
    patrimonio.dataCompra = new Date(data[0], data[1], data[2]);;

    return patrimonio;
}

// --- EVENT LISTENERS ---

patrimonioMenuButton.addEventListener("click", showPatrimonioPage);
addPatrimonioButton.addEventListener("click", showComprarPage);
enviarEntradaModalButton.addEventListener("click", recebeDadosEntrada);
enviarSaidaModalButton.addEventListener("click", recebeDadosSaida);


for (let i = 0; i < entradaOptionButton.length; i++) {
    entradaOptionButton[i].addEventListener("click", showEntradaModal);
}
for (let i = 0; i < saidaOptionButton.length; i++) {
    saidaOptionButton[i].addEventListener("click", showSaidaModal);
}
for (let i = 0; i < cancelarModalButton.length; i++) {
    cancelarModalButton[i].addEventListener("click", cancelarModal);
}
