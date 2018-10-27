let patrimonio = new Patrimonio(5);
patrimonio.nome = "Adriana";
patrimonio.tipo = "Trator"
patrimonio.finalidade = "Meio chata mas a gente aguenta";
patrimonio.status = "VENDIDO"; // Valores predefinidos na classe Patrimonio
patrimonio.indiceDepreciacao = "1.5";
patrimonio.valorCompra = "5000"; // Ao mandar uma String, o Setter tentará converte-la para um número.
patrimonio.valorAtual = 3800;
patrimonio.dataCompra = new Date(1950, 12, 30, 23, 59, 59, 100); // Data + Hora, min, seg, ms.
patrimonio.dataSaida = new Date(); // Data atual
patrimonio.dataRetorno = new Date(); // Data atual
patrimonio.dataBaixa = new Date(2020, 11, 28); // Data

patrimonio.printToConsole();

insertPatrimonioIntoTable(patrimonio);