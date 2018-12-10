/**
 * Script para a manipulação em alto nível de Patrimônios na página.
 * @author Mei Fagundes
 */


/**
 * CallBack para retorno dos Patrimonios pelo AJAX.
 * @callback
 * @param {Patrimonio[]} patrimonios 
 * @author Mei Fagundes
 */
let returnCallBack = (patrimonios = []) => {
    
    clearTableContents();
    for (const patrimonio of patrimonios) {

        insertPatrimonioIntoTable(patrimonio);
    }
};

/**
 * CallBack para alterar o modo de dados da página para estático caso a conexão falhe.
 * @callback
 * @author Mei Fagundes
 */
let connectionErrorCallBack = () => {
    
    enableStaticMode();
};

/**
 * CallBack para compra de um Patrimonio pelo AJAX.
 * @callback
 * @param {Patrimonio} patrimonio
 * @author Mei Fagundes
 */
let comprarCallBack = (patrimonio = new Patrimonio()) => {

    insertPatrimonioIntoTable(patrimonio);
};

/**
 * CallBack para a remoção de um Patrimonio pelo AJAX.
 * @callback
 * @param {int} id 
 * @author Mei Fagundes
 */
let deletarCallBack = (id) => {

    removePatrimonioFromTable(id);
};

/**
 * CallBack para a criação do relatório dos Patrimonios recebidos pelo AJAX.
 * @callback
 * @param {Patrimonio[]} patrimonios 
 * @author Mei Fagundes
 */
let relatorioCallBack = (patrimonios = []) => {
    
    generateRelatorio(patrimonios);
}

/**
 * CallBack para o filtro dos Patrimonios recebidos pelo AJAX.
 * @callback
 * @param {Patrimonio[]} patrimonios 
 * @author Mei Fagundes
 */
let filterCallBack = (patrimonios = []) => {
    
    switch (filtroSelect.value) {

        case "EM_POSSE":
            patrimonios = getPatrimoniosEmPosse(patrimonios);
            break;

        case "EM_MANUTENCAO":
            patrimonios = getPatrimoniosEmManutencao(patrimonios);
            break;

        case "ALUGADO":
            patrimonios = getPatrimoniosAlugados(patrimonios);
            break;

        case "VENDIDO":
            patrimonios = getPatrimoniosVendidos(patrimonios);
            break;

        case "DESCARTADO":
            patrimonios = getPatrimoniosDescartados(patrimonios);
            break;

        case "":
            break;
        default:
            throw new Error("O filtro possui um valor inválido!");
    }

    clearTableContents();
    for (const patrimonio of patrimonios) {

        insertPatrimonioIntoTable(patrimonio);
    }
}

function initData(){
    if (!staticDebugMode) {
        receivePatrimonios();
    }
    else{
        generatePlaceholders();
    }
}

function enableStaticMode(){
    staticDebugMode = true;
    initData();
}

/**
 * Recebe todos os Patrimonios do Server através do AJAX.
 * @author Mei Fagundes
 */
function receivePatrimonios(){

    receiveAllPatrimoniosFromServlet(returnCallBack, connectionErrorCallBack);
}

/**
 * Altera os Patrimonios mostrados na página usando o valor atual do Filtro.
 */
function changeFilter(){

    if (!staticDebugMode){
        receiveAllPatrimoniosFromServlet(filterCallBack);
    }
    else
        filterCallBack(patrimonioStaticStash);
}

/**
 * Gera o relatório com os Patrimonios recebidos.
 * @author Mei Fagundes
 */
function showRelatorio(){

    if (!staticDebugMode) {
        receiveAllPatrimoniosFromServlet(relatorioCallBack);
    }
    else
        generateRelatorio(patrimonioStaticStash);
}

/**
 * Registra um novo Patrimonio comprado.
 * @param {Patrimonios} patrimonio 
 * @author Mei Fagundes
 */
function newPatrimonio(patrimonio = new Patrimonio()){

    patrimonio = getPatrimonioFromModal();
    if (patrimonio !== null) {

        patrimonio.status = "EM_POSSE";
        if (!staticDebugMode){
            sendNewPatrimonio(patrimonio, comprarCallBack);
        }
        else {
            patrimonio.id = lastIdGenerated++;
            patrimonioStaticStash.push(patrimonio);
            insertPatrimonioIntoTable(patrimonio);
        }
    }
}

/**
 * Edita um Patrimonio usando os valores da Modal Formulário.
 * @author Mei Fagundes
 */
function editPatrimonio(){

    patrimonio = getPatrimonioFromModal();

    if (patrimonio !== null) {

        patrimonio.id = currentPatrimonioIdBeingEdited;
        updatePatrimonioIntoTable(patrimonio);

        if (!staticDebugMode) {

            patrimonio = getPatrimonioFromTable(currentPatrimonioIdBeingEdited);
            currentPatrimonioIdBeingEdited = null;
            sendUpdatedPatrimonio(patrimonio);
        }
    }
}

/**
 * Deleta um Patrimonio correspondente ao ID recebido.
 * @param {int} id 
 * @author Mei Fagundes
 */
function deletePatrimonio(id) {
    
    if (!staticDebugMode){

        sendDeletedPatrimonio(id, deletarCallBack);
    }
    else{
        removePatrimonioFromTable(id);

        patrimonioStaticStash.pop(
            patrimonioStaticStash.indexOf(
                patrimonioStaticStash.filter(patrimonio => patrimonio.id == id)[0]));
    }
        
}

relatorioButton.addEventListener("click", showRelatorio);
filtroSelect.addEventListener("change", changeFilter);