
const patrimonioTable = document.querySelector("#patrimonioTable tbody");

/**
 * Indenta um objeto Patrimonio na tabela principal.
 * @param {Patrimonio} patrimonio 
 * @author Mei
 */
function insertPatrimonioIntoTable(patrimonio = new Patrimonio()){

    let tr = document.createElement("tr");
    let td;
    let button;

    td = document.createElement("td");
    td.innerHTML = patrimonio.id;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.nome;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.tipo;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.finalidade;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.status;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.indiceDepreciacao;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.valorCompra;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.valorAtual;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.dataCompra.toISOString().slice(0,10).replace("/-/g","");
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.dataSaida.toISOString().slice(0,10).replace("/-/g","");
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.dataRetorno.toISOString().slice(0,10).replace("/-/g","");
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = patrimonio.dataBaixa.toISOString().slice(0,10).replace("/-/g","");
    tr.appendChild(td);

    // Adicionando os botões com id's variáveis. Ex: 'edit-7'
    td = document.createElement("td"); 

    button = document.createElement("button");
    button.id = "edit-" + patrimonio.id;
    button.innerHTML = "Editar";
    td.appendChild(button);

    button = document.createElement("button");
    button.id = "delete-" + patrimonio.id;
    button.innerHTML = "Deletar";
    td.appendChild(button);

    tr.appendChild(td);

    patrimonioTable.appendChild(tr);

}

function addPatrimonio(patrimonio = new Patrimonio()){

    // Send to servlet
    // Receive back from Servlet
    // add to page with 'insertPatrimonioIntoPage' function
}

function hidePatrimonioTable(){

    //let table = document.querySelector("#tabela");
    document.querySelector("table").style.visibility = "hidden";

    let span = document.createElement("span");
    span.id = "noResults";

    let message = document.createElement("p");
    message.innerHTML = "Nenhum Patrimônio foi encontrado.";
    span.appendChild(message);

    message = document.createElement("p");
    message.innerHTML = "Tente mudar o filtro selecionado ou registrar um novo Patrimônio.";
    span.appendChild(message);

    document.querySelector("#tabela").appendChild(span);

}