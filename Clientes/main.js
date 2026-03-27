import { createClient } from './clienteApi.js';

const clientForm = document.getElementById("clientForm");

clientForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const clientData = {
        nome: document.getElementById("name").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("phone").value,
        cpf: document.getElementById("cpf").value,
        quantidadeDePets: parseInt(document.getElementById("pets").value),
        notes: document.getElementById("notes").value
    };


    await createClient(clientData);
  

    clientForm.reset();
    closeModal();
});


// validar cpf 

const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', (e) => {
    let value = e.target.value;

    
    value = value.replace(/\D/g, '');

    
    if(value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else if(value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if(value.length > 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    }

    e.target.value = value;
});

//--------------


// validar telefone

const phone = document.getElementById('phone');

phone.addEventListener('input', (e) => {
    let value = e.target.value;

    
    value = value.replace(/\D/g, '');

    
    value = value.substring(0, 11);

    
    if (value.length === 11 && value[2] !== '9') {
        
        value = value.substring(0, 2) + '9' + value.substring(2, 11);
    }

    
    if (value.length > 10) {
        // Celular: (XX) 9XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 5) {
        // Fixo: (XX) XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
        // Só DDD + primeiros dígitos
        value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
    }

    e.target.value = value;
});

//---------------




