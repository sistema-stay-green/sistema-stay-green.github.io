/**
 * Executa as operações de inicialização da página.
 */
hidePatrimonioTable();

if (!staticDebugMode) {
    receivePatrimonios();
    
}
else{
    generatePlaceholders();
}