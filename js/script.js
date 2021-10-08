alert("Bienvenido al ahorcado. Escribe la palabra y pulsa jugar. Escribe la letra que quieres buscar y da a espacio para saber si has fallado o acertado");

function soloLetras(event) {
    var key = event.keyCode;
    if ((key >= 65 && key <= 90) || key == 8 || key == 192) {
    }
    //Devuelve cualquier letra, incluso el delete para poder borrar la cadena
    return ((key >= 65 && key <= 90) || key == 8 || key == 192)
        ;
};

//Variables
var palabra = document.getElementById("palabra");
var aciertos = document.getElementById("aciertos");
var fallos = document.getElementById("fallos");
var contadorFallos = document.getElementById("contadorFallos");
var inputLetra = document.getElementById("letra");
var guiones;
var estaJugando = false;
var contFallos = 0;
var juegoGanado = false;

//Cuando se escriba la letra ejecuta la función de buscar
inputLetra.addEventListener("keyup",function(){
    if (estaJugando && aciertos.value != "") {
        buscarCaracter();
    }
},false);

//Función que escribe los guiones
function jugar() {
    estaJugando = true;
    guiones = palabra.value.replace(/[a-z]/gi, "-");
    aciertos.value = guiones;
    //Esto hace que una vez que el juego empiece no se pueda modificar la palabra
    palabra.readOnly = true;
};

//Función que busca los caracteres y verifica si se ha acertado o no
function buscarCaracter() {
    var caracter = inputLetra.value;
    if (caracter == "") {
        alert("No hay caracter");
        return
    }
    var caracterBuscar = caracter.toUpperCase();
    var palabraMayus = palabra.value.toUpperCase();
    var posicion = palabraMayus.indexOf(caracterBuscar);

    /*Conversión del input de los aciertos en un array de caractéres para poder sustituir
    el carácter encontrado por el guión a través de un sencillo = */
    var aciertosResueltos = Array.from(aciertos.value);

    for (let index = 0; index < palabra.value.length; index++) {

        if (palabraMayus.charAt(index) == caracterBuscar) {
            aciertosResueltos[index] = caracterBuscar;
        }

    }
    //Conversión de nuevo del array de caractéres en un string
    aciertos.value = aciertosResueltos.join("");

    //Esta cadena de ifs verifica si el carácter no existe
    if (posicion == -1) {

        var repetido = false;

        //Bucle con if para saber si el carácter está repetido o no en la lista de fallos
        for (let index = 0; index < fallos.value.length; index++) {
            if (fallos.value.toUpperCase().charAt(index) == caracterBuscar) {
                repetido = true;
                alert("Ese carácter ya lo has buscado anteriormente y has fallado");
            }
        }
        //Suma el contador de fallos y lo escribe en el HTML
        if (!repetido) {
            fallos.value = fallos.value.concat(caracterBuscar);
            contFallos++;
            console.log(contFallos);
            contadorFallos.innerHTML = contFallos;
        }
    }
    inputLetra.value=null;
    //Comprobar si se ha acabado el juego
    seAcaba();
}

function seAcaba() {
    //Mas de 5 fallos se pierde y se refresca la página
    if (contFallos >= 5) {
        alert("HAS PERDIDO :( La palabra era " + palabra.value);
        location.reload();
    }
    //Si no encuentra guiones, es decir, si se ha ganado, sale una alerta y se refresca la página
    if (aciertos.value.indexOf('-') == -1) {
        alert("HAS GANADO! :)");
        setTimeout(function () {
            location.reload();
        }, 600);
    }
}
