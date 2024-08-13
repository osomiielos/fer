const palabras = ["GOKU", "VEGETA", "BULMA", "CELL", "MAJIN", "BROLY", "VIDEL", "BILLS", "MILK", "GOHAN", "GOTEN", "ZENO SAMA", "KALE", "TRUNKS", "GOGETA"];
let palabraElegida = "";
let letrasAdivinadas = [];
let errores = 0;
let ganados = 0;
let perdidos = 0;

const contenedorPalabra = document.getElementById("contenedor-palabra");
const contenedorAlfabeto = document.getElementById("contenedor-alfabeto");
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const resultado = document.getElementById("resultado");
const contadorGanados = document.getElementById("ganados");
const contadorPerdidos = document.getElementById("perdidos");
const botonReiniciar = document.getElementById("boton-reiniciar");

function iniciarJuego() {
    palabraElegida = palabras[Math.floor(Math.random() * palabras.length)];
    letrasAdivinadas = [];
    errores = 0;
    resultado.innerText = "";
    resultado.classList.remove("ganaste", "perdiste");
    actualizarContenedorPalabra();
    actualizarImagenAhorcado();
    crearBotonesAlfabeto();
}

function actualizarContenedorPalabra() {
    contenedorPalabra.innerHTML = palabraElegida
        .split("")
        .map(letra => (letrasAdivinadas.includes(letra) ? letra : "_"))
        .join(" ");
}

function actualizarImagenAhorcado() {
    imagenAhorcado.src = `Images/ahorcado${errores}.png`;
}

function crearBotonesAlfabeto() {
    contenedorAlfabeto.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);
        const boton = document.createElement("button");
        boton.innerText = letra;
        boton.addEventListener("click", () => manejarAdivinanza(letra, boton));
        contenedorAlfabeto.appendChild(boton);
    }
}

function manejarAdivinanza(letra, boton) {
    if (palabraElegida.includes(letra)) {
        letrasAdivinadas.push(letra);
        actualizarContenedorPalabra();
        verificarVictoria();
    } else {
        errores++;
        actualizarImagenAhorcado();
        verificarDerrota();
    }
    boton.remove(); // Elimina el botón del DOM
}

function verificarVictoria() {
    if (!contenedorPalabra.innerText.includes("_")) {
        ganados++;
        contadorGanados.innerText = ganados;
        resultado.innerText = "¡Ganaste por que eres un gran GUERRERO!";
        resultado.classList.add("ganaste");
        deshabilitarBotones();
    }
}

function verificarDerrota() {
    if (errores >= 10) {
        perdidos++;
        contadorPerdidos.innerText = perdidos;
        resultado.innerText = `¡Perdiste por que eres un MALDITO INSECTO! La palabra era ${palabraElegida}`;
        resultado.classList.add("perdiste");
        deshabilitarBotones();
    }
}

function deshabilitarBotones() {
    document.querySelectorAll("#contenedor-alfabeto button").forEach(boton => {
        boton.disabled = true;
    });
}

botonReiniciar.addEventListener("click", iniciarJuego);

iniciarJuego();
