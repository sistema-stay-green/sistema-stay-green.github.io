/**
 * Arquivo JavaScript responsável pelas interações dinâmicas da página
 *  e pelo encapsulamento de objetos Patrimônio.
 * @author Mei Fagundes
 */

// --- DOM ---

const patrimonioMenuButton = document.querySelector("button[name='patrimonioMenuButton']");
const addButton = document.querySelector("button[name='addButton']");
const relatorioButton = document.querySelector("button[name='relatorioButton']");
const closeRelatorioButton = document.querySelector("button[name='closeRelatorio']");
const printRelatorioButton = document.querySelector("button[name='printRelatorio']");
const entradaOptionButton = document.querySelector("button[name='entradaOptionButton']");
const saidaOptionButton = document.querySelector("button[name='saidaOptionButton']");
const cancelarModalButton = document.querySelector("button[name='cancelarModalButton']");
const enviarButton = document.querySelector("#form button[name='enviar']");
const enviarSaidaModalButton = document.querySelector("button[name='enviarSaidaModalButton']");
const statusOptionsDiv = document.querySelector("#statusOptions");
const entradaDiv = document.querySelector("[name=entrada]");
const saidaDiv = document.querySelector("[name=saida]");
const formModal = document.querySelector("#form");
const relatorioModal = document.querySelector("#relatorio");
const patrimonioTable = document.querySelector("#patrimonioTable tbody");
const filtroSelect = document.querySelector("#filtroSelect");
const mascara = document.querySelector(".mascara");
let editButton = document.querySelectorAll("[id|=edit]");

// --- VAR ---

const NA = "N/A";

let currentPatrimonioIdBeingEdited = null;
let isEntradaBeingEdited = false;
let isSaidaBeingEdited = false;
let isErrorVisible = false;

// --- FUNCTIONS ---

/**
 * Mostra uma determinada Modal e esconde as outras
 * @param {string} modal
 * @author Mei Fagundes
 */
function showModal(modal){

    mascara.classList.add("aparece-fundo-escuro");
    hideEditOptions();

    switch (modal) {
        case 'compra':

            formModal.classList.remove("esconde");
            statusOptionsDiv.classList.add("esconde");
            statusOptionsDiv.style.display = "none"
            enviarButton.removeEventListener("click", editPatrimonio);
            enviarButton.addEventListener("click", newPatrimonio);
            document.querySelector("#form [name='dataSaidaInput']").value = "";
            document.querySelector("#form [name='dataEntradaInput']").value = "";
            clearMainModal();
            break;

        case 'editar':

            formModal.classList.remove("esconde");
            statusOptionsDiv.classList.remove("esconde");
            statusOptionsDiv.style.display = "block";
            enviarButton.removeEventListener("click", newPatrimonio);
            enviarButton.addEventListener("click", editPatrimonio);
            
            break;

        case 'relatorio':
            relatorioModal.classList.remove("esconde");

        default:
            break;
    }
}

/**
 * Recebe uma string correspondente à opção a ser mostrada.
 * @param {String} key 
 * @author Mei Fagundes
 */
function showEditOptions(key){

    switch (key) {
        case 'entrada':
            if(entradaDiv.style.display == "block"){
                entradaDiv.style.display = "none";
                entradaDiv.classList.add("esconde");
            }else{
                entradaDiv.style.display = "block";
                entradaDiv.classList.remove("esconde");
            }
            saidaDiv.classList.add("esconde");
            saidaDiv.style.display = "none";
            isEntradaBeingEdited = !isEntradaBeingEdited;
            isSaidaBeingEdited = false;
            break;

        case 'saida':
            if(saidaDiv.style.display == "block"){
                saidaDiv.classList.add("esconde");
                saidaDiv.style.display = "none";
            }else{
                saidaDiv.classList.remove("esconde");
                saidaDiv.style.display = "block";
            }
            entradaDiv.classList.add("esconde");
            entradaDiv.style.display = "none";
            isEntradaBeingEdited = false;
            isSaidaBeingEdited = !isSaidaBeingEdited;
            break;

        default:
            break;
    }
}

/**
 * Exibe a Modal de Erro
 * @param {int} cod Código de erro a ser mostrado.
 * @author Mei Fagundes
 */
