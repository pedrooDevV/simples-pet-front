const API_URL = "http://localhost:8081/clientes/";

export async function createClient(clientData) {
    try {
        const response = await fetch(API_URL + "criar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar cliente: ${response.statusText} ` );
        }

        return await response.json();
    } catch (error) {
        console.error(error);
       OtherShowToast(
  "Não foi possível criar o cliente. Certifique que o telefone, CPF ou email já não existam ou estejam no formato correto",
  true // 'true' indica que é erro (vai ficar vermelho)
);
    }
}

function OtherShowToast(msg) {
        const toast = document.getElementById("toast");
        document.getElementById("toastMsg").innerText = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 4000);
      }



export async function fetchClients() {
    try {
        const res = await fetch(`${API_URL}/listar`);
        if (!res.ok) throw new Error("Erro ao buscar clientes");
        console.log(res.json());
        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }

    
}


export async function updateClient(id, clientData) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clientData)
        });
        if (!res.ok) throw new Error("Erro ao atualizar cliente");
        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function loadClients() {
    try {
        const response = await fetch("http://localhost:8081/clientes/listar");
        if (!response.ok) throw new Error("Erro ao buscar clientes");
        return await response.json();
    } catch (error) {
        console.error("Erro:", error);
        return [];
    }
}


