import { createClient, loadClients } from "./clienteApi.js";

const clientForm = document.getElementById("clientForm");

clientForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const clientId = document.getElementById("clientId").value;



  const clientData = {
    nome: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefone: document.getElementById("phone").value.trim(),
    cpf: document.getElementById("cpf").value.trim(),
    quantidadeDePets: parseInt(document.getElementById("pets").value),
    observacoes: document.getElementById("notes").value.trim(),
  };

  if (!clientData.nome || !clientData.email || !clientData.telefone || !clientData.cpf) {
    showToast("Nome, email, cpf e telefone são obrigatórios!", true);
    return;
  }

  try {
    let res, updatedClient;

    if (clientId) {
      res = await fetch(`http://localhost:8081/clientes/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });
    } else {
      res = await fetch(`http://localhost:8081/clientes/criar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData),
      });
    }

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(
        error?.message ||
          "Não foi possível criar o cliente. Certifique que o telefone, CPF ou email já não existam ou estejam no formato correto."
      );
    }

    updatedClient = await res.json();

    if (clientId) {
      const index = clients.findIndex((c) => c.id == clientId);
      clients[index] = updatedClient;
      showToast("Cliente atualizado com sucesso!");
    } else {
      clients.push(updatedClient);
      showToast("Cliente criado com sucesso!");
    }

    renderClients(clients);
    clientForm.reset();
    closeModal();
  } catch (err) {
    console.error(err);
    showToast(err.message, true);
  }
});

// validar cpf

const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", (e) => {
  let value = e.target.value;

  value = value.replace(/\D/g, "");

  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
  }

  e.target.value = value;
});

// validar telefone

const phone = document.getElementById("phone");

phone.addEventListener("input", (e) => {
  let value = e.target.value;

  value = value.replace(/\D/g, "");

  value = value.substring(0, 11);

  if (value.length === 11 && value[2] !== "9") {
    value = value.substring(0, 2) + "9" + value.substring(2, 11);
  }

  if (value.length > 10) {
    // Celular: (XX) 9XXXX-XXXX
    value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (value.length > 5) {
    // Fixo: (XX) XXXX-XXXX
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  } else if (value.length > 2) {
    // Só DDD + primeiros dígitos
    value = value.replace(/^(\d{2})(\d+)/, "($1) $2");
  }

  e.target.value = value;
});