function showError(cod){

    if (isErrorVisible){
        setTimeout(() => {
            showError(cod);
        }, 4000)
        return;
    }

    let message = "<span class='bold'>ERRO! </span>";

    switch (cod) {
        case 0:
            message += "A Conexão com o servidor não pôde ser estabelecida.";
            break;

        case 1:
            message += "Patrimônio não encontrado no Server.";
            break;

        case 2:
            message += "Parametros inválidos enviados.";
            break;

        case 3:
            message += "Todos os campos devem estar preenchidos para enviar.";
            break;

        case 4:
            message += "Os valores inseridos são inválidos.";
            break;

        case 5:
            message += "Nenhum Patrimônio registrado para gerar o relatório.";
            break;

        case 6:
            message += "A Data de Compra deve ser menor que a Data de Retorno/Saída.";
            break;

        default:
            throw new Error("Código de erro inválido!");
    }

    errorModal.innerHTML = message;
    isErrorVisible = true;
    errorModal.classList.remove("esconde");
    setTimeout(() => {
        if (isErrorVisible){
            isErrorVisible = false;
            errorModal.classList.add("esconde");
        }
    }, 4000);
}

/**
 * Esconde as opções de edição.
 * @author Mei Fagundes
 */
function hideEditOptions(){

    entradaDiv.classList.add("esconde");
    entradaDiv.style.display = "none";
    saidaDiv.classList.add("esconde");
    saidaDiv.style.display = "none";
}

/**
 * Esconde todas as div Modal
 * @author Mei Fagundes
 */
function hideModal(){

    mascara.classList.remove("aparece-fundo-escuro");
    formModal.classList.add("esconde");
    relatorioModal.classList.add("esconde");
    clearEmptyFieldsWarning();
    isEntradaBeingEdited = false;
    isSaidaBeingEdited = false;
}

/**
 * Insere um objeto Patrimonio na tabela principal.
 * @param {Patrimonio} patrimonio
 * @author Mei Fagundes
 */
