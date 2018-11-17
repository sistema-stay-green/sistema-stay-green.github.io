var divModalEl = document.querySelector("#divModal");
var divMascaraEl = document.querySelector("#divMascara");
var divModalInsumo = document.querySelector('#divModalInsumo');
var divModalInsumo2 = document.querySelector('#divModalInsumo2');
var divModalCerteza = document.querySelector('#divModalCerteza');
var divModalCerteza2 = document.querySelector('#divModalCerteza2');
var divModalEditarProduto = document.querySelector('#divModalEditarProduto');
var divModalEditarInsumo2 = document.querySelector('#divModalEditarInsumo2');
var divModalEditarInsumo = document.querySelector('#divModalEditarInsumo');
var divModalEditarInsumo2 = document.querySelector('#divModalEditarInsumo2');
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
var btnAbrirModalInsumo = document.querySelector('#btnAbrirModalInsumo');
var btnFecharModalInsumo = document.querySelector('#btnFecharModalInsumo');
var btnLimparModalInsumo = document.querySelector('#btnLimparModalInsumo');
var btnSimModalCerteza = document.querySelector('#btnSimModalCerteza');
var btnNaoModalCerteza = document.querySelector('#btnNaoModalCerteza');
var btnCancelaEditarProduto = document.querySelector('#btnCancelaEditarProduto');
var btnConfirmarEditarProduto = document.querySelector('#btnConfirmarEditarProduto');
var btnCancelarEditarInsumo = document.querySelector('#btnCancelarEditarInsumo');
var btnConfirmarEditarInsumo = document.querySelector('#btnConfirmarEditarInsumo');



btnCriaRelatorioEl.addEventListener( 'click' , mostraDivModal );
btnFechaModalEl.addEventListener( 'click' ,  mostraDivModal );
btnRelatorioHistoricoEl.addEventListener( 'click' , mostraRelatorioHistorico );
btnVoltaRelatorioHEl.addEventListener( 'click' , mostraRelatorioHistorico );
btnFechaRelatorioHEl.addEventListener( 'click' , fechaRelatorioHistorico );
btnRelatorioProducaoEl.addEventListener( 'click' , mostraRelatorioProducao );
btnVoltaRelatorioPEl.addEventListener( 'click' , mostraRelatorioProducao );
btnFechaRelatorioPEl.addEventListener( 'click' , fechaRelatorioProducao );
btnAbrirModalInsumo.addEventListener( 'click' , abreInsumoModal );
btnFecharModalInsumo.addEventListener( 'click' , fechaInsumoModal );
btnLimparModalInsumo.addEventListener( 'click' , limpaInsumoModal );
btnSimModalCerteza.addEventListener( 'click' , funcaoModalCerteza );
btnNaoModalCerteza.addEventListener( 'click' , funcaoModalCerteza );
btnCancelaEditarProduto.addEventListener( 'click' , funcaoEditarProduto );
btnConfirmarEditarProduto.addEventListener( 'click' , funcaoEditarProduto );
btnCancelarEditarInsumo.addEventListener( 'click' , funcaoEditarInsumo );
btnConfirmarEditarInsumo.addEventListener( 'click' , funcaoEditarInsumo );
btnVoltaRelatorioHEl.addEventListener( 'click' , limpaRelatorio );
btnFechaRelatorioHEl.addEventListener( 'click' , limpaRelatorio );
btnVoltaRelatorioPEl.addEventListener( 'click' , limpaRelatorio );
btnFechaRelatorioPEl.addEventListener( 'click' , limpaRelatorio );




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

function abreInsumoModal() {
  divModalInsumo.classList.remove("esconde");
  divMascaraEl.classList.remove("ocultar");
}

function fechaInsumoModal() {
  divModalInsumo.classList.add("esconde");
  divMascaraEl.classList.add("ocultar");
}

function limpaInsumoModal() {
  var inputs = document.querySelectorAll('input');
  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].clientHeight > 0) {
          inputs[i].value = "";
      }
  }
}

function funcaoModalCerteza() {
  divModalCerteza.classList.add("esconde");
  divMascaraEl.classList.add("ocultar");
}

function funcaoEditarProduto() {
  divModalEditarProduto.classList.add("esconde");
  divMascaraEl.classList.add("ocultar");
}

function funcaoEditarInsumo() {
  divModalEditarInsumo.classList.add("esconde");
  divMascaraEl.classList.add("ocultar");
}

function limpaRelatorio(){
  paragrafoInsumos.innerHTML = "";
  paragrafoProdutos.innerHTML = "";
  relCafeBourbon.innerHTML = "";
  relCafeArabica.innerHTML = "";
  relCafeRobusta.innerHTML = "";
}
