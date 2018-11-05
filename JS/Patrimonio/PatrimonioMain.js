// Define se a página será executada de forma estática ou dinâmica (com conexão).
const staticDebugMode = true;

if (!staticDebugMode) {
    receivePatrimonios();
}
else{
    generatePlaceholders();
}