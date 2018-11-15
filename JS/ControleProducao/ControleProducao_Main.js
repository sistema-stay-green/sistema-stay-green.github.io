 /* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */

function fazRequisicaoTabela(tipo){
    let url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscarTodos&tipo=" + tipo;
    Request.get(url)
           .then(function(res){
            criaTabela(res, tipo);
           })
           .catch(function(error){ console.log(error)});
}

window.onload = function () {
    fazRequisicaoTabela("produto");
    fazRequisicaoTabela("insumo");
    var selecionaTabela = document.getElementsByName("selTabela");
    var produtoTabela = document.getElementById("secProduto");
    var insumoTabela = document.getElementById("secInsumo");
    var selecionaNomeProduto = document.getElementById("selNomeProduto");
    var tdNomeProduto = document.getElementById("tdNomeProduto");
    var secAvisos = document.getElementById('secAvisos');
    var produto;
    var promises;

    document.querySelector("#btnRegistarProduto").addEventListener('click', function () {
        if (checarInputs()) {
            produto = encapsulaDados("produto");
            promises = produto.fazRequisicao();
            setTimeout(function () {
                respostaServlet(promises);
                fazRequisicaoTabela("produto");
            }, 1000);
            Avisos(0);
            Avisos(4);
        } 
        else {
            Avisos(1);
        }
        

    });

    document.querySelector("#btnRegistrarInsumo").addEventListener('click', function () {
        if (checarInputs()) {
            insumo = encapsulaDados("insumo");
            promises = insumo.fazRequisicao();
            setTimeout(function () {
                respostaServlet(promises);
                fazRequisicaoTabela("insumo");
            }, 1000);
            Avisos(0);
            Avisos(4);
        }
        else {
            Avisos(1);
        }
        

    });
    //tratamento do retorno
    function respostaServlet(retorno) {
        retorno.then(function (resultado) {
            if (resultado == 2) {
                Avisos(0);
                Avisos(2);
                limparInputs();
            }
        })
                .catch(function (erro) {
                    Avisos(0);
                    Avisos(3);
                });
    }

    selecionaTabela[0].onchange = function () {
        mudaTabela()
    };
    //Função para alternar entre tabela de produtos e tabela de insumos via select
    function mudaTabela() {
        if (selecionaTabela[0].value === "produto") {
            produtoTabela.classList.toggle("ocultar");
            insumoTabela.classList.toggle("ocultar");
        }
        else {
            produtoTabela.classList.toggle("ocultar");
            insumoTabela.classList.toggle("ocultar");
        }
    }

    //Função para alternar entre KG ou L na unidade de medida do produto via select
    selecionaNomeProduto.onchange = function () {
        mudaProduto();
    };
    var seleciona = document.querySelector("#selDescricaoProduto");
    function mudaProduto() {
        if (selecionaNomeProduto.value === "LEITE") {
            tdNomeProduto.innerHTML = "L (Litro)"
        } else {
            tdNomeProduto.innerHTML = "KG (Kilograma)";
        }
    }

    function checarInputs() {
        var inputs = document.querySelectorAll('input');
        var cont = 0;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].clientHeight > 0) {
                if (inputs[i].value === "" || inputs[i].validity.valid === false || inputs[i].value === "NaN") {
                    inputs[i].style.border = "1px solid red";
                    cont++;
                } else {
                    inputs[i].style.border = "none";
                    inputs[i].style.borderBottom = "1px solid black";
                }
            }
        }
        if (cont > 0) {
            cont = 0;
            return false;
        } else {
            cont = 0;
            return true;
        }

    }

    function limparInputs() {
        var inputs = document.querySelectorAll('input');
        var cont = 0;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].clientHeight > 0) {
                inputs[i].value = "";
            }
        }
    }


    function Avisos(i) {
        switch (i) {
            case 0:
                secAvisos.innerHTML = "";
                secAvisos.style.color = "green";
                break;
            case 1:
                secAvisos.innerHTML = "<p>Por favor, preencha os campos obrigatórios para continuar</p>";
                secAvisos.style.color = "red";
                break;
            case 2:
                secAvisos.innerHTML = "<p>Salvo no banco de dados com sucesso</p>";
                secAvisos.style.color = "#1d883a";
                break;
            case 3:
                secAvisos.innerHTML = "<p>A conexão com o banco de dados falhou</p>";
                secAvisos.style.color = "red";
                break;
            case 4:
                secAvisos.innerHTML = "<p>Enviando...</p>";
                secAvisos.style.color = "orange";
                break;
            default:
        }
    }
};

function encapsulaDadosJSON(tipo, JSON){
    var item;
    if(tipo == "produto"){
        item = new Produto();
        item._nomeProduto = JSON._nomeProduto;
        item._descrProduto = JSON._descrProduto;
        item._unidMedProduto = JSON._unidMedProduto;
        item._valorUnitProduto = JSON._valorUnitProduto;
        item._quantEstoqueProduto = JSON._quantEstoqueProduto;
        item._pontoAvisoProduto = JSON._pontoAvisoProduto;
        item.toJSON();
    }
    else {
        item = new Insumo();
        item._nomeInsumo = JSON.nomeInsumo;
        item._finalidadeInsumo = JSON.finalidadeInsumo;
        item._valorCompraInsumo = JSON.valorCompraInsumo;
        item._quantEstoqueInsumo = JSON.quantEstoqueInsumo;
        item._pontoAvisoInsumo = JSON.pontoAvisoInsumo;
        item.toJSON();
    }
    return item;
}

function encapsulaDados(tipo) {
    var item;
    if(tipo == "produto"){
            item = new Produto();

            item._nomeProduto = document.querySelector("#selNomeProduto").value;

            item._descrProduto = document.querySelector("#inpDescricaoProduto").value;

            if (document.querySelector("#tdNomeProduto").innerHTML == "KG (Kilograma)") {
                item._unidMedProduto = "KG";
            } 
            else {
                item._unidMedProduto = "L";
            }
            item._valorUnitProduto = parseFloat(document.querySelector("#inpValorProduto").value);
            item._quantEstoqueProduto = parseInt(document.querySelector("#inpQuantEstoqueProduto").value);

            //verifica se há um ponto de aviso (valor opcional);
            let aux = parseInt(document.querySelector("#inpPontoAvisoProduto").value);
            item._pontoAvisoProduto = (aux == null) ? "" : aux;
            item.toJSON();
    }
    else{
            item = new Insumo();

            item._nomeInsumo = document.querySelector("#inpNomeInsumo").value;
            item._finalidadeInsumo = document.querySelector("#inpFinalidadeInsumo").value;
            item._valorCompraInsumo = parseFloat(document.querySelector("#inpValorUniInsumo").value);
            item._quantEstoqueInsumo = parseInt(document.querySelector("#inpQuantEstoqueInsumo").value);

            //verifica se há um ponto de aviso
            let aux = parseInt(document.querySelector("#inpPontoAvisoInsumo").value);
            item._pontoAvisoInsumo = (aux == null) ? "" : aux;

            item.toJSON();
    }
    return item;
}
