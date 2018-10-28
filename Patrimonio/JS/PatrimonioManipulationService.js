
const enviarCompraButton = document.querySelector("#comprar #enviar");
const currentDate = new Date();

function addPatrimonio(patrimonio = new Patrimonio()){

    patrimonio = recoverPatrimonioFromCompraModal();
    patrimonio.status = "EM_POSSE";

    patrimonio.printToConsole();
    patrimonio.calculateValorAtual();
         
    // Send to servlet
    // Receive back from Servlet
    insertPatrimonioIntoTable(patrimonio);
}

enviarCompraButton.addEventListener("click", addPatrimonio);