let botoesGeradoresRelatorio = document.querySelectorAll('.botaoRelatorio');

for(let botaoRelatorio of botoesGeradoresRelatorio){
  botaoRelatorio.addEventListener('click', () => {
    alert(botaoRelatorio.innerHTML);
  })
}