function insertPatrimonioIntoTable(patrimonio = new Patrimonio()){

    let tr = document.createElement("tr");
    let td;
    let button;
    let id = patrimonio.id;

    showPatrimonioTable();

    tr.setAttribute("name","patrimonio-" + patrimonio.id);

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
 * Limpa a tabela e a esconde.
 * @author Mei Fagundes
 */
function clearTableContents() {

    patrimonioTable.innerHTML = "";
    hidePatrimonioTable();
}

/**
 * Atualiza as informações de um Patrimonio na tabela.
 * @param {Patrimonio} patrimonio
 * @author Mei Fagundes
 */
function updatePatrimonioIntoTable(patrimonio = new Patrimonio()){

    let id = patrimonio.id;

    if(patrimonio.nome !== null && patrimonio.nome !== "")
        document.querySelector("#nome-" + id).innerHTML = patrimonio.nome;
    else
        document.querySelector("#nome-" + id).innerHTML = NA;

    if(patrimonio.tipo !== null && patrimonio.tipo !== "")
        document.querySelector("#tipo-" + id).innerHTML = patrimonio.tipo;
    else
        document.querySelector("#tipo-" + id).innerHTML = NA;

    if(patrimonio.finalidade !== null && patrimonio.finalidade !== "")
        document.querySelector("#finalidade-" + id).innerHTML = patrimonio.finalidade;
    else
        document.querySelector("#finalidade-" + id).innerHTML = NA;

    if(patrimonio.status !== null && patrimonio.status !== "")
        document.querySelector("#status-" + id).innerHTML = patrimonio.status;
    else
        document.querySelector("#status-" + id).innerHTML = NA;

    if(patrimonio.indiceDepreciacao !== null && patrimonio.indiceDepreciacao !== "")
        document.querySelector("#indiceDepreciacao-" + id).innerHTML = patrimonio.indiceDepreciacao;
    else
        document.querySelector("#indiceDepreciacao-" + id).innerHTML = NA;

    if(patrimonio.valorCompra !== null && patrimonio.valorCompra !== "")
        document.querySelector("#valorCompra-" + id).innerHTML = patrimonio.valorCompra;
    else
        document.querySelector("#valorCompra-" + id).innerHTML = NA;

    if(patrimonio.valorAtual !== null && patrimonio.valorAtual !== "")
        document.querySelector("#valorAtual-" + id).innerHTML = patrimonio.valorAtual;
    else
        document.querySelector("#valorAtual-" + id).innerHTML = NA;

    if(patrimonio.dataCompra !== null && patrimonio.dataCompra !== "")
        document.querySelector("#dataCompra-" + id).innerHTML = patrimonio.dataCompra
        .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#dataCompra-" + id).innerHTML = NA;

    if(patrimonio.dataSaida !== null && patrimonio.dataSaida !== "")
        document.querySelector("#dataSaida-" + id).innerHTML = patrimonio.dataSaida
        .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#dataSaida-" + id).innerHTML = NA;

    if(patrimonio.dataRetorno !== null && patrimonio.dataRetorno !== "")
        document.querySelector("#dataRetorno-" + id).innerHTML = patrimonio.dataRetorno
        .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#dataRetorno-" + id).innerHTML = NA;

    if(patrimonio.dataBaixa !== null && patrimonio.dataBaixa !== "")
        document.querySelector("#dataBaixa-" + id).innerHTML = patrimonio.dataBaixa
        .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#dataBaixa-" + id).innerHTML = NA;
}

/**
 * Remove um Patrimonio da tabela correspondente ao ID recebido.
 * @param {Integer} id 
 * @author Mei Fagundes
 */
function removePatrimonioFromTable(id){

    document.querySelector("tbody [name=patrimonio-"+ id +"]").remove();

    if (isPatrimoniosEmpty())
        hidePatrimonioTable();
}

function isPatrimoniosEmpty(){
    return document.querySelectorAll("tbody tr")[0] == null;
}

/**
 * Esconde a tabela principal e a substui por uma mensagem de aviso
 * @author Mei Fagundes
 */
function hidePatrimonioTable(){

    document.querySelector("table").style.display = "none";
    document.querySelector("#noResults").style.display = "block";
}

/**
 * Mostra novamete a tabela e remove a mensagem de aviso.
 * @author Mei Fagundes
 */
function showPatrimonioTable(){

    document.querySelector("table").style.display = "block";
    document.querySelector("#noResults").style.display = "none";
}

/**
 * Atualiza a página com o filtro seleionado no HTML.
 */
function updateFilterOnTable(){

    receiveAllPatrimoniosFromServlet();

    switch (filtroSelect.value) {

        case "":

            break;

        case "EM_POSSE":

            break;

        case "EM_MANUTENCAO":

            break;

        case "ALUGADO":

            break;

        case "VENDIDO":

            break;

        case "VENDIDO":

            break;

        default:
            break;
    }
}

/**
 * Recupera as informações da div Modal e as armazena em um objeto Patrimonio.
 * @returns {Patrimonio} Retorna um objeto Patrimonio preenchido.
 * @author Mei Fagundes
 */
function getPatrimonioFromModal(){

    let patrimonio = new Patrimonio();
    dataCompra = document.querySelector("#form [name='dataCompraInput']").value.split('-');
    warnUserAboutEmptyInputs();

    if (isModalFilled()) {

        if (document.querySelector("#form [name='indiceDepreciacaoInput']").value >= 100) {
            showError(4);
            return null;
        }
        patrimonio.nome = document.querySelector("#form [name='nomeInput']").value;
        patrimonio.tipo = document.querySelector("#form [name='tipoInput']").value;
        patrimonio.finalidade = document.querySelector("#form [name='finalidadeInput']").value;
        patrimonio.indiceDepreciacao = document.querySelector("#form [name='indiceDepreciacaoInput']").value;
        patrimonio.valorCompra = document.querySelector("#form [name='valorCompraInput']").value;
        patrimonio.dataCompra = new Date(dataCompra[0], dataCompra[1] - 1, dataCompra[2]);
        patrimonio.status = document.querySelector("#form [name='tipoSaidaInput']").value;


        dataEntrada = document.querySelector("#form [name='dataEntradaInput']").value.split('-');
        dataSaida = document.querySelector("#form [name='dataSaidaInput']").value.split('-');

        if (dataEntrada[0] !== "") {

            let dataEntradaTmp = new Date(dataEntrada[0], dataEntrada[1] - 1, dataEntrada[2]);
            
            if (patrimonio.dataCompra.getTime() < dataEntradaTmp.getTime()) {

                patrimonio.dataRetorno = dataEntradaTmp;
                document.querySelector("#form [name='dataEntradaInput']").classList.remove("inputVazio");
                document.querySelector("#form [name='dataCompraInput']").classList.remove("inputVazio");
            }
            else{
                document.querySelector("#form [name='dataEntradaInput']").classList.add("inputVazio");
                document.querySelector("#form [name='dataCompraInput']").classList.add("inputVazio");
                
                showError(6);
                return null;
            }
        }

        if (dataSaida[0] !== "") {

            let dataSaidaTmp = new Date(dataSaida[0], dataSaida[1] - 1, dataSaida[2]);

            if (patrimonio.status == "DESCARTADO") {

                if (patrimonio.dataCompra.getTime() < dataSaidaTmp.getTime()) {

                    patrimonio.dataBaixa = dataSaidaTmp;
                    patrimonio.dataSaida = dataSaidaTmp;
                    document.querySelector("#form [name='dataSaidaInput']").classList.remove("inputVazio");
                    document.querySelector("#form [name='dataCompraInput']").classList.remove("inputVazio");
                }
                else{

                    document.querySelector("#form [name='dataSaidaInput']").classList.add("inputVazio");
                    document.querySelector("#form [name='dataCompraInput']").classList.add("inputVazio");
                    showError(6);
                    return null;
                }
            }
            else{

                if (patrimonio.dataCompra.getTime() < dataSaidaTmp.getTime()) {

                    patrimonio.dataSaida = dataSaidaTmp;
                    document.querySelector("#form [name='dataSaidaInput']").classList.remove("inputVazio");
                    document.querySelector("#form [name='dataCompraInput']").classList.remove("inputVazio");
                }
                else{

                    document.querySelector("#form [name='dataSaidaInput']").classList.add("inputVazio");
                    document.querySelector("#form [name='dataCompraInput']").classList.add("inputVazio");
                    showError(6);
                    return null;
                }
            }
        }

        hideModal();
        return patrimonio;
    }
    else{
        showError(3);
        return null;
    }
}

/**
 * Retorna se a Modal está totalmente preenchida.
 * @returns {Boolean} 
 * @author Mei Fagundes
 */
function isModalFilled(){

    if (document.querySelector("#form [name='nomeInput']").value == "" ||
        document.querySelector("#form [name='tipoInput']").value == "" ||
        document.querySelector("#form [name='finalidadeInput']").value == "" ||
        document.querySelector("#form [name='indiceDepreciacaoInput']").value == "" ||
        document.querySelector("#form [name='valorCompraInput']").value == "")
            return false


    dataCompra = document.querySelector("#form [name='dataCompraInput']").value.split('-');

    for (const dataField of dataCompra) {
    
        if (dataField == "")
            return false;
    }

    if (isEntradaBeingEdited) {
        dataEntrada = document.querySelector("#form [name='dataEntradaInput']").value.split('-');

        for (const dataField of dataEntrada) {
            
            if (dataField == "")
                return false;
        }
    }

    if (isSaidaBeingEdited) {
        dataSaida = document.querySelector("#form [name='dataSaidaInput']").value.split('-');

        for (const dataField of dataSaida) {
        
            if (dataField == "")
                return false;
        }
    }

    return true;
}

/**
 * Avisa na Modal quais os inputs que não estão preenchidos.
 * @author Mei Fagundes
 */
function warnUserAboutEmptyInputs(){

    warnUserAboutEmptyFieldsIterateText(document.querySelector("#form [name='nomeInput']"));
    warnUserAboutEmptyFieldsIterateText(document.querySelector("#form [name='finalidadeInput']"));
    warnUserAboutEmptyFieldsIterateText(document.querySelector("#form [name='indiceDepreciacaoInput']"));
    warnUserAboutEmptyFieldsIterateText(document.querySelector("#form [name='valorCompraInput']"));

    dataCompra = document.querySelector("#form [name='dataCompraInput']");
    warnUserAboutEmptyFieldsIterateDate(dataCompra);

    if (isEntradaBeingEdited) {
        dataEntrada = document.querySelector("#form [name='dataEntradaInput']");
        warnUserAboutEmptyFieldsIterateDate(dataEntrada);
    }

    if (isSaidaBeingEdited) {
        dataSaida = document.querySelector("#form [name='dataSaidaInput']");
        warnUserAboutEmptyFieldsIterateDate(dataSaida);
    }

}

/**
 * Método auxiliar do warnUserAboutEmptyInputs para manipular Inputs Data.
 * @param {HTMLElement} element 
 * @author Mei Fagundes
 */
function warnUserAboutEmptyFieldsIterateDate(element) {

    dataFieldArray = element.value.split('-');
    
    for (const dataField of dataFieldArray) {
        
        if (dataField == "")
            element.classList.add("inputVazio");
        else
            element.classList.remove("inputVazio");
    }
}

/**
 * Método auxiliar do warnUserAboutEmptyInputs para manipular Inputs Text.
 * @param {HTMLElement} element 
 * @author Mei Fagundes
 */
function warnUserAboutEmptyFieldsIterateText(element) {
    
    if (element.value == ""){
        element.classList.add("inputVazio");
        element.placeholder = "Campo obrigatório!";
    }
    else{
        element.classList.remove("inputVazio");
        element.placeholder = "Digite...";
    }
}

/**
 * Limpa os avisos de Inputs vazios na Modal.
 * @author Mei Fagundes
 */
function clearEmptyFieldsWarning(){

    document.querySelector("#form [name='nomeInput']").classList.remove("inputVazio");
    document.querySelector("#form [name='nomeInput']").placeholder = "Digite...";
    document.querySelector("#form [name='finalidadeInput']").classList.remove("inputVazio");
    document.querySelector("#form [name='finalidadeInput']").placeholder = "Digite...";
    document.querySelector("#form [name='indiceDepreciacaoInput']").classList.remove("inputVazio");
    document.querySelector("#form [name='indiceDepreciacaoInput']").placeholder = "Digite...";
    document.querySelector("#form [name='valorCompraInput']").classList.remove("inputVazio");
    document.querySelector("#form [name='valorCompraInput']").placeholder = "Digite...";
    document.querySelector("#form [name='dataCompraInput']").classList.remove("inputVazio");
    document.querySelector("#form [name='dataEntradaInput']").classList.remove("inputVazio");
    document.querySelector("#form [name='dataSaidaInput']").classList.remove("inputVazio");
}

/**
 * Retorna um objeto Patrimonio da Tabela com o Id fornecido.
 * @param {string} id
 * @returns {string} nome
 * @author Mei Fagundes
 */
function getPatrimonioFromTable(id){

    let patrimonio = new Patrimonio();
    let data;

    let idField = document.querySelector("#id-" + id).innerHTML;
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

    if (idField !== NA && idField !== "")
        patrimonio.id = idField;
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
        patrimonio.dataCompra = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }
    if (dataSaidaField !== NA && dataSaidaField !== ""){
        data = dataSaidaField.split("-");
        patrimonio.dataSaida = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }
    if (dataRetornoField !== NA && dataRetornoField !== ""){
        data = dataRetornoField.split("-");
        patrimonio.dataRetorno = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }
    if (dataBaixaField !== NA && dataBaixaField !== ""){
        data = dataBaixaField.split("-");
        patrimonio.dataBaixa = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }
    if (dataSaidaField !== NA && dataSaidaField !== ""){
        data = dataSaidaField.split("-");
        patrimonio.dataSaida = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }

    return patrimonio;
}

