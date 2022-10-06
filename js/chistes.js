window.onload = inicio;

let reportAcudits = [];
let reportJokes = [];
let fondos = ['fondo', 'fondo2', 'fondo3', 'fondo4', 'fondo5'];
let chiste;
let puntuacion;

function inicio() {
    document.getElementById('pts').style.display = "none";
    ponerFondo();
    verTiempo();
    document.querySelector('.btn').onclick = crearChiste;
}

// API para mostrar el tiempo
async function verTiempo() {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Barcelona/today?unitGroup=metric&key=WMLMNNCGKWSQLHAGNFA7BU4ZC&contentType=json", {
        "method": "GET",
        "headers": {
        }
    })
        .then(response => response.json())
        .then((data) => {
            let icono = data.days[0].icon;
            let temperatura = data.days[0].temp;
            let widget = `<i class="wi wi-forecast-io-${icono}"></i> | ${temperatura}ºC`
            document.querySelector('.weatherWidget').innerHTML = widget;
        })
}

// Configuramos los headers de la API de chistes propuesta
let configHeaders = {
    'content-type': 'application/json',
    'Accept': 'application/json'
};

// Configuramos la API de chistes y escogemos uno de los dos al azar
async function crearChiste() {
    let chiste1 = await fetch('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: configHeaders
    })
        .then(response => response.json())
        .then(data => data.joke);

    let chiste2 = await fetch('https://api.chucknorris.io/jokes/random', {
        method: 'GET',
        headers: configHeaders
    })
        .then(response => response.json())
        .then(data => data.value);

    const CHISTE = [chiste1, chiste2];
    // let chisteElegido = CHISTE[Math.floor(Math.random() * 2)];
    chiste = CHISTE[Math.floor(Math.random() * 2)];
    mostrarChiste();
}

//Mostramos el chiste en pantalla y el apartado de puntuaciones
function mostrarChiste() {
    document.getElementById("chiste").innerHTML = chiste;
    document.getElementById('pts').style.display = "block";
    puntuar();
    document.querySelector('.btn').onclick = crearArray;
}

// Creamos el array del chiste
function crearArray() {

    reportAcudits = [
        {

            joke: chiste,

            score: puntuacion,

            date: ponerFecha()


        }
    ]

    reportJokes.push(reportAcudits);
    console.log(reportAcudits);
    console.log(reportJokes);
    actualizarChiste();
}

// Vemos si hay una puntuación para el chiste y la recogemos
function puntuar() {
    puntuacion = 0;
    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");
    let btn3 = document.getElementById("btn3");

    btn1.onclick = function () {
        puntuacion = 1;
    }
    btn2.onclick = function () {
        puntuacion = 2;
    }
    btn3.onclick = function () {
        puntuacion = 3;
    }

    return puntuacion;
}

// Ponemos la fecha al envio
function ponerFecha() {
    const d = new Date();
    let fecha = d.toISOString();

    return fecha;
}

// Ponemos el fondo con la imagen de la forma
function ponerFondo() {
    let imagen = fondos[Math.floor(Math.random() * fondos.length)];
    document.querySelector('.fondo').innerHTML = `<img src="images/${imagen}.svg" class="imagen"/>`;
}

// Actualizamos un nuevo chiste 
function actualizarChiste() {
    ponerFondo();
    crearChiste();
}
