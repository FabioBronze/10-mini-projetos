const ligar = document.querySelector("#turnOn");
const desligar = document.querySelector("#turnOff");
const lamp = document.querySelector("#lamp");

function isLampBroken() {
  return lamp.src.indexOf("quebrada") > -1;
}

function turnOn() {
  if (!isLampBroken()) {
    lamp.src = "img/ligada.jpg";
  }
}

function turnOff() {
  if (!isLampBroken()) {
    lamp.src = "img/desligada.jpg";
  }
}

function lampBroken() {
  lamp.src = "img/quebrada.jpg";
}

ligar.addEventListener("click", turnOn);
desligar.addEventListener("click", turnOff);
lamp.addEventListener("mouseover", turnOn);
lamp.addEventListener("mouseleave", turnOff);
lamp.addEventListener("dblclick", lampBroken);