/**
 * Prepara a edição do Patrimonio correspondente ao Id recebido colocando-o na Modal Formulário.
 * @param {int} id 
 * @author Mei Fagundes
 */
function setupPatrimonioEdit(id){

    patrimonio = getPatrimonioFromTable(id);
    clearMainModal();
    insertPatrimonioIntoModal(patrimonio);
    currentPatrimonioIdBeingEdited = id;
    showModal('editar');
}

/**
 * Insere os dados do objeto Patrimonio na Div Modal
 * @param {Patrimonio} patrimonio
 * @author Mei Fagundes
 */
function insertPatrimonioIntoModal(patrimonio = new Patrimonio()){

    document.querySelector("#form [name='nomeInput']").value = patrimonio.nome;
    document.querySelector("#form [name='tipoInput']").value = patrimonio.tipo;
    document.querySelector("#form [name='finalidadeInput']").value = patrimonio.finalidade;
    document.querySelector("#form [name='indiceDepreciacaoInput']").value = patrimonio.indiceDepreciacao;
    document.querySelector("#form [name='valorCompraInput']").value = patrimonio.valorCompra;
    document.querySelector("#form [name='tipoSaidaInput']").value = patrimonio.status;

    if(patrimonio.dataCompra !== null)
        document.querySelector("#form [name='dataCompraInput']").value = patrimonio.dataCompra
            .toISOString().slice(0,10).replace("/-/g","");

    if(patrimonio.dataRetorno !== null)
        document.querySelector("#form [name='dataEntradaInput']").value = patrimonio.dataRetorno
            .toISOString().slice(0,10).replace("/-/g","");

    if(patrimonio.dataSaida !== null)
        document.querySelector("#form [name='dataSaidaInput']").value = patrimonio.dataSaida
            .toISOString().slice(0,10).replace("/-/g","");

}

