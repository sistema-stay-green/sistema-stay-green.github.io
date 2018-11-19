// Declaração de variáveis
let btnEditarEl = document.querySelector("#btnEditar"),
    btnConfirmarEl = document.querySelector('#cadastro > button:first-of-type'),
    btnCancelarEl = document.querySelector('#cadastro > button:last-of-type'),
    formEditaEl = document.querySelector("#infoUsuario > article:nth-child(2)"),
    articleMostraEl = document.querySelector("#mostraInfoUsuario");
    console.log(btnCancelarEl);

// Recebe as informações do formulário de cadastro
let btnConfimarCadastroEl = document.querySelector("#cadastro > button:first-of-type");

btnConfimarCadastroEl.addEventListener("click", function() {

  let nomeUsuario = document.querySelector("#cadastro input[name='nomeUsuario']").value,
      cnpjUsuario = document.querySelector("#cadastro input[name='cnpjUsuario']").value,
      saldoUsuario = document.querySelector("#cadastro input[name='saldoUsuario']").value,
      emailUsuario = document.querySelector("#cadastro input[name='emailUsuario']").value,
      senhaUsuario = document.querySelector("#cadastro input[name='senhaUsuario']").value,
      usuario = new usuario(null);

  usuario.nome = nomeUsuario;
  usuario.cnpj = cnpjUsuario;
  usuario.saldo = saldoUsuario;
  usuario.email = emailUsuario;
  usuario.senha = null;

  Request.get("http://localhost:8080/StayGreen/UpdateUsuarioServlet?nome="
              + nomeUsuario + "&cnpj=" + cnpjUsuario + "&saldo=" + saldoUsuario
              + "&login=" + emailUsuario + "&senha=" + senhaUsuario)
         .then(() => {
              localStorage.setItem("usuario", usuario.toJSON());
              window.location.redirect("index.html");
         })
         .catch(() => { alert("Erro ao cadastrar os dados no servidor"); });
});

// Chama funções relacionadas a cada botão
btnCancelarEl.addEventListener("click", alternaArticles);
btnEditarEl.addEventListener("click", function(){
  alternaArticles();

  // Pegar os valores do BD e se algum valor for null ou undefined n atualizar
  let nomeUsuario = document.querySelector("#cadastro input[name='nomeUsuario']"),
      cnpjUsuario = document.querySelector("#cadastro input[name='cnpjUsuario']"),
      saldoUsuario = document.querySelector("#cadastro input[name='saldoUsuario']"),
      emailUsuario = document.querySelector("#cadastro input[name='emailUsuario']"),
      usuario = JSON.parse(localStorage.getItem('usuario'));
  
  nomeUsuario.value = usuario.nomeUsuario;
  cnpjUsuario.value = usuario.cnpjUsuario;
  saldoUsuario.value = usuario.saldoUsuario;
  emailUsuario.value = usuario.emailUsuario;
});

function alternaArticles(){
  formEditaEl.classList.toggle("ocultar");
  articleMostraEl.classList.toggle("ocultar");
  btnEditarEl.classList.toggle("ocultar");
}
