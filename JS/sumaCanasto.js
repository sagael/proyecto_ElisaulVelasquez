const canasto = JSON.parse(localStorage.getItem('canasto')) || [];
const botonFinalizar = document.querySelector('#boton-enviar')

function sumarTotalCarrito() {
    if (canasto && canasto.length > 0) {
        let totalMonto = canasto.reduce((total, libro) => total + libro.precio, 0)
        
        const precioFinal = document.querySelector('#total-carrito td:nth-child(3)')
        precioFinal.textContent = `$ ${totalMonto.toLocaleString("es-CL")}`
    }
}
sumarTotalCarrito()



botonFinalizar.addEventListener("click", () => {

    if(canasto.length <= 0){
        Swal.fire({
            icon: "error",
            title: "Lo siento",
            text: "El carrito está Vacío",
          })
          .then(()=>{
            window.location.href ='../index.html'
          })
    }
    else{
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: '¡Gracias por tu compra!',
    })
    .then(() => {
        localStorage.removeItem('canasto')

         window.location.href = '../index.html'
    })
}
})
