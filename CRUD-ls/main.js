"use strict";

const openModal = () =>
  document.querySelector("#modal").classList.add("active");

const closeModal = () => {
  clearFields(); // Apaga todos os campos
  document.querySelector("#modal").classList.remove("active"); // Fecha a aba dos campos.
};

const getLocalStorage = () =>
  // Vai ler os clientes que ja estão registados. (receber)
  JSON.parse(localStorage.getItem("db_client")) ?? [];

const setLocalStorage = (dbClient) =>
  // Envia os dados para o local storage em formato de objeto. (enviar)
  localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD

// CRUD - CREATE
const createClient = (client) => {
  const dbClient = getLocalStorage(); // Recebe os clientes (função).
  dbClient.push(client); // Faz com que não substitua os clientes mas que adicione.
  setLocalStorage(dbClient); // Envia os clientes (função).
};

// CRUD - READ
const readClient = () => getLocalStorage();

// CRUD - UPDATE
const updateClient = (index, client) => {
  const dbClient = readClient(); // Lê toda a base de dados e coloca numa variável.
  dbClient[index] = client; // Para saber o cliente que queremos editar.
  setLocalStorage(dbClient); // Envia para a base de dados.
};

// CRUD - DELETE
const deleteClient = (index) => {
  const dbClient = readClient(); // Lê os base de dados (clientes).
  dbClient.splice(index, 1); // Remove os clientes.
  setLocalStorage(dbClient); // Atualiza a base de dados (Envia a base de dados sem o cliente que foi removido).
};

// Interação com o layout
const isValidFields = () => {
  return document.querySelector("#form").reportValidity(); // Retorna true se todos os campos foram preenchidos.
};

const clearFields = () => {
  // Apaga todos os campos.
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = "")); // Varre todos os campos (campo por campo). (array)
};

const saveClient = () => {
  if (isValidFields()) {
    // Se os campos forem válidos...
    const client = {
      nome: document.querySelector("#nome").value,
      email: document.querySelector("#email").value,
      telefone: document.querySelector("#telefone").value,
      cidade: document.querySelector("#cidade").value,
    };
    const index = document.querySelector("#nome").dataset.index;
    if (index == "new") {
      createClient(client);
      updateTable();
      closeModal();
    } else {
      updateClient(index, client);
      updateTable();
      closeModal();
    }
  }
};

const createRow = (client, index) => {
  const newRow = document.createElement("tr"); // Cria uma <tr>.
  newRow.innerHTML =
    // Preenche a <tr>.
    `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;
  document.querySelector("#tableClient>tbody").appendChild(newRow); // Insere a <tr> no <tbody>.
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody tr"); // Pega as <tr> dentro do <tbody>.
  rows.forEach((row) => row.parentNode.removeChild(row)); // Varre todas as linhas e apaga as linhas.
};

const updateTable = () => {
  const dbClient = readClient(); // Vai ler os clientes do Local Storage.
  clearTable(); // Apaga os dados da tabela.
  dbClient.forEach(createRow); // Vai interagir com cada elemento (linha ) do array.
};

const fillFields = (client) => {
  document.querySelector("#nome").value = client.nome;
  document.querySelector("#email").value = client.email;
  document.querySelector("#telefone").value = client.telefone;
  document.querySelector("#cidade").value = client.cidade;
  document.querySelector("#nome").dataset.index = client.index;
};

const editClient = (index) => {
  const client = readClient()[index];
  client.index = index;
  fillFields(client);
  openModal();
};

const editDelete = (e) => {
  // Vai diferenciar os botões 'editar' e 'excluir'
  if (e.target.type == "button") {
    // Especifica apenas para botões
    const [action, index] = e.target.id.split("-");
    if (action == "edit") {
      editClient(index);
    } else {
      const client = readClient()[index];
      const response = confirm(`Deseja mesmo excluir o cliente ${client.nome}`);
      if (response) {
        deleteClient(index);
        updateTable();
      }
    }
  }
};

updateTable();

// Eventos
document
  .querySelector("#cadastrarCliente")
  .addEventListener("click", openModal);

document.querySelector("#modalClose").addEventListener("click", closeModal);

document.querySelector("#salvar").addEventListener("click", saveClient);

document
  .querySelector("#tableClient>tbody")
  .addEventListener("click", editDelete);
