

async function buscarClientePorId(id) {
  try {
    const res = await fetch(`http://localhost:8080/clientes/${id}`);
    if (!res.ok) throw new Error("Cliente não encontrado");
    const cliente = await res.json();
    return cliente.nome;
  } catch (err) {
    console.error(err);
    return "Desconhecido";
  }
}

async function carregarPets() {
    try {
        const response = await fetch("http://localhost:8080/animais/listar");
        if (!response.ok) throw new Error("Erro ao listar animais");
        
        pets = await response.json();
        renderPets(pets); // Chama a função que desenha a tabela
    } catch (error) {
        console.error("Erro ao carregar pets:", error);
    }
}
