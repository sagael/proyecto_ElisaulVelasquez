document.addEventListener('DOMContentLoaded', () => {
    const canasto = JSON.parse(localStorage.getItem('canasto')) || []
    const checkoutTableBody = document.getElementById('checkoutTableBody')
    const cardContenedor = document.getElementById('cards-containers')

    const libros = []
    const URL = "JS/productos.json"
    

    function mostrarCard({ imagen, codigo, titulo, precio }) {
        return `<div class="tarjetas">
            <h1>${imagen}</h1>
            <div class="card-title"><p>${titulo}</p></div>
            <div class="card-precio"><p>$ ${precio.toLocaleString("es-CL")}</p></div>
            <button id="${codigo}" class="button button-outline button-add" title="Pulsa para comprar">Comprar</button>
        </div>`
    }
    if (cardContenedor) {
        libros.forEach(libro => {
            cardContenedor.innerHTML += mostrarCard(libro)
        })
    } 
    function mostrarLibros(){
        fetch(URL)
        .then((response) => response.json())
        .then((data)=> libros.push(...data))
        .then(()=> cargarLibros(libros) )
        .then(()=> clickComprar())
    }

    mostrarLibros()

    function cargarLibros(array){
        if (array.length > 0) {
            cardContenedor.innerHTML = ""
    
            array.forEach((libro)=> {
                cardContenedor.innerHTML += mostrarCard(libro)
            })
        } else {
            return
        }
    }
    

    function clickComprar() {
        const botonesComprar = document.querySelectorAll("button.button-add")

        botonesComprar.forEach(boton => {
            boton.addEventListener("click", () => {
                const codigoLibro = parseInt(boton.id)
                const libroSeleccionado = libros.find(libro => libro.codigo === codigoLibro)

                if (libroSeleccionado) {
                    canasto.push(libroSeleccionado)
                    localStorage.setItem('canasto', JSON.stringify(canasto))

                    Swal.fire({
                        icon: 'success',
                        title: 'Libro agregado al carrito',
                        text: `${libroSeleccionado.titulo} ha sido agregado al carrito.`,
                    })

                    mostrarEnCheckout()
                }
            });
        });
    }

    function mostrarEnCheckout() {
        if (checkoutTableBody) {
            checkoutTableBody.innerHTML = ''
        }
        else {
            return
        }

        if (canasto.length > 0) {
            canasto.forEach(libro => {
                const newRow = checkoutTableBody.insertRow()
                newRow.innerHTML = `<td>${libro.titulo}</td><td>${libro.codigo}</td><td>$ ${libro.precio.toLocaleString("es-CL")}</td>`;
            })

        }
    }

    clickComprar()
    mostrarEnCheckout()
})


