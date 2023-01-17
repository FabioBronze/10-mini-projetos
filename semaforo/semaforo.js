const img = document.querySelector("#img");
const buttons = document.querySelector("#buttons"); // Buscar o elemento pai dos buttons.
let colorIndex = 0;
let intervalId = null;

const trafficLight = (e) => {
  stopInterval()
  turnOn[e.target.id](); // Vai buscar o id de cada botão, dentro do objeto da função ' turnOn '.
};

const nextIndex = () => {
  // Vai andar com a imagem 1 por 1.
  if (colorIndex < 2) {
    colorIndex++;
  } else {
    colorIndex = 0;
  }
};

const changeColor = () => {
  const colors = ["red", "yellow", "green"]; // Array de cores.
  const color = colors[colorIndex]; // Va buscar o indíce de cada cor um por um.
  turnOn[color](); // Vai buscar a cor do momento.
  nextIndex();
};

const stopInterval = () => {
  clearInterval(intervalId);
};

const turnOn = {
  // Objeto.
  red: () => (img.src = "./img/vermelho.png"),
  yellow: () => (img.src = "./img/amarelo.png"),
  green: () => (img.src = "./img/verde.png"),
  automatic: () => (intervalId = setInterval(changeColor, 1000)), // Vai executar a cada 1s.
};

buttons.addEventListener("click", trafficLight);
