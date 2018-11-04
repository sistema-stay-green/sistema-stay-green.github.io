
function addPatrimonio(patrimonio = new Patrimonio()){

    patrimonio = getPatrimonioFromModal();
    patrimonio.status = "EM_POSSE";

    patrimonio.calculateValorAtual();

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
