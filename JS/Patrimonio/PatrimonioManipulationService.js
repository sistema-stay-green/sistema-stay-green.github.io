let returnCallback = (patrimonios = []) => {

    clearTableContents();
    hidePatrimonioTable();
    for (const patrimonio of patrimonios) {

        insertPatrimonioIntoTable(patrimonio);
    }
};

let comprarCallback = (patrimonio = new Patrimonio()) => {

    insertPatrimonioIntoTable(patrimonio);
};

function receivePatrimonios(){

    receiveAllPatrimoniosFromServlet(returnCallback);
}

function newPatrimonio(patrimonio = new Patrimonio()){

    patrimonio = getPatrimonioFromModal();
    if (patrimonio !== null) {

        patrimonio.status = "EM_POSSE";
        if (!staticDebugMode)
        sendNewPatrimonio(patrimonio, comprarCallback);
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
        if (currentPatrimonioBeingEdited !== null)
        patrimonio.id = currentPatrimonioBeingEdited;
    
        currentPatrimonioBeingEdited = null;

        patrimonioOld = getPatrimonioFromTable(patrimonio.id);
        patrimonio.status = patrimonioOld.status;
        patrimonio.dataSaida = patrimonioOld.dataSaida;
        patrimonio.dataRetorno = patrimonioOld.dataRetorno;
        patrimonio.dataBaixa = patrimonioOld.dataBaixa;
            
        updatePatrimonioIntoTable(patrimonio);
    }
}

function deletePatrimonio(id) {
    
    removePatrimonioFromTable(id);
    //deletePatrimonioFromServlet(id);
}
