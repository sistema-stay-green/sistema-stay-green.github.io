/*   Autor: Sávio Cardoso
     Grupo 5: patrimônio
     líder: Mei Fagundes */

// --- DOM ---

let patrimonioMenuButton = document.querySelector("button[name='patrimonioMenuButton']");
let comprarMenuButton = document.querySelector("button[name='comprarMenuButton']");
let entradaOptionButton = document.querySelectorAll("button[name='entradaOptionButton']");
let saidaOptionButton = document.querySelectorAll("button[name='saidaOptionButton']");
let cancelarModalButton = document.querySelectorAll("button[name='cancelarModalButton']");
let enviarEntradaModalButton = document.querySelector("button[name='enviarEntradaModalButton']");
let enviarSaidaModalButton = document.querySelector("button[name='enviarSaidaModalButton']");
let entradaModal = document.querySelector("#entrada");
let saidaModal = document.querySelector("#saida");

// --- FUNCTIONS ---

function showComprarPage(){
    document.querySelector("#header").style.display = "block";
    document.querySelector("#comprar").style.display = "block";
    document.querySelector("#tabela").style.display = "none";
}

function showEntradaModal(){
    entradaModal.classList.toggle("aparece");
    saidaModal.classList.remove("aparece");
}

function showSaidaModal(){
    saidaModal.classList.toggle("aparece");
    entradaModal.classList.remove("aparece");
}

function showPatrimonioPage(){
    document.querySelector("#header").style.display = "block";
    document.querySelector("#comprar").style.display = "none";
    document.querySelector("#tabela").style.display = "block";
}

function recebeDadosEntrada(){
    entradaModal.classList.remove("aparece");
}

function  recebeDadosSaida(){
    saidaModal.classList.remove("aparece");
}

function cancelarModal(){
    saidaModal.classList.remove("aparece");
    entradaModal.classList.remove("aparece");
}

// --- EVENT LISTENERS ---

patrimonioMenuButton.addEventListener("click", showPatrimonioPage);
comprarMenuButton.addEventListener("click", showComprarPage);
enviarEntradaModalButton.addEventListener("click", recebeDadosEntrada);
enviarSaidaModalButton.addEventListener("click", recebeDadosSaida);

for (let i = 0; i < entradaOptionButton.length; i++) {
    entradaOptionButton[i].addEventListener("click", showEntradaModal);
}
for (let i = 0; i < saidaOptionButton.length; i++) {
    saidaOptionButton[i].addEventListener("click", showSaidaModal);
}
for (let i = 0; i < cancelarModalButton.length; i++) {
    cancelarModalButton[i].addEventListener("click", cancelarModal);
}