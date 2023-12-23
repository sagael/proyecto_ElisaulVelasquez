saludoInicio()

function saludoInicio() {
    let saludo = confirm("bienvenido, deseas consultar algun libro?") 
    if(saludo){
        libroDisponible()
    }  
    else{
        alert("Adios, vuelve pronto")
    } 
}
function libroDisponible() {
    let consultaLibro;

    while (true) {
        consultaLibro = prompt("Ingresa el código del libro");

        if (consultaLibro === null) {
            alert("Has cancelado. Adios");
            break; 
        } else if (consultaLibro === "") {
            alert("No ingresaste ningún dato. Por favor, ingresa un código.");
        } else {
            consultaLibro = parseInt(consultaLibro);

            if (isNaN(consultaLibro)) {
                alert("Ingresaste un dato no válido. Por favor, ingresa un código válido.");
            } else {
                if (consultaLibro !== 10 && consultaLibro !== 20 && consultaLibro !== 30 && consultaLibro !== 40) {
                    alert("El libro no está disponible");
                } else {
                    alert("El libro está disponible");
                }
                break;
            }
        }
    }
}


