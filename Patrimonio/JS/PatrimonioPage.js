function showComprarPage(){
    document.querySelector("#header").style.display = "block";
    document.querySelector("#comprar").style.display = "block";
    document.querySelector("#tabela").style.display = "none";
}

function showEntradaPage(){
    document.querySelector("#entrada").classList.toggle("aparece");
    document.querySelector("#saida").classList.remove("aparece");
}

function showSaidaPage(){
    document.querySelector("#saida").classList.toggle("aparece");
    document.querySelector("#entrada").classList.remove("aparece");
}

function showPatrimonioPage(){
    document.querySelector("#header").style.display = "block";
    document.querySelector("#comprar").style.display = "none";
    document.querySelector("#tabela").style.display = "block";
}
