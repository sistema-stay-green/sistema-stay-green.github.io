let botaoFormTarefaEl = document.querySelector('#botaoFormTarefa'),
    containerFormNovaTarefa = document.querySelector('form');

/*Exibe o formulário de adicionar nova tarefa quando usuário clica no
botão '+ Nova Trefa'*/
botaoFormTarefaEl.addEventListener('click', () => {
  let mascaraFormEl = document.querySelector('#mascaraForm');

  mascaraFormEl.classList.remove('invisivel');

  mascaraFormEl.addEventListener('click', () => {
      mascaraFormEl.classList.add('invisivel');
      containerFormNovaTarefa.classList.add('invisivel');
  })

  containerFormNovaTarefa.classList.remove('invisivel');
})

/*TODO:
  * Criar script que encapsula os dados do form em um objeto Tarefa
  * Fazer um AJAX para enviar esse objeto para o Servlet

  Responsável: João Francisco
*/

let botaoAdicionarNovaTarefa = document.querySelector('#adicionarNovaTarefa');
