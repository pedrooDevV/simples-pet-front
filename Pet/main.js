

async function buscarClientePorId(id) {
  try {
    const res = await fetch(`http://localhost:8081/clientes/${id}`);
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
        const response = await fetch("http://localhost:8081/animais/listar");
        if (!response.ok) throw new Error("Erro ao listar animais");
        
        pets = await response.json();
        renderPets(pets); // Chama a função que desenha a tabela
    } catch (error) {
        console.error("Erro ao carregar pets:", error);
    }
}

document.getElementById('sortAz').addEventListener('click', () => {
  // Ordena a lista de pets alfabeticamente
  pets.sort((a, b) => {
    return a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' });
  });

  // Renderiza a tabela de novo
  renderPets(pets);

  // Feedback visual
  showToast("Pets ordenados de A a Z!");
});