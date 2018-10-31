/**
 * Arquivo JavaScript responsável pelas interações dinâmicas da página
 *  e pelo encapsulamento de objetos Patrimônio.
 * @author Mei, Sávio
 */

// --- DOM ---

const patrimonioMenuButton = document.querySelector("button[name='patrimonioMenuButton']");
const addPatrimonioButton = document.querySelector("#addPatrimonioButton");
const entradaOptionButton = document.querySelectorAll("button[name='entradaOptionButton']");
const saidaOptionButton = document.querySelectorAll("button[name='saidaOptionButton']");
const cancelarModalButton = document.querySelectorAll("button[name='cancelarModalButton']");
const enviarEntradaModalButton = document.querySelector("button[name='enviarEntradaModalButton']");
const enviarSaidaModalButton = document.querySelector("button[name='enviarSaidaModalButton']");
//const enviarForm
const statusOptionsDiv = document.querySelector("#statusOptions");
const entradaModal = document.querySelector("#entrada");
const saidaModal = document.querySelector("#saida");
const formModal = document.querySelector("#form");
const patrimonioTable = document.querySelector("#patrimonioTable tbody");

const NA = "N/A";

let editButton = document.querySelectorAll("[id|=edit]");

const editHandler = (id) => {editPatrimonio(id)};

// --- FUNCTIONS ---

/**
 * Mostra uma determinada Modal e esconde as outras
 * @param {string} modal
 * @author Mei
 */
function showModal(modal, id){

    switch (modal) {
        case 'compra':

            formModal.classList.toggle("aparece");
            entradaModal.classList.remove("aparece");
            saidaModal.classList.remove("aparece");
            //formModal.style.minHeight = "34em";
            document.querySelector("#statusOptions").classList.add("esconde");
            document.querySelector("#statusOptions").classList.remove("aparece");
            break;

        case 'entrada':

            entradaModal.classList.toggle("aparece");
            saidaModal.classList.remove("aparece");
            formModal.classList.remove("aparece");
            break;

        case 'saida':

            saidaModal.classList.toggle("aparece");
            entradaModal.classList.remove("aparece");
            formModal.classList.remove("aparece");
            break;

        case 'editar':

            formModal.classList.toggle("aparece");
            entradaModal.classList.remove("aparece");
            saidaModal.classList.remove("aparece");

            //formModal.style.minHeight = "37.9em";
            statusOptionsDiv.classList.remove("esconde");
            statusOptionsDiv.classList.add("aparece");
            
            break;

        default:
            break;
    }
}

/**
 * Esconde todas as div Modal
 * @author Mei
 */
function hideModal(){
    saidaModal.classList.remove("aparece");
    entradaModal.classList.remove("aparece");
    formModal.classList.remove("aparece");
}

function recebeDadosEntrada(){
    entradaModal.classList.remove("aparece");
}

function  recebeDadosSaida(){
    saidaModal.classList.remove("aparece");
}

/**
 * Insere um objeto Patrimonio na tabela principal.
 * @param {Patrimonio} patrimonio
 * @author Mei
 */
