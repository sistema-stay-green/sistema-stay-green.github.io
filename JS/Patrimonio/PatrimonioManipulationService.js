let returnCallback = (patrimonios = []) => {

    clearTableContents();
    hidePatrimonioTable();
    for (const patrimonio of patrimonios) {

        insertPatrimonioIntoTable(patrimonio);
    }
};

function receivePatrimonios(){

    receiveAllPatrimoniosFromServlet(returnCallback);
}

function newPatrimonio(patrimonio = new Patrimonio()){

    patrimonio = getPatrimonioFromModal();
    patrimonio.status = "EM_POSSE";

    // Temporário
    patrimonio.id = lastIdGenerated++;
    
    //compraPatrimonio(patrimonio);
    //sendAddPatrimonioToServlet(patrimonio);
    insertPatrimonioIntoTable(patrimonio);
}

function editPatrimonio(){

    patrimonio = new Patrimonio();
    patrimonio = getPatrimonioFromModal();

    if (currentPatrimonioBeingEdited !== null)
        patrimonio.id = currentPatrimonioBeingEdited;
    
    currentPatrimonioBeingEdited = null;

    patrimonioOld = getPatrimonioFromTable(patrimonio.id);
    patrimonio.status = patrimonioOld.status;
    patrimonio.dataSaida = patrimonioOld.dataSaida;
    patrimonio.dataRetorno = patrimonioOld.dataRetorno;
    patrimonio.dataBaixa = patrimonioOld.dataBaixa;
        
    updatePatrimonioIntoTable(patrimonio);
    //updatePatrimonioInServlet(patrimonio);
}

function deletePatrimonio(id) {
    
    removePatrimonioFromTable(id);
    //deletePatrimonioFromServlet(id);
}
