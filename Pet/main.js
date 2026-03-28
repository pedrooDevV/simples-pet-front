

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
    const res = await fetch("http://localhost:8080/animais/listar");
    if (!res.ok) throw new Error("Erro ao carregar pets");
    const data = await res.json();
    pets = data;
    await renderPets(pets);
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar pets");
  }
}
