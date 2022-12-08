const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
let botonReiniciar = document.getElementById("boton-reiniciar");
const sectionMensajes = document.getElementById("resultado");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const seccionMensajes = document.getElementById("mensajes");
const ataquesDeljugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let enemigoId = null;
let jugadorId = null;
let ataqueJugador =[];
let botones = [];
let botonAgua;
let botonTierra;
let botonFuego;
let ataqueEnemigo = [];
let vidasJugador = 3;
let vidasEnemigo = 3;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let bestias = [];
let opcionDeBestias;
let inputSurixan;
let inputLonrot;
let inputKinuq;
let inputRoky;
let inputPerrix;
let inputFogo;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesBestia;
let ataquesBestiaEnemigo;
let iAtaqueJugador;
let iAtaqueEnemigo;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "mapa.png";
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 600;
let bestiasEnemigos = [];

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Bestia {
    constructor(nombre, foto, vida,tipo,fotoMapa,id = null){
        this.id = id;
        this.nombre =  nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.tipo = tipo;
        this.x = aleatorio(0, mapa.width-80);
        this.y = aleatorio(0, mapa.height-100);
        this.ancho = 80;
        this.alto = 100;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarBestia(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    };
}

let surixan = new Bestia("Surixan","beast1.jpg", 5,"Agua","bestia1.png");
let lonrot = new Bestia ("Lonrot","beast2.jpg", 5,"Fuego","bestia2.png");
let kinuq = new Bestia("Kinuq","beast3.jpg", 5,"Tierra","bestia3.png");
let roky = new Bestia("Roky","bestia6.jpg",5,"Tierra","bestia6.png");
let perrix = new Bestia("Perrix","bestia4.jpg",5,"Agua","bestia4.png");
let fogo = new Bestia("Fogo","bestia5.jpg",5,"Fuego","bestia5.png");



const surixanAtaques =[
    { nombre:"💧",id:"boton-agua"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "🌱", id:"boton-tierra"},
    { nombre: "🔥", id:"boton-fuego"}
]

const lonrotAtaques = [
    { nombre:"🔥",id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🌱", id:"boton-tierra"},
    { nombre: "💧", id:"boton-agua"}
]

const kinuqAtaques =[
    { nombre:"🌱",id:"boton-tierra"},
    { nombre: "🌱", id:"boton-tierra"},
    { nombre: "🌱", id:"boton-tierra"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "🔥", id:"boton-fuego"}
]

const rokyAtaques =[
    { nombre:"🌱",id:"boton-tierra"},
    { nombre: "🌱", id:"boton-tierra"},
    { nombre: "🌱", id:"boton-tierra"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "💧", id:"boton-agua"}
]

const perrixAtaques = [
    { nombre:"💧",id:"boton-agua"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"}
]

const fogoAtaques = [
    { nombre:"🔥",id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🌱", id:"boton-tierra"},
    { nombre: "🌱", id:"boton-tierra"},
    { nombre: "🔥", id:"boton-fuego"}
]

surixan.ataques.push(...surixanAtaques);
lonrot.ataques.push(...lonrotAtaques);
kinuq.ataques.push(...kinuqAtaques);
roky.ataques.push(...rokyAtaques);
perrix.ataques.push(...perrixAtaques);
fogo.ataques.push(...fogoAtaques);




bestias.push(surixan,lonrot,kinuq,roky,fogo,perrix);


function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none";
    seccionMensajes.style.display = "none";
    sectionReiniciar.style.display = "none";
    sectionVerMapa.style.display = "none";

    bestias.forEach((bestia) =>{
        opcionDeBestias = `
        <input type="radio" name="mascota" id="${bestia.nombre}">
        <label class="tarjeta-de-mokepon" for="${bestia.nombre}">
                <p>${bestia.nombre}</p>
                <img src="${bestia.foto}" alt="${bestia.nombre}" class="kinuq">
         </label>
        `
        contenedorTarjetas.innerHTML += opcionDeBestias;

    inputSurixan = document.getElementById("Surixan");
    inputLonrot = document.getElementById("Lonrot");
    inputKinuq = document.getElementById("Kinuq");
    inputRoky = document.getElementById("Roky");
    inputPerrix = document.getElementById("Perrix");
    inputFogo = document.getElementById("Fogo");

    })
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    botonReiniciar.addEventListener("click",reiniciarJuego);
    unirseAlJuego();
    
}
function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
    .then(function(res){
        if(res.ok){
            res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta;
                })
        }
    })
}


function seleccionarMascotaJugador(){
    if (inputSurixan.checked){
        spanMascotaJugador.innerHTML = inputSurixan.id;
        mascotaJugador = inputSurixan.id;
    } else if(inputLonrot.checked){
        spanMascotaJugador.innerHTML = inputLonrot.id;
        mascotaJugador = inputLonrot.id;
    } else if(inputKinuq.checked){
        spanMascotaJugador.innerHTML = inputKinuq.id;
        mascotaJugador = inputKinuq.id;      
    }else if(inputRoky.checked){
        spanMascotaJugador.innerHTML = inputRoky.id;
        mascotaJugador = inputRoky.id;
    }else if(inputPerrix.checked){  
        spanMascotaJugador.innerHTML = inputPerrix.id;
        mascotaJugador = inputPerrix.id;
    }else if(inputFogo.checked){
        spanMascotaJugador.innerHTML = inputFogo.id;
        mascotaJugador = inputFogo.id;
    }else{
        alert("Selecciona una mascota");
        return
    }
    sectionSeleccionarMascota.style.display = "none";
    seleccionarBestia(mascotaJugador);
    
    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = "flex";
    iniciarMapa();
}

function seleccionarBestia(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            bestia:mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques;
    for (let i = 0; i < bestias.length; i++) {
        if(mascotaJugador === bestias[i].nombre){
            ataques = bestias[i].ataques;
        }
        
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesBestia = `
        <button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesBestia;
    })

    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");
    botonFuego = document.getElementById("boton-fuego");
    botones = document.querySelectorAll(".BAtaque");
    
    console.log(botones)
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener("click",(e) =>{
            if(e.target.textContent === "🔥"){
                ataqueJugador.push("FUEGO");
                console.log(ataqueJugador);
                boton.style.background =  "#555";
                boton.disabled = true;
            }else if(e.target.textContent === "💧"){
                ataqueJugador.push("AGUA");
                console.log(ataqueJugador);
                boton.style.background =  "#555";
                boton.disabled = true;
            }else{
                ataqueJugador.push("TIERRA");
                console.log(ataqueJugador);
                boton.style.background =  "#555";
                boton.disabled = true;
            }
            if(ataqueJugador.length === 5){
                enviarAtaques();
            }
        })
    })
    
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
     .then(function(res){
        if (res.ok){
            res.json()
            .then(function({ ataques }){
                if (ataques.length === 5){
                    ataqueEnemigo = ataques;
                    combate();
                }
            })
        }
     })
}

function seleccionarMascotaEnemigo(enemigo){
    let ataqueAleatorio = aleatorio(0,bestias.length - 1);

    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesBestiaEnemigo = enemigo.ataques;
    secuenciaAtaque();
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorioEnemigo = aleatorio(0,ataquesBestiaEnemigo.length - 1);

    if(ataqueAleatorioEnemigo == 0 || ataqueAleatorioEnemigo == 1){
        ataqueEnemigo.push("FUEGO");
    }else if (ataqueAleatorioEnemigo == 3 || ataqueAleatorioEnemigo == 4){
        ataqueEnemigo.push("AGUA");
    }else{
        ataqueEnemigo.push("TIERRA");
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}



function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement("p");
    let nuevoAtaqueDelEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = iAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = iAtaqueEnemigo;

    ataquesDeljugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal; 

    sectionReiniciar.style.display = "flex";
    sectionReiniciar.style.flexDirection = "column";
    sectionReiniciar.style.alignItems = "center";
    
}

function indexAmbosOponentes(jugador, enemigo) {
    iAtaqueJugador = ataqueJugador[jugador];
    iAtaqueEnemigo = ataqueEnemigo[enemigo];
  }

  function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate(); 
    }
} 

function combate(){
    clearInterval(intervalo);

    for(let index = 0; index < ataqueJugador.length; index++){
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index,index);
            crearMensaje("Empate");
        }else if(ataqueJugador[index] ==="FUEGO" && ataqueEnemigo[index] ==="TIERRA"){
            indexAmbosOponentes(index,index);
            crearMensaje("Ganaste");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else if(ataqueJugador[index] ==="AGUA" && ataqueEnemigo[index] ==="FUEGO"){
            indexAmbosOponentes(index,index);
            crearMensaje("Ganaste");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else if(ataqueJugador[index] ==="TIERRA" && ataqueEnemigo[index] ==="AGUA"){
            indexAmbosOponentes(index,index);
            crearMensaje("Ganaste");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else{
            indexAmbosOponentes(index,index);
            crearMensaje("Perdiste");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }

     revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Ganaste el juego😈");
    }else if (victoriasJugador < victoriasEnemigo){
        crearMensajeFinal("Perdiste el juego☠️");
    }else{
        crearMensajeFinal("Empastaste el juego👌")
    }
}

function reiniciarJuego(){
    location.reload() 
}

function aleatorio(min,max){
    return Math.floor(Math.random()* (max - min + 1) + min);
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0,0,mapa.width,mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarBestia();

    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y);

    bestiasEnemigos.forEach(function (bestia){
        bestia.pintarBestia();
        revisarColision(bestia);
    })
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos);
                    let bestiaEnemigo = null;
                    bestiasEnemigos = enemigos.map(function(enemigo){
                        const bestiaNombre = enemigo.bestia.nombre;
                        if(bestiaNombre === "Surixan"){
                            bestiaEnemigo = new Bestia("Surixan","beast1.jpg", 5,"Agua","bestia1.png",enemigo.id);
                        }else if(bestiaNombre === "Lonrot"){
                            bestiaEnemigo = new Bestia ("Lonrot","beast2.jpg", 5,"Fuego","bestia2.png",enemigo.id);
                        }else if(bestiaNombre === "Kinuq"){
                            bestiaEnemigo = new Bestia("Kinuq","beast3.jpg", 5,"Tierra","bestia3.png",enemigo.id);
                        }else if(bestiaNombre === "Roky"){
                            bestiaEnemigo = new Bestia("Roky","bestia6.jpg",5,"Tierra","bestia6.png",enemigo.id);
                        }else if(bestiaNombre === "Perrix"){
                            bestiaEnemigo = new Bestia("Perrix","bestia4.jpg",5,"Agua","bestia4.png",enemigo.id);
                        }else if(bestiaNombre === "Fogo"){
                            bestiaEnemigo = new Bestia("Fogo","bestia5.jpg",5,"Fuego","bestia5.png",enemigo.id); 
                        }
                        bestiaEnemigo.x = enemigo.x;
                        bestiaEnemigo.y = enemigo.y;

                        return bestiaEnemigo;
                    })
                })
        }
    }) 
}


function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5;

}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5;

}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5;

}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5;
  
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case "ArrowUp":
            moverArriba();
            break;
        case "ArrowDown":
            moverAbajo();
            break;
        case "ArrowLeft":
            moverIzquierda();
            break;
        case "ArrowRight":
            moverDerecha();
            break;
        default:
            break;
    }
}


function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    pintarCanvas();
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup",detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < bestias.length; i++) {
        if(mascotaJugador === bestias[i].nombre){
            return bestias[i]
        }
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo||
        izquierdaMascota > derechaEnemigo
    ){
        return;
    }

    detenerMovimiento();
    clearInterval(intervalo);

    enemigoId = enemigo.id;
    sectionSeleccionarAtaque.style.display = "flex";
    sectionSeleccionarAtaque.style.flexDirection = "column";
    sectionSeleccionarAtaque.style.alignItems = "center";
    seccionMensajes.style.display = "flex";
    seleccionarMascotaEnemigo(enemigo);

    sectionVerMapa.style.display ="none";
}



window.addEventListener("load", iniciarJuego)