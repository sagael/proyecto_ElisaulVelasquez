const canasto = []

const libros = [{codigo: 10, titulo: 'El libro rojo', precio:2100},
                {codigo: 20, titulo: 'La revista verde', precio:552},
                {codigo: 30, titulo: 'El cuaderno azul', precio:6530},
                {codigo: 40, titulo: 'La carpeta amarilla', precio:4525}, ]

saludoInicio()

function saludoInicio(){
    let saludo = confirm("Bienvenido, deseas consultar algun libro?")
    if(!saludo){
        alert("Has cancelado, Vuelve pronto.")
    }
    else{
        ingresaCodigo()
    }
}

function ingresaCodigo(){
    let codigoProducto = prompt("Ingresa el coódigo del libro")
    let libroEncontrado = libros.find(libro=> libro.codigo === parseInt(codigoProducto))
    if(libroEncontrado){
        alert(`Libro encontrado: ${libroEncontrado.titulo}`)
        canasto.push(libroEncontrado)
        mostrarCanasto()
    }
    else if(codigoProducto === null){
        alert("Has cancelado, vuelve pronto")
        return
    }
    else{
        alert("Libro no disponible, ingresa otro código.")
        ingresaCodigo()
        return
    }

    let continuaCompra = confirm("Deseas agregar otro libro?")
    if(continuaCompra){
        ingresaCodigo()
    }
    else{
        finalizaCompra()
    }
}

function mostrarCanasto() {
    console.clear()
    console.table(canasto)
}
function finalizaCompra() {
    let totalCompra = canasto.reduce((total, libro) => total + libro.precio, 0);

    console.clear()
    console.table(canasto)
    console.log("🛍️ El costo total de tu compra es: $ " + totalCompra);
    console.log("Muchas gracias por tu compra.")
}