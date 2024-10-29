let puntajeJugador = 0;
let puntajeComputadora = 0;
let rondaActual = 0;
let totalRondas = 5;
let juegoIniciado = false;

// Control de sonido
let isMuted = false;
const backgroundMusic = document.getElementById("background-music");

function iniciarJuego() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    rondaActual = 0;
    totalRondas = parseInt(document.getElementById("num-rondas").value);
    juegoIniciado = true;
    document.getElementById("num-rondas").disabled = true;
    document.getElementById("resultado").innerText = "";
    document.getElementById("puntaje-acumulado").innerText = "";
    document.getElementById("gif-img").style.display = "none"; // Ocultar el GIF al iniciar
}

function calcularResultado() {
    if (!juegoIniciado) {
        iniciarJuego();
    }

    if (rondaActual >= totalRondas) {
        document.getElementById("resultado").innerText = "El juego ha terminado. Por favor, reinicia el juego.";
        return;
    }

    const player = document.getElementById("player-strategy").value;
    const strategies = player === "lilo" ? ["stitch", "nani"] : ["leroy", "lilo"];
    const computer = strategies[Math.floor(Math.random() * strategies.length)];
    let resultado = "";

    const payoff = {
        "lilo-lilo": [5, 5],
        "lilo-stitch": [0, 10],
        "stitch-lilo": [10, 0],
        "stitch-stitch": [-1, -1],
        "stitch-leroy": [3, 3],
        "lilo-nani": [4, 2],
        "nani-lilo": [2, 4],
        "leroy-stitch": [1, 5],
        "leroy-lilo": [2, 4]
    };

    const gifs = {
        "lilo-lilo": "https://i.gifer.com/SAzs.gif",
        "lilo-stitch": "https://i.pinimg.com/originals/28/0e/bc/280ebc35f36d9571f08cd61ab422235d.gif",
        "stitch-lilo": "https://i.makeagif.com/media/5-18-2021/BVauIE.gif",
        "stitch-stitch": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "stitch-leroy": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "lilo-nani": "https://64.media.tumblr.com/2dd5c2957105b7635f677c0e25028d1e/f3ad5e58692f6fc5-1e/s540x810/e0643498928245259fe9d04d0e880fff5a156e6e.gifv",
        "leroy-lilo": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "leroy-stitch": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "nani-lilo": "https://64.media.tumblr.com/2dd5c2957105b7635f677c0e25028d1e/f3ad5e58692f6fc5-1e/s540x810/e0643498928245259fe9d04d0e880fff5a156e6e.gifv"
    };

    const key = `${player}-${computer}`;
    const payoffResult = payoff[key] || [0, 0];
    const gifUrl = gifs[key];

    puntajeJugador += payoffResult[0];
    puntajeComputadora += payoffResult[1];

    if (gifUrl) {
        document.getElementById("gif-img").src = gifUrl;
        document.getElementById("gif-img").style.display = "block";
    }

    rondaActual++;

    resultado = `Resultado de la ronda ${rondaActual}: Has elegido ${player} y la computadora ha elegido ${computer}.
    Puntaje obtenido: Jugador - ${payoffResult[0]}, Computadora - ${payoffResult[1]}`;

    document.getElementById("resultado").innerText = resultado;
    document.getElementById("puntaje-acumulado").innerText = `Puntaje acumulado: Jugador - ${puntajeJugador}, Computadora - ${puntajeComputadora}`;
}

function reiniciarJuego() {
    document.getElementById("num-rondas").disabled = false;
    juegoIniciado = false;
    document.getElementById("resultado").innerText = "";
    document.getElementById("puntaje-acumulado").innerText = "";
    document.getElementById("gif-img").style.display = "none";
}

// Función para alternar el mute de la música de fondo
function toggleMute() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    document.getElementById("mute-btn").innerText = isMuted ? "Activar Sonido" : "Silenciar";
}
