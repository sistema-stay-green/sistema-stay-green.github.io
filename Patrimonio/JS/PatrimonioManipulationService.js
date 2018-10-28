
const enviarCompraButton = document.querySelector("#form #enviar");
const currentDate = new Date();

function addPatrimonio(patrimonio = new Patrimonio()){

    patrimonio = recoverPatrimonioFromCompraModal();
    patrimonio.status = "EM_POSSE";

    patrimonio.printToConsole();
    patrimonio.calculateValorAtual();

    sendAddPatrimonioToServlet(patrimonio);
    insertPatrimonioIntoTable(patrimonio);
}

enviarCompraButton.addEventListener("click", addPatrimonio);
