let intentos = 6;
let palabra;
let verde = "#9BEC00";
let amarillo = "#FFF455";
let gris = "#EEEDEB";
const API = "https://random-word-api.vercel.app/api?words=1&length=5";
fetch(API).then((response) => {
  response.json().then((body) => {
    palabra = body[0].toUpperCase();
  });
});

const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const valor = input.value;
button.addEventListener("click", intentar);

function intentar() {
  const INTENTO = leerIntento();
  if (INTENTO.length !== 5) {
    alert("Por favor, introduzca una palabra de 5 letras.");
    return;
  }
  if (INTENTO === palabra) {
    mostrarGrillaCompleta(palabra);
    terminar("<h1>GANASTE! 🎉</h1>");
    return;
  }
  const row = document.createElement("div");
  row.className = "row";
  const grid = document.getElementById("grid");
  for (const i in INTENTO) {
    const span = document.createElement("span");
    span.className = "letter";
    span.innerText = INTENTO[i];
    if (INTENTO[i] === palabra[i]) {
      span.style.backgroundColor = verde;
    } else if (palabra.includes(INTENTO[i])) {
      span.style.backgroundColor = amarillo;
    } else {
      span.style.backgroundColor = gris;
    }
    row.appendChild(span);
  }
  grid.appendChild(row);
  intentos--;

  if (intentos == 0) {
    terminar(`<h1>PERDISTE! 😢 La palabra correcta era ${palabra}</h1>`);
  }
}

function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  INPUT.disabled = true;
  button.disabled = true;
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}

function mostrarGrillaCompleta(palabraCorrecta) {
  const grid = document.getElementById("grid");
  const row = document.createElement("div");
  row.className = "row";

  for (let i = 0; i < palabraCorrecta.length; i++) {
    const span = document.createElement("span");
    span.className = "letter";
    span.innerText = palabraCorrecta[i];
    span.style.backgroundColor = verde;
    row.appendChild(span);
  }

  grid.appendChild(row);
}