/**
 * Limpa a Modal Formulário
 * @author Mei Fagundes
 */
function clearMainModal(){

    document.querySelector("#form [name='nomeInput']").value = null;
    document.querySelector("#form [name='tipoInput']").value = "MAQUINA";
    document.querySelector("#form [name='finalidadeInput']").value = null;
    document.querySelector("#form [name='indiceDepreciacaoInput']").value = null;
    document.querySelector("#form [name='valorCompraInput']").value = null;
    document.querySelector("#form [name='dataCompraInput']").value = null;
    document.querySelector("#form [name='dataSaidaInput']").value = null;
    document.querySelector("#form [name='dataEntradaInput']").value = null;

}

/**
 * Gera um relatório com os Patrimonios recebidos.
 * @param {Patrimonio[]} patrimonios 
 * @author Mei Fagundes
 */
function generateRelatorio(patrimonios = []){

    if (patrimonios.length !== 0) {

        let relatorio = document.querySelector("#relatorio div:nth-child(1)");
        let h1 = document.createElement("h1");
        let h3;
        let patrimoniosTemp;

        // Título
        relatorio.innerHTML = "";
        h1.innerHTML = "Relatório dos Patrimônios registrados";
        relatorio.appendChild(h1);

        // EM_POSSE

        patrimoniosTemp = getPatrimoniosEmPosse(patrimonios);
        if (patrimoniosTemp !== null) {
            h3 = document.createElement("h2");
            h3.innerHTML = "Patrimônios em Posse:";
            relatorio.appendChild(h3);
            patrimoniosTemp = generateUlForRelatorio(patrimoniosTemp);
            relatorio.appendChild(patrimoniosTemp);
        }

        // EM_MANUTENCAO

        patrimoniosTemp = getPatrimoniosEmManutencao(patrimonios);
        if (patrimoniosTemp !== null) {
            h3 = document.createElement("h2");
            h3.innerHTML = "Patrimônios em Manutenção:";
            relatorio.appendChild(h3);
            patrimoniosTemp = generateUlForRelatorio(patrimoniosTemp);
            relatorio.appendChild(patrimoniosTemp);
        }

        // ALUGADO

        patrimoniosTemp = getPatrimoniosAlugados(patrimonios);
        if (patrimoniosTemp !== null) {
            h3 = document.createElement("h2");
            h3.innerHTML = "Patrimônios Alugados:";
            relatorio.appendChild(h3);
            patrimoniosTemp = generateUlForRelatorio(patrimoniosTemp);
            relatorio.appendChild(patrimoniosTemp);
        }

        // VENDIDO

        patrimoniosTemp = getPatrimoniosVendidos(patrimonios);
        if (patrimoniosTemp !== null) {
            h3 = document.createElement("h2");
            h3.innerHTML = "Patrimônios Vendidos:";
            relatorio.appendChild(h3);
            patrimoniosTemp = generateUlForRelatorio(patrimoniosTemp);
            relatorio.appendChild(patrimoniosTemp);
        }

        // DESCARTADO

        patrimoniosTemp = getPatrimoniosDescartados(patrimonios);
        if (patrimoniosTemp !== null) {
            h3 = document.createElement("h2");
            h3.innerHTML = "Patrimônios Descartados:";
            relatorio.appendChild(h3);
            patrimoniosTemp = generateUlForRelatorio(patrimoniosTemp);
            relatorio.appendChild(patrimoniosTemp);
        }

        showModal('relatorio');
    }
    else
        showError(5);
}

