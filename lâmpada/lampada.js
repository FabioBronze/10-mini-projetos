const turnOnOff = document.querySelector("#turnOnOff");
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

function lampOnOff() {
  if (turnOnOff.textContent == "Ligar") {
    turnOn();
    turnOnOff.textContent = "Desligar";
  } else {
    turnOff();
    turnOnOff.textContent = "Ligar";
  }
}

turnOnOff.addEventListener("click", lampOnOff);
lamp.addEventListener("mouseover", turnOn);
lamp.addEventListener("mouseleave", turnOff);
lamp.addEventListener("dblclick", lampBroken);
