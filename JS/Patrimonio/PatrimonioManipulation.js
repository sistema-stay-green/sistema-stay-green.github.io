
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

        case "":
            break;

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
    
        default:
            throw new Error("O filtro possui um valor inválido");
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

    receiveAllPatrimoniosFromServlet(filterCallBack);

}

function showRelatorio(){

    if (!staticDebugMode) {
        receiveAllPatrimoniosFromServlet(relatorioCallBack);
    }
    else
        generateRelatorio(relatorioStaticStash);
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

    if (!staticDebugMode) {
        if (patrimonio !== null) {

            patrimonio.id = currentPatrimonioIdBeingEdited;
            updatePatrimonioIntoTable(patrimonio);
            patrimonio = getPatrimonioFromTable(currentPatrimonioIdBeingEdited);
            currentPatrimonioIdBeingEdited = null;
            sendUpdatedPatrimonio(patrimonio);
        }
    }
    else{
        patrimonio = getPatrimonioFromModal();
        patrimonio.id = currentPatrimonioIdBeingEdited;
        updatePatrimonioIntoTable(patrimonio);
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