function insertPatrimonioIntoTable(patrimonio = new Patrimonio()){

    let tr = document.createElement("tr");
    let td;
    let button;
    let id = patrimonio.id;

    tr.id = "tr-" + patrimonio.id;

    td = document.createElement("td");
    if(patrimonio.id !== undefined)
        td.innerHTML = patrimonio.id;
    else
        td.innerHTML = NA;
    td.id = "id-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.nome !== null && patrimonio.nome !== "")
        td.innerHTML = patrimonio.nome;
    else
        td.innerHTML = NA;
    td.id = "nome-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.tipo !== null && patrimonio.tipo !== "")
        td.innerHTML = patrimonio.tipo;
    else
        td.innerHTML = NA;
    td.id = "tipo-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.finalidade !== null && patrimonio.finalidade !== "")
        td.innerHTML = patrimonio.finalidade;
    else
        td.innerHTML = NA;
    td.id = "finalidade-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.status !== null && patrimonio.status !== "")
        td.innerHTML = patrimonio.status;
    else
        td.innerHTML = NA;
    td.id = "status-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.indiceDepreciacao !== null && patrimonio.indiceDepreciacao !== "")
        td.innerHTML = patrimonio.indiceDepreciacao;
    else
        td.innerHTML = NA;
    td.id = "indiceDepreciacao-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.valorCompra !== null && patrimonio.valorCompra !== "")
        td.innerHTML = patrimonio.valorCompra;
    else
        td.innerHTML = NA;
    td.id = "valorCompra-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.valorAtual !== null && patrimonio.valorAtual !== "")
        td.innerHTML = patrimonio.valorAtual;
    else
        td.innerHTML = NA;
    td.id = "valorAtual-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataCompra !== null)
        td.innerHTML = patrimonio.dataCompra.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    td.id = "dataCompra-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataSaida !== null)
        td.innerHTML = patrimonio.dataSaida.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    td.id = "dataSaida-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataRetorno !== null)
        td.innerHTML = patrimonio.dataRetorno.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    td.id = "dataRetorno-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataBaixa !== null)
        td.innerHTML = patrimonio.dataBaixa.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    td.id = "dataBaixa-" + id;
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
    updateDynamicEventListeners()

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
 * Mostra novamete a tabela e remove a mensagem de aviso.
 * @author Mei
 */
function showPatrimonioTable(){

    document.querySelector("table").style.display = "block";
    document.querySelector("#noResults").remove();
}

/**
 * Recupera as informações da div Modal e as armazena em um objeto Patrimonio.
 * @author Mei
 */
function recoverPatrimonioFromCompraModal(){

    let patrimonio = new Patrimonio();

    patrimonio.nome = document.querySelector("#form [name='nomeInput']").value;
    patrimonio.tipo = document.querySelector("#form [name='tipoInput']").value;
    patrimonio.finalidade = document.querySelector("#form [name='finalidadeInput']").value;
    patrimonio.indiceDepreciacao = document.querySelector("#form [name='indiceDepreciacaoInput']").value;
    patrimonio.valorCompra = document.querySelector("#form [name='valorCompraInput']").value;
    let data = document.querySelector("#form [name='dataCompraInput']").value.split('-');
    if (data[0] !== "") 
        patrimonio.dataCompra = new Date(data[0], data[1], data[2]);
    else
        console.log(new Error("O formato enviado da Data está incorreto!"));
        
    hideModal();
    return patrimonio;
}

/**
 * Faz alguma coisa
 * @param {string} id 
 * @returns {string} nome
 * @author Mei
 */
function editPatrimonio(id){

    let patrimonio = new Patrimonio();
    let data;

    let nomeField = document.querySelector("#nome-" + id).innerHTML;
    let tipoField = document.querySelector("#tipo-" + id).innerHTML;
    let finalidadeField = document.querySelector("#finalidade-" + id).innerHTML;
    let statusField = document.querySelector("#status-" + id).innerHTML;
    let indiceDepreciacaoField = document.querySelector("#indiceDepreciacao-" + id).innerHTML;
    let valorCompraField = document.querySelector("#valorCompra-" + id).innerHTML;
    let valorAtualField = document.querySelector("#valorAtual-" + id).innerHTML;
    let dataCompraField = document.querySelector("#dataCompra-" + id).innerHTML;
    let dataSaidaField = document.querySelector("#dataSaida-" + id).innerHTML;
    let dataRetornoField = document.querySelector("#dataRetorno-" + id).innerHTML;
    let dataBaixaField = document.querySelector("#dataBaixa-" + id).innerHTML;

    if (nomeField !== NA && nomeField !== "")
        patrimonio.nome = nomeField;
    if (tipoField !== NA && tipoField !== "")
        patrimonio.tipo = tipoField;
    if (finalidadeField !== NA && finalidadeField !== "")
        patrimonio.finalidade = finalidadeField;
    if (statusField !== NA && statusField !== "")
        patrimonio.status = statusField;
    if (indiceDepreciacaoField !== NA && indiceDepreciacaoField !== "")
        patrimonio.indiceDepreciacao = indiceDepreciacaoField;
    if (valorCompraField !== NA && valorCompraField !== "")
        patrimonio.valorCompra = valorCompraField;
    finalidadeField
        patrimonio.valorAtual = valorAtualField;

    if (dataCompraField !== NA && dataCompraField !== ""){
        data = dataCompraField.split("-");
        patrimonio.dataCompra = new Date(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
    }
    if (dataSaidaField !== NA && dataSaidaField !== ""){
        data = dataSaidaField.split("-");
        patrimonio.dataSaida = new Date(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
    }
    if (dataRetornoField !== NA && dataRetornoField !== ""){
        data = dataRetornoField.split("-");
        patrimonio.dataRetorno = new Date(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
    }
    if (dataBaixaField !== NA && dataBaixaField !== ""){
        data = dataBaixaField.split("-");
        patrimonio.dataBaixa = new Date(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
    }   
    if (dataSaidaField !== NA && dataSaidaField !== ""){
        data = dataSaidaField.split("-");
        patrimonio.dataSaida = new Date(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
    }

    patrimonio.printToConsole();

    insertPatrimonioIntoModal(patrimonio);
    showModal('editar');
    
}

function insertPatrimonioIntoModal(patrimonio = new Patrimonio()){

    document.querySelector("#form [name='nomeInput']").value = patrimonio.nome;
    document.querySelector("#form [name='tipoInput']").value = patrimonio.tipo;
    document.querySelector("#form [name='finalidadeInput']").value = patrimonio.finalidade;
    document.querySelector("#form [name='indiceDepreciacaoInput']").value = patrimonio.indiceDepreciacao;
    document.querySelector("#form [name='valorCompraInput']").value = patrimonio.valorCompra;

}

// --- EVENT LISTENERS ---

addPatrimonioButton.addEventListener("click", () => {showModal('compra')});
enviarEntradaModalButton.addEventListener("click", recebeDadosEntrada);
enviarSaidaModalButton.addEventListener("click", recebeDadosSaida);

function updateDynamicEventListeners() {

    editButton = document.querySelectorAll("[id|=edit]");
    let id = parseInt(editButton[editButton.length - 1].id.slice(5,6));

    editButton[editButton.length - 1].addEventListener("click", function(e){editHandler(id)});
}

for (let i = 0; i < entradaOptionButton.length; i++) {
    entradaOptionButton[i].addEventListener("click", () => {showModal('entrada')});
}
for (let i = 0; i < saidaOptionButton.length; i++) {
    saidaOptionButton[i].addEventListener("click", () => {showModal('saida')});
}
for (let i = 0; i < cancelarModalButton.length; i++) {
    cancelarModalButton[i].addEventListener("click", hideModal);
}
