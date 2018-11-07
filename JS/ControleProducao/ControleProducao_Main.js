 /* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */


window.onload = function () {
    var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?JSON=0&botao=buscar&tipo=produto";

    Request.get(url)
       .then(function(res){
            criaTabela(res, "produto");

        })
       .catch(function(erro){ console.log(erro); return;});
    //Váriaveis

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
            produto = new Produto();
            promises = produto.fazRequisicao();
            setTimeout(function () {
                console.log(promises);
                respostaServlet(promises);
            }, 1000);
            Avisos(0);
            Avisos(4);
        } else {
            Avisos(1);
        }

    });

    document.querySelector("#btnRegistrarInsumo").addEventListener('click', function () {
        console.log(checarInputs());
        if (checarInputs()) {
            insumo = new Insumo();
            promises = insumo.fazRequisicao();
            setTimeout(function () {
                console.log(promises);
                respostaServlet(promises);
            }, 1000);
            Avisos(0);
            Avisos(4);
        } else {
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

    function mudaProduto() {
        if (selecionaNomeProduto.value === "cafe") {
            tdNomeProduto.innerHTML = "KG (Kilograma)";
        } else {
            tdNomeProduto.innerHTML = "L (Litro)";
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
        console.log(cont);
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
