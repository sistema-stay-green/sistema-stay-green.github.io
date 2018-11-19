/**
 * Executa as operações de inicialização da página.
 * @author Mei Fagundes
 */
hidePatrimonioTable();

if (!staticDebugMode) {
    receivePatrimonios();
    
}
else{
    generatePlaceholders();
}