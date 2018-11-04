
function addPatrimonio(patrimonio = new Patrimonio()){

    patrimonio = getPatrimonioFromModal();
    patrimonio.status = "EM_POSSE";

    patrimonio.printToConsole();
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
        
    patrimonio.printToConsole();
    //updatePatrimonio(patrimonio);
}
