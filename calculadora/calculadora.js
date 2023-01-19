"use strict";

const display = document.querySelector("#display");
const numero = document.querySelectorAll("[id*=tecla]"); // Vai buscar qualquer elemento que tenha como parte do atributo ' tecla '.
const operadores = document.querySelectorAll("[id*=operador]"); // Vai buscar qualquer elemento que tenha como parte do atributo ' operador '.

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined; // Se estiver vazio

const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = Number(display.textContent.replace(",", "."));
    novoNumero = true;
    if (operador == "+") {
      atualizarDisplay(numeroAnterior + numeroAtual);
    } else if (operador == "-") {
      atualizarDisplay(numeroAnterior - numeroAtual);
    } else if (operador == "*") {
      atualizarDisplay(numeroAnterior * numeroAtual);
    } else if (operador == "/") {
      atualizarDisplay(numeroAnterior / numeroAtual);
    }
  }
};

const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto.toLocaleString("BR"); // Quando for um novo operador, vai limpar a tela e adicionar novo numero.
    novoNumero = false;
  } else {
    display.textContent += texto.toLocaleString("BR"); // Se não, vai adicionar novos números
  }
};

const inserirNumero = (e) => {
  atualizarDisplay(e.target.textContent); // Vai buscar o conteudo de cada ID.
};

const selecionarOperador = (e) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = e.target.textContent; // Guarda os operadores na memória
    numeroAnterior = Number(display.textContent.replace(",", ".")); // Guarda os números na memória
  }
};

numero.forEach((numero) => numero.addEventListener("click", inserirNumero)); // Varre todos os elementos de um array.
operadores.forEach((operador) =>
  operador.addEventListener("click", selecionarOperador)
); // Varre todos os elementos de um array.

const ativarIgual = () => {
  calcular();
  operador = undefined;
};

document.querySelector("#igual").addEventListener("click", ativarIgual);

const limparDisplay = () => (display.textContent = "");

document
  .querySelector("#limparDisplay")
  .addEventListener("click", limparDisplay);

const limparCalculo = () => {
  // Zerar e apagar tudo na calculadora (memória)
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};

document
  .querySelector("#limparCalculo")
  .addEventListener("click", limparCalculo);

const removerUltimoNumero = () => {
  display.textContent = display.textContent.slice(0, -1);
};

document
  .querySelector("#backspace")
  .addEventListener("click", removerUltimoNumero);

const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
};

document.querySelector("#inverter").addEventListener("click", inverterSinal);

const existeDecimal = () => display.textContent.indexOf(",") != -1;

const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
  if (!existeDecimal()) {
    if (existeValor()) {
      atualizarDisplay(",");
    } else {
      atualizarDisplay("0,");
    }
  }
};

document.querySelector("#decimal").addEventListener("click", inserirDecimal);

const mapaTeclado = {
  0: "tecla0",
  1: "tecla1",
  2: "tecla2",
  3: "tecla3",
  4: "tecla4",
  5: "tecla5",
  6: "tecla6",
  7: "tecla7",
  8: "tecla8",
  9: "tecla9",
  "/": "operadorDividir",
  "*": "operadorMultiplicar",
  "-": "operadorSubtrair",
  "+": "operadorAdicionar",
  "=": "igual",
  Enter: "igual",
  Backspace: "backspace",
  c: "limparDisplay",
  Escape: "limparCalculo",
  ",": "decimal",
};

const mapearTeclado = (e) => {
  const tecla = e.key;
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1; // Remove todos os valores da keys e retorna apenas as keys (0, 1, 2...)
  if (teclaPermitida()) {
    document.getElementById(mapaTeclado[tecla]).click();
  }
};

document.addEventListener("keydown", mapearTeclado);
