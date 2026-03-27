const API_URL = "http://localhost:8080/clientes/";

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
            throw new Error(`Erro ao criar cliente: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        alert("Não foi possível criar o cliente. Veja o console.");
    }
}


export async function fetchClients() {
    try {
        const res = await fetch(`${API_URL}/listar`);
        if (!res.ok) throw new Error("Erro ao buscar clientes");
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

export async function deleteClient(id) {
    try {
        const res = await fetch(`${API_URL}/deletar/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error("Erro ao deletar cliente");
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


