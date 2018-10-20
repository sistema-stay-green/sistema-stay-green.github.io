let patrimonio = new Patrimonio(5);
patrimonio.nome = "Adriana";
patrimonio.tipo = "Trator"
patrimonio.descricao = "Meio chata mas a gente aguenta";
patrimonio.status = "VENDIDO"; // Valores predefinidos na classe Patrimonio
patrimonio.indiceDepreciacao = "1.5";
patrimonio.valorCompra = "5"; // Ao mandar uma String, o Setter tentará converte-la para um número.
patrimonio.valorAtual = 3;
patrimonio.dataCompra = new Date(1950, 12, 30, 23, 59, 59, 100); // Data + Hora, min, seg, ms.
patrimonio.dataBaixa = new Date(2020, 11, 28); // Data
patrimonio.dataSaida = new Date(); // Data atual

patrimonio.printToConsole();