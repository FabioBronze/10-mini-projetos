const calcular = document.querySelector("#calcular");

function imc() {
  const nome = document.querySelector("#nome").value;
  const altura = document.querySelector("#altura").value;
  const peso = document.querySelector("#peso").value;
  const resultado = document.querySelector("#resultado");

  if (nome != "" && altura != "" && peso != "") {
    let imc = Number(peso / (altura * altura)).toFixed(2);

    let classificacao = ""
    if (imc < 18.5) {
        classificacao = 'Abaixo do Peso.'
    } else if(imc < 25) {
        classificacao = 'Peso Ideal.'
    } else if(imc < 30) {
        classificacao = 'Levemente Acima do Peso.'
    } else if(imc < 35) {
        classificacao = 'Obesidade Grau 1.'
    } else if(imc < 40) {
        classificacao = 'Obesidade Grau 2.'
    } else {
        classificacao = 'Obesidade Morbida.'
    }

    resultado.textContent = `${nome} tem IMC: ${imc} - ${classificacao}`

  } else {
    alert("Preencha todos os campos!");
  }
}

calcular.addEventListener("click", imc);