/**
 * Método auxiliar de generateRelatorio para gerar as Ul's do relatório da página.
 * @param {Patrimonio[]} patrimonios 
 * @author Mei Fagundes
 */
function generateUlForRelatorio(patrimonios = []){

    if (patrimonios !== null) {

        let ul, li, p;
        ul = document.createElement("ul");

        for (const patrimonio of patrimonios) {

            li = document.createElement("li");

            // Id | Nome
            p = document.createElement("p");
            p.innerHTML = "<span class='bold'>#" + patrimonio.id + "</span>  |  " + patrimonio.nome;
            li.appendChild(p);

            // Tipo
            p = document.createElement("p");
            p.innerHTML = "<span class='bold'>Tipo: </span>" + patrimonio.tipo;
            li.appendChild(p);

            // Finalidade
            p = document.createElement("p");
            p.innerHTML = "<span class='bold'>Finalidade: </span>" + patrimonio.finalidade;
            li.appendChild(p);

            // Índice de depreciação
            p = document.createElement("p");
            p.innerHTML = "<span class='bold'>Índice de depreciação: </span>" + patrimonio.indiceDepreciacao + "%/ano";
            li.appendChild(p);

            // Valor da Compra
            p = document.createElement("p");
            p.innerHTML = "<span class='bold'>Valor da Compra: </span>R$" + patrimonio.valorCompra;
            li.appendChild(p);

            // Valor Atual
            p = document.createElement("p");
            p.innerHTML = "<span class='bold'>Valor Atual: </span>R$" + patrimonio.valorAtual;
            li.appendChild(p);

            // Data da Compra
            p = document.createElement("p");
            p.innerHTML = "<span class='bold'>Data da Compra: </span>" + patrimonio.dataCompraString;
            li.appendChild(p);

            // Data da Saída
            if (patrimonio.dataSaida !== null) {
                p = document.createElement("p");
                p.innerHTML = "<span class='bold'>Data da Saída: </span>" + patrimonio.dataSaidaString;
                li.appendChild(p);
            }

            // Data do Retorno
            if (patrimonio.dataRetorno !== null) {
                p = document.createElement("p");
                p.innerHTML = "<span class='bold'>Data do Retorno: </span>" + patrimonio.dataRetornoString;
                li.appendChild(p);
            }

            // Data da Baixa
            if (patrimonio.dataBaixa !== null) {
                p = document.createElement("p");
                p.innerHTML = "<span class='bold'>Data da Baixa: </span>" + patrimonio.dataBaixaString;
                li.appendChild(p);
            }

            p = document.createElement("p");
            p.innerHTML = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ";
            li.appendChild(p);

            ul.appendChild(li);
        }

        return ul;
    }
}

