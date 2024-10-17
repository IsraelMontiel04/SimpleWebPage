let iconoCarrito = document.getElementById('icono-carrito');
let productosEnCarrito = document.getElementById('productos-en-carrito');

let contenedorProductos = document.querySelector('.contenedor-productos');
let contenedorCarrito = document.querySelector('.contenedor-carrito');
let precioTotal = document.querySelector('.precio-total');
let totalProductos = document.querySelector('.total-productos')

let compras = [];
let contadorProductos = 0;
let totalCarrito = 0;


iconoCarrito.addEventListener('click', function mostrarCarrito(){
    productosEnCarrito.style.display = "block"

});

cerrar = document.getElementById("cerrar");
cerrar.addEventListener('click', function botonCerrar(){
    productosEnCarrito.style.display = 'none'
})

contenedorProductos.addEventListener('click', function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('boton-añadir-carrito')){
        const productosSeleccionado = e.target.parentElement;
        recuperarContenido(productosSeleccionado);
    }
})

contenedorCarrito.addEventListener('click', function eliminarProducto(e){
    if(e.target.classList.contains('eliminar-producto')){
        const idEliminar = e.target.getAttribute('data-id')

        compras.forEach(value =>{
            if(value.id == idEliminar){
                let eliminarPrecio = parseInt(value.precio) * parseInt(value.cantidad);
                totalCarrito = totalCarrito - eliminarPrecio
            }
        });
        compras = compras.filter(producto => producto.id !== idEliminar);
        contadorProductos --;
    }

    if(compras.length === 0){
        precioTotal.innerHTML = 0;
        totalProductos.innerHTML = 0;
    }
    comprasHtml();
});

function recuperarContenido(producto){
    const informacionProducto = {
        imagen: producto.querySelector("div img").src,
        titulo: producto.querySelector(".titulo-producto").textContent,
        precio: producto.querySelector('.precio-producto').textContent,
        id: producto.querySelector('a').getAttribute("data-id"),
        cantidad: 1
    }

    totalCarrito = totalCarrito + parseInt(informacionProducto.precio);

    const validarId = compras.some(producto => producto.id === informacionProducto.id);

    if(validarId){
        const nuevoCarrito = compras.map(producto =>{
            if(producto.id === informacionProducto.id){
                producto.cantidad++;
                return producto;
            }else{
                return producto;
            }
        });
        compras = nuevoCarrito;
    }else{
        compras = [...compras, informacionProducto];
        contadorProductos ++;
    }
    comprasHtml();
}

function comprasHtml(){
    limpiarCarrito();
    compras.forEach(producto => {
        const {imagen, titulo, precio, id, cantidad} = producto;
        const productosCarrito = document.createElement('div');
        productosCarrito.classList.add('producto-carrito');
        productosCarrito.innerHTML = `
            <img src="${imagen}" alt="Mate imperial premium cincelado">
            <div class="contenido-producto">
                <h5>${titulo}</h5>
                <h5 class="precio-carrito">$${precio}</h5>
                <h6>Cantidad: ${cantidad}</h6>
            </div>
            <span data-id="${id}" class="eliminar-producto" ><i class="fa-solid fa-trash eliminar-producto" data-id="${id}"></i></span>
        `
        contenedorCarrito.appendChild(productosCarrito);
        precioTotal.innerHTML = totalCarrito;
        totalProductos.innerHTML = contadorProductos;
    })
}

const limpiarCarrito=()=>{
    contenedorCarrito.innerHTML = '';
}

