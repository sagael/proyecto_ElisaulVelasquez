document.addEventListener('DOMContentLoaded', () => {
    const canasto = JSON.parse(localStorage.getItem('canasto')) || [];
    const checkoutTableBody = document.getElementById('checkoutTableBody');
    const cardContenedor = document.getElementById('cards-containers');

    const libros = [
        { imagen: '📕', codigo: 10, titulo: 'El libro rojo', precio: 2100 },
        { imagen: '📗', codigo: 20, titulo: 'La revista verde', precio: 552 },
        { imagen: '📘', codigo: 30, titulo: 'El cuaderno azul', precio: 6530 },
        { imagen: '📒', codigo: 40, titulo: 'La carpeta amarilla', precio: 4525 },
    ];

    function mostrarCard({ imagen, codigo, titulo, precio }) {
        return `<div class="tarjetas">
            <h1>${imagen}</h1>
            <div class="card-title"><p>${titulo}</p></div>
            <div class="card-precio"><p>$ ${precio.toLocaleString("es-CL")}</p></div>
            <button id="${codigo}" class="button button-outline button-add" title="Pulsa para comprar">Comprar</button>
        </div>`;
    }

    if (cardContenedor) {
        libros.forEach(libro => {
            cardContenedor.innerHTML += mostrarCard(libro)
        })
    } 

    function clickComprar() {
        const botonesComprar = document.querySelectorAll("button.button-add");

        botonesComprar.forEach(boton => {
            boton.addEventListener("click", () => {
                const codigoLibro = parseInt(boton.id);
                const libroSeleccionado = libros.find(libro => libro.codigo === codigoLibro);

                if (libroSeleccionado) {
                    canasto.push(libroSeleccionado);
                    localStorage.setItem('canasto', JSON.stringify(canasto));

                    Swal.fire({
                        icon: 'success',
                        title: 'Libro agregado al carrito',
                        text: `${libroSeleccionado.titulo} ha sido agregado al carrito.`,
                    });

                    mostrarEnCheckout();
                }
            });
        });
    }

    function mostrarEnCheckout() {
        if (checkoutTableBody) {
            checkoutTableBody.innerHTML = ''}
            else{
                return
            }

            if (canasto.length > 0) {
                canasto.forEach(libro => {
                    const newRow = checkoutTableBody.insertRow();
                    newRow.innerHTML = `<td>${libro.titulo}</td><td>${libro.codigo}</td><td>$ ${libro.precio.toLocaleString("es-CL")}</td>`;
                })
                
            } 
    }

    clickComprar();
    mostrarEnCheckout();
});
