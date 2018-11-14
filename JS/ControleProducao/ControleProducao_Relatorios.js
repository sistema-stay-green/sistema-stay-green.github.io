var divModalEl = document.querySelector("#divModal");
var divMascaraEl = document.querySelector("#divMascara");
var modalRelatorioHistoricoEl = document.querySelector("#modalRelatorioHistorico");
var modalRelatorioProducaoEl = document.querySelector("#modalRelatorioProducao");
var btnCriaRelatorioEl = document.querySelector("#btnCriaRelatorio");
var btnFechaModalEl = document.querySelector("#btnFechaModal");
var btnRelatorioHistoricoEl = document.querySelector("#btnRelatorioHistorico");
var btnVoltaRelatorioHEl = document.querySelector("#btnVoltaRelatorioH");
var btnFechaRelatorioHEl = document.querySelector("#btnFechaRelatorioH");
var btnRelatorioProducaoEl = document.querySelector("#btnRelatorioProducao");
var btnVoltaRelatorioPEl = document.querySelector("#btnVoltaRelatorioP");
var btnFechaRelatorioPEl = document.querySelector("#btnFechaRelatorioP");

btnCriaRelatorioEl.addEventListener( 'click' , mostraDivModal );
btnFechaModalEl.addEventListener( 'click' ,  mostraDivModal );
btnRelatorioHistoricoEl.addEventListener( 'click' , mostraRelatorioHistorico );
btnVoltaRelatorioHEl.addEventListener( 'click' , mostraRelatorioHistorico );
btnFechaRelatorioHEl.addEventListener( 'click' , fechaRelatorioHistorico );
btnRelatorioProducaoEl.addEventListener( 'click' , mostraRelatorioProducao );
btnVoltaRelatorioPEl.addEventListener( 'click' , mostraRelatorioProducao );
btnFechaRelatorioPEl.addEventListener( 'click' , fechaRelatorioProducao );

function mostraDivModal() {
  divModalEl.classList.toggle("esconde");
  divModalEl.classList.toggle("posDivModal");
  divMascaraEl.classList.toggle("ocultar");
}

function mostraRelatorioHistorico() {
  divModalEl.classList.toggle("esconde");
  divModalEl.classList.toggle("posDivModal");
  modalRelatorioHistoricoEl.classList.toggle("esconde");
  modalRelatorioHistoricoEl.classList.toggle("posDivModal");
}

function fechaRelatorioHistorico() {
  modalRelatorioHistoricoEl.classList.toggle("esconde");
  modalRelatorioHistoricoEl.classList.toggle("posDivModal");
  divMascaraEl.classList.toggle("ocultar");
}

function mostraRelatorioProducao() {
  divModalEl.classList.toggle("esconde");
  divModalEl.classList.toggle("posDivModal");
  modalRelatorioProducaoEl.classList.toggle("esconde");
  modalRelatorioProducaoEl.classList.toggle("posDivModal");
}

function fechaRelatorioProducao() {
  modalRelatorioProducaoEl.classList.toggle("esconde");
  modalRelatorioProducaoEl.classList.toggle("posDivModal");
  divMascaraEl.classList.toggle("ocultar");
}

var selRegistrosEl = document.querySelectorAll("#selRegistros");
var tabProdutosRegistradosEl = document.querySelector("#tabProdutosRegistrados");
var tabInsumosRegistradosEl = document.querySelector("#tabInsumosRegistrados");

selRegistrosEl[0].onchange = function() {
  teste();
};

function teste() {
  if (selRegistrosEl[0].value === "produtosRegistrados") {
    if (tabProdutosRegistradosEl.classList.contains("ocultar")) {
      tabProdutosRegistradosEl.classList.toggle("ocultar");
      tabInsumosRegistradosEl.classList.toggle("ocultar");
    }
    else {
      tabInsumosRegistradosEl.classList.toggle("ocultar");
    }
  }
  else if (selRegistrosEl[0].value === "insumosRegistrados") {
    if (tabInsumosRegistradosEl.classList.contains("ocultar")) {
      tabProdutosRegistradosEl.classList.toggle("ocultar");
      tabInsumosRegistradosEl.classList.toggle("ocultar");
    }
    else {
      tabProdutosRegistradosEl.classList.toggle("ocultar");
    }
  }
  else {
    if (tabProdutosRegistradosEl.classList.contains("ocultar")) {
      tabProdutosRegistradosEl.classList.toggle("ocultar");
    }
    else {
      tabInsumosRegistradosEl.classList.toggle("ocultar");
    }
  }
}
