 /* Autor: Diego Demétrio
 Grupo 1: Controle de produção
 líder: Arthur Marcolino */
function fazRequestTabela(url, tipo){

  Request.get(url)
         .then(function(res){ criaTabela(res, tipo); })
         .catch(function(error){ console.log(error); });
}
window.onload = function () {
    let url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=buscarTodos&tipo=produto";

    fazRequestTabela(url, "produto");
    fazRequestTabela(url, "insumo");

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
                console.log(promises);
                respostaServlet(promises);
            }, 1000);
            Avisos(0);
            Avisos(4);
        } 
        else {
            Avisos(1);
        }
        fazRequestTabela(url, "produto");
    });

    document.querySelector("#btnRegistrarInsumo").addEventListener('click', function () {
        console.log(checarInputs());
        if (checarInputs()) {
            insumo = encapsulaDados("insumo");
            promises = insumo.fazRequisicao();
            setTimeout(function () {
                console.log(promises);
                respostaServlet(promises);
            }, 1000);
            Avisos(0);
            Avisos(4);
        }
        else {
            Avisos(1);
        }
        fazRequestTabela(url, "insumo");

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
        if (selecionaNomeProduto.value === "cafe") {
            tdNomeProduto.innerHTML = "KG (Kilograma)";
            seleciona.innerHTML = "<option value=\"bourbon\">Bourbon</option>" +
                                  "<option value=\"robusta\">Robusta</option>" +
                                  "<option value=\"arabica\">Arabica</option>";

        } else {
            tdNomeProduto.innerHTML = "L (Litro)";
            seleciona.innerHTML = "<option value=\"integral\">Integral</option>"
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
                    console.log(inputs);
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

function encapsulaDadosJSON(tipo, JSON){
    var item;
    if(tipo == "produto"){
        item = new Produto();
        item._nome = JSON.nome;
        item._descricao = JSON.descricao;
        item._unMedida = JSON.unMedida;
        item._valorProduto = JSON.valorProduto;
        item._estoque = JSON.estoque;
        item._pontoAviso = JSON.pontoAviso;
        item.toJSON();
    }
    else {
        item = new Insumo();
        item._nome = JSON.nome;
        item._finalidade = JSON.descricao;
        item._valorUnidade = JSON.unMedida;
        item._estoque = JSON.valorProduto;
        item._pontoAviso = JSON.pontoAviso;
        item.toJSON();
    }
}
function encapsulaDados(tipo) {
    var item;
        if(tipo == "produto"){
            var item = new Produto();

            item._nome = document.querySelector("#selNomeProduto").value;

            item._descricao = document.querySelector("#inpDescricaoProduto").value;

            if (document.querySelector("#tdNomeProduto").innerHTML == "KG (Kilograma)") {
                item._unMedida = "KG";
            } 
            else {
                item._unMedida = "L";
            }
            item._valorProduto = parseFloat(document.querySelector("#inpValorProduto").value);
            item._estoque = parseInt(document.querySelector("#inpQuantEstoqueProduto").value);

            //verifica se há um ponto de aviso (valor opcional);
            let aux = parseInt(document.querySelector("#inpPontoAvisoProduto").value);
            item._pontoAviso = (aux == null) ? "" : aux;
            console.log("aux = " + aux);
            item.toJSON();
        }
        else{
            var insumo = new Insumo();

            item._nome = document.querySelector("#inpNomeInsumo").value;
            item._finalidade = document.querySelector("#inpFinalidadeInsumo").value;
            item._valorUnidade = parseFloat(document.querySelector("#inpValorUniInsumo").value);
            item._estoque = parseInt(document.querySelector("#inpQuantEstoqueInsumo").value);

            //verifica se há um ponto de aviso
            let aux = parseInt(document.querySelector("#inpPontoAvisoInsumo").value);
            item._pontoAviso = (aux == null) ? "" : aux;

            item.toJSON();
        }
    return item;
}