/**
 * Envia o relatório gerado para Impressão.
 * @author Mei Fagundes
 */
function printRelatorio() {

    let content = document.querySelector("#relatorio").innerHTML;
    let printWindow = window.open('', 'Print', 'height=768,width=1024');

    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write("<link rel='stylesheet' type='text/css' media='screen' href='CSS/Patrimonio/Print.css'/>");
    printWindow.document.write('</head><body onafterprint="self.close()">');
    printWindow.document.write(content);
    printWindow.document.write('<script type="text/javascript">' + 'window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 200) };' + '</script>');
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.focus();
}

// --- EVENT LISTENERS ---

addButton.addEventListener("click", () => {showModal('compra')});
closeRelatorioButton.addEventListener("click", hideModal);
printRelatorioButton.addEventListener("click", printRelatorio);
entradaOptionButton.addEventListener("click", () => {showEditOptions('entrada')})
saidaOptionButton.addEventListener("click", () => {showEditOptions('saida')})
cancelarModalButton.addEventListener("click", hideModal)

function updateDynamicEventListeners() {

    deleteButton = document.querySelectorAll("[id|=delete]");
    editButton = document.querySelectorAll("[id|=edit]");

    let id = parseInt(deleteButton[deleteButton.length - 1].id.slice(7));
    deleteButton[deleteButton.length - 1].addEventListener("click", () => {deletePatrimonio(id)});

    id = parseInt(editButton[editButton.length - 1].id.slice(5));
    editButton[editButton.length - 1].addEventListener("click", () => {setupPatrimonioEdit(id)});
}