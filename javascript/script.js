//Variables

let palabras=["LUCAS","ABRIL","GABRIEL","CRISTINA","CESAR","VERONICA","ULISES","MELINA","CELESTE","BUYINA","ALFONSINA","CARLOS","ROSA","PEPE","FELICITAS","RITA","JOSE","TOMAS","SANTIAGO","VALENTIN","NESTOR","NELLY"];
//let palabras=["SHELDON","GATO"];
let palabraSecreta;
let vidas=9;
let letrasErroneas=[];
let letrasGanadas=[];
var aciertos=0;
var reg = new RegExp(/[0-9  a-z  á-ý  Á-Ý  ]/g);


//Conecta la parte lógica con la parte visual
var btnNuevoJuego=document.getElementById("btnNuevoJuego");
var btnRendir=document.getElementById("btnRendir");
var lienzo=document.getElementById("Guiones").getContext("2d");
var lienzoHorca=document.getElementById("Horca").getContext("2d");

//Captura los eventos del teclado

addEventListener('keypress',(e)=>{

    if(vidas>=0 && aciertos!=palabraSecreta.length){
        if(filtro(e.key)==true){
        
            if(verificar(e.key)==true){
                dibujarLetraCorrecta(e.key);

                if(aciertos==palabraSecreta.length){
                    dibujarMensajeFinal("win");
                }

            } else {
                dibujarLetraIncorrecta();
            }
    
        }
    }


    
})
// DIBUJO DE LA HORCA

function dibujarHorca(vidasRestantes){

    lienzoHorca.beginPath();
    lienzoHorca.lineWidth=5;
    lienzoHorca.lineCap="round";
    lienzoHorca.lineJoin="round";
    lienzoHorca.strokeStyle="#0A3871";

    switch(vidasRestantes){
        case 9:
            //Trazo base
            lienzoHorca.moveTo(5,450);
            lienzoHorca.lineTo(60,450);
            break;
        case 8:
            // Trazo palo vertical
            lienzoHorca.moveTo(30,450);
            lienzoHorca.lineTo(30,50);
            break;
        case 7:
            // Trazo palo horizontal
            lienzoHorca.moveTo(30,50);
            lienzoHorca.lineTo(160,50);
            break;
        case 6:
            // Trazo palo vertical corto
            lienzoHorca.moveTo(160,50);
            lienzoHorca.lineTo(160,100);
            break;
        case 5:
            // CABEZA
            lienzoHorca.lineWidth=70;
            lienzoHorca.moveTo(160,130);
            lienzoHorca.lineTo(160,130);
            break;
        case 4:
            // TORSO
            lienzoHorca.moveTo(160,130);
            lienzoHorca.lineTo(160,300);
            break;
        case 3:
            // BRAZO IZQUIERDO
            lienzoHorca.moveTo(160,180);
            lienzoHorca.lineTo(130,240);
            break;
        case 2:
            // BRAZO DERECHO
            lienzoHorca.moveTo(160,180);
            lienzoHorca.lineTo(190,240);
            break;
        case 1:
            //PIERNA DERECHA
            lienzoHorca.moveTo(160,300);
            lienzoHorca.lineTo(190,360);
            break;
        case 0:
            //PIERNA IZQUIERDA
            lienzoHorca.moveTo(160,300);
            lienzoHorca.lineTo(130,360); 
            dibujarMensajeFinal("Lose");
            break;
                                                                                                          
    }

    lienzoHorca.stroke();
    lienzoHorca.closePath();
    vidas=vidas-1;
}


//Filtro que detecta mayúsculas y acentos

function filtro(letra){
    let resultadoPrueba;

    if(letra.match(reg)) {
        resultadoPrueba=false;
        alert("Sólo se permiten letras Mayúsculas y sin acento");
        return resultadoPrueba;
    } else {
        resultadoPrueba=true;
        return resultadoPrueba;
    }

}

// Verifica si la letra ingresada es correcta

function verificar(letra) {

    let resultadoPrueba=false;
    let correctaRepetida=false;
    let yaExiste=false;


    // VERIFICA SI LA LETRA ES CORRECTA

    for (let i=0; i<palabraSecreta.length; i++){
        if (letra==palabraSecreta[i]){
            resultadoPrueba=true;
        }
    }

    // VERIFICA SI LA LETRA CORRECTA YA FUÉ INGRESADA

    if(resultadoPrueba==true){


        for (let i=0; i<letrasGanadas.length; i++){
            if (letra==letrasGanadas[i]){
                correctaRepetida=true;
                resultadoPrueba=false;
            }
        }
    
        if(correctaRepetida==false){
            letrasGanadas[letrasGanadas.length]=letra;
        }
    }

    

    // VERIFICA SI LA LETRA ERRONEA YA FUÉ INGRESADA

    if(resultadoPrueba==false && correctaRepetida==false){

        for (let i=0; i<letrasErroneas.length; i++){
            if (letra==letrasErroneas[i]){
                yaExiste=true;
            }
        }

        if(yaExiste==false){
            letrasErroneas[letrasErroneas.length]=letra;
            dibujarHorca(vidas);
        }

    }

    return resultadoPrueba;
}

// RENDIRSE
function rendirse(){

    vidas=9;
    for(i=0;i<=9;i++){
        dibujarHorca(vidas);
    }
}

// INICIAR JUEGO
function init(){

    aciertos=0;
    letrasErroneas=[];
    letrasGanadas=[];
    vidas=9;
    generarPalabra();
    limpiarLienzo(lienzo,1000);
    limpiarLienzo(lienzoHorca,2000);
    dibujarGuiones();
    dibujarLetraIncorrecta();
}

//Almacena las palabras y elige una aleatoriamente

function generarPalabra(){


    let num = Math.floor(Math.random() * palabras.length);;
    palabraSecreta=palabras[num];
    
}

// Dibuja todos los guiones para la palabra

function dibujarGuiones(){
    lienzo.lineWidth=6;
    lienzo.lineCap="round";
    lienzo.lineJoin="round";
    lienzo.strokeStyle="#0A3871";

    lienzo.beginPath();

    let anchura= 300/palabraSecreta.length;

    for(let i=0; i<palabraSecreta.length;i++){
        lienzo.moveTo(5+(anchura*i),100);
        lienzo.lineTo(30+(anchura*i),100);
    }

    lienzo.stroke();
    lienzo.closePath();

}

// DIBUJA LETRA CORRECTA

function dibujarLetraCorrecta(letra){

    lienzo.font = "40px Arial";
    let anchura=300/palabraSecreta.length;

    for(let i=0; i<palabraSecreta.length;i++){
        
        if(letra==palabraSecreta[i]){
            lienzo.fillText(palabraSecreta[i], 5+anchura*i, 90);
            aciertos++;
        }
        
    }

}

// DIBUJAR MENSAJES GANADOR Y DERROTA

function dibujarMensajeFinal(estado){
    
    if (estado=="win"){
        
        lienzoHorca.fillStyle="#3E9E0B";
        lienzoHorca.font= "30px Arial";
        lienzoHorca.fillText("Felicidades! Ganaste",10,520);
    } else {
        lienzoHorca.fillStyle="#FF3131";
        lienzoHorca.font= "30px Arial";
        lienzoHorca.fillText("Has perdido!",75,520);
    }
}

function limpiarLienzo(lienzoALimpiar, ancho){

        lienzoALimpiar.lineWidth=ancho;
        lienzoALimpiar.strokeStyle="#F3F5FC";
        //lienzo.strokeStyle=color;
        lienzoALimpiar.beginPath();
        lienzoALimpiar.moveTo(1100,180);
        lienzoALimpiar.lineTo(0,180);
        lienzoALimpiar.stroke();
        lienzoALimpiar.closePath();

}
// DIBUJAR LETRA INCORRECTA
function dibujarLetraIncorrecta(){

    limpiarLienzo(lienzo,100);

    lienzo.font = "20px Arial";

    let anchura=300/letrasErroneas.length;

    for(let i=0; i<letrasErroneas.length;i++){
        
        lienzo.fillText(letrasErroneas[i], 15+anchura*i, 160);
    }

}

init();
btnNuevoJuego.onclick=init;
btnRendir.onclick=rendirse;
