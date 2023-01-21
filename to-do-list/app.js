"use strict";

let banco = [
  { tarefa: "Estudar JS", status: "" },
  { tarefa: "35:03", status: "checked" },
];

const criarItem = (tarefa, status) => {
  const item = document.createElement("label"); // Cria um label com a classe 'todo__item'
  item.classList.add("todo__item");
  item.innerHTML = `
        <input type="checkbox" ${status}>
        <div>${tarefa}</div>
        <input type="button" value="X">
    `;
  document.querySelector("#todoList").appendChild(item); // Vai adiconar o item (label) na div com id '#todoList'
};

const limparTarefas = () => {
  // Para não repetir o atualizarTela()
  const todoList = document.querySelector("#todoList");
  while (todoList.firstChild) {
    // Enquanto exisitir o primeiro filho
    todoList.removeChild(todoList.lastChild); // Vai sempre remover o último filho
  }
};

const atualizarTela = () => {
  limparTarefas();
  banco.forEach((item) => criarItem(item.tarefa, item.status)); // Varre todo o array, item a item.
};

const inserirItem = (e) => {
  const tecla = e.key;
  const texto = e.target.value;
  if (tecla === "Enter") {
    banco.push({ tarefa: texto, status: "" });
    atualizarTela();
    e.target.value = "";
  }
};

document.querySelector("#newItem").addEventListener("keypress", inserirItem);

atualizarTela();
