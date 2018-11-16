
let returnCallBack = (patrimonios = []) => {
    
    clearTableContents();
    for (const patrimonio of patrimonios) {

        insertPatrimonioIntoTable(patrimonio);
    }
};

let comprarCallBack = (patrimonio = new Patrimonio()) => {

    insertPatrimonioIntoTable(patrimonio);
};

let deletarCallBack = (id, responseCode) => {

    removePatrimonioFromTable(id);
};

let relatorioCallBack = (patrimonios = []) => {
    
    generateRelatorio(patrimonios);
}

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

function receivePatrimonios(){

    receiveAllPatrimoniosFromServlet(returnCallBack);

}

function changeFilter(){

    if (!staticDebugMode)
        receiveAllPatrimoniosFromServlet(filterCallBack);
    else
        filterCallBack(patrimonioStaticStash);
    

}

function showRelatorio(){

    if (!staticDebugMode) {
        receiveAllPatrimoniosFromServlet(relatorioCallBack);
    }
    else
        generateRelatorio(patrimonioStaticStash);
}

function newPatrimonio(patrimonio = new Patrimonio()){

    patrimonio = getPatrimonioFromModal();
    if (patrimonio !== null) {

        patrimonio.status = "EM_POSSE";
        if (!staticDebugMode)
        sendNewPatrimonio(patrimonio, comprarCallBack);
        else {
            patrimonio.id = lastIdGenerated++;
            insertPatrimonioIntoTable(patrimonio);
        }
    }
}

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

function deletePatrimonio(id) {
    
    if (!staticDebugMode)
        sendDeletedPatrimonio(id, deletarCallBack);
    else
        removePatrimonioFromTable(id);
}

relatorioButton.addEventListener("click", showRelatorio);
filtroSelect.addEventListener("change", changeFilter);