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

function receivePatrimonios(){

    receiveAllPatrimoniosFromServlet(returnCallBack);
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

    patrimonio = new Patrimonio();
    patrimonio = getPatrimonioFromModal();
    if (patrimonio !== null) {
    
        updatePatrimonioIntoTable(patrimonio);
        patrimonio = getPatrimonioFromTable(currentPatrimonioIdBeingEdited);
        currentPatrimonioIdBeingEdited = null;
        sendUpdatedPatrimonio(patrimonio);
    }
}

function deletePatrimonio(id) {
    
    if (!staticDebugMode)
        sendDeletedPatrimonio(id, deletarCallBack);
    else
        removePatrimonioFromTable(id);
}
