let patrimonio = new Patrimonio(5);
patrimonio.nome = "Adriana";
patrimonio.tipo = "Trator"
patrimonio.descricao = "Meio chata mas a gente aguenta";
patrimonio.status = "fumante";
patrimonio.indiceDepreciacao = 1.5;
patrimonio.valorCompra = "5"; // String works too
patrimonio.valorAtual = 3;
patrimonio.dataCompra = new Date(1950, 12, 30, 23, 59, 59, 100);
patrimonio.dataBaixa = new Date(2019, 12, 28);
patrimonio.dataSaida = new Date();

patrimonio.printToConsole();