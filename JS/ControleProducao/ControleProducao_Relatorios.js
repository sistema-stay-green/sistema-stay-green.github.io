var btnCriaRelatorioEl = document.getElementById("btnCriaRelatorio");
var btnFechaModalEl = document.getElementById("btnFechaModal");

btnCriaRelatorioEl.addEventListener('click', mostraDivModal);
btnFechaModalEl.addEventListener('click', mostraDivModal);

function mostraDivModal() {
    var divModalEl = document.querySelector("#divModal");
    var divMascaraEl = document.querySelector("#divMascara");
    divModalEl.classList.toggle("esconde");
    divModalEl.classList.toggle("posDivModal");
    divMascaraEl.classList.toggle("ocultar")
}
