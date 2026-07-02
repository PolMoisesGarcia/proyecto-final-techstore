const productosContenedor = document.getElementById("productos-contenedor");
const mensajeProductos = document.getElementById("mensaje-productos");

const carritoContenedor = document.getElementById("carrito-contenedor");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

const API_PRODUCTOS = "https://fakestoreapi.com/products/category/electronics";

let productosDisponibles = [];
let carrito = [];

async function obtenerProductos() {
    try {
        const respuesta = await fetch(API_PRODUCTOS);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        productosDisponibles = productos;
        renderizarProductos(productosDisponibles);
    } catch (error) {
        console.error("Error al obtener productos:", error);

        mensajeProductos.textContent = "No se pudieron cargar los productos. Intentá nuevamente más tarde.";
    }
}

function renderizarProductos(productos) {
    productosContenedor.innerHTML = "";

    productos.forEach((producto) => {
        const card = document.createElement("article");
        card.classList.add("producto-card");

        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>${producto.description}</p>
            <span class="precio">$${producto.price}</span>
            <button class="boton agregar-carrito" type="button" data-id="${producto.id}">
                Agregar al carrito
            </button>
        `;

        productosContenedor.appendChild(card);
    });

    mensajeProductos.textContent = "";
}

function agregarAlCarrito(idProducto) {
    const productoEncontrado = productosDisponibles.find((producto) => producto.id === idProducto);

    if (!productoEncontrado) {
        return;
    }

    const productoEnCarrito = carrito.find((producto) => producto.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: productoEncontrado.id,
            title: productoEncontrado.title,
            price: productoEncontrado.price,
            image: productoEncontrado.image,
            cantidad: 1
        });
    }

    renderizarCarrito();
}

function renderizarCarrito() {
    carritoContenedor.innerHTML = "";

    if (carrito.length === 0) {
        carritoContenedor.innerHTML = `<p class="carrito-vacio">El carrito está vacío.</p>`;
        totalCarrito.textContent = "$0";
        contadorCarrito.textContent = "0";
        return;
    }

    carrito.forEach((producto) => {
        const item = document.createElement("article");
        item.classList.add("carrito-item");

        item.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <div class="carrito-info">
                <h3>${producto.title}</h3>
                <p>Precio: $${producto.price}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${(producto.price * producto.cantidad).toFixed(2)}</p>
            </div>
            <div class="carrito-acciones">
                <button class="boton boton-cantidad" type="button" data-accion="restar" data-id="${producto.id}">-</button>
                <button class="boton boton-cantidad" type="button" data-accion="sumar" data-id="${producto.id}">+</button>
                <button class="boton boton-eliminar" type="button" data-id="${producto.id}">Eliminar</button>
            </div>
        `;

        carritoContenedor.appendChild(item);
    });

    actualizarResumenCarrito();
}

function actualizarResumenCarrito() {
    const total = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.price * producto.cantidad;
    }, 0);

    const cantidadTotal = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.cantidad;
    }, 0);

    totalCarrito.textContent = `$${total.toFixed(2)}`;
    contadorCarrito.textContent = cantidadTotal;
}

function eliminarProducto(idProducto) {
    carrito = carrito.filter((producto) => producto.id !== idProducto);
    renderizarCarrito();
}

function cambiarCantidad(idProducto, accion) {
    const productoEnCarrito = carrito.find((producto) => producto.id === idProducto);

    if (!productoEnCarrito) {
        return;
    }

    if (accion === "sumar") {
        productoEnCarrito.cantidad++;
    }

    if (accion === "restar") {
        productoEnCarrito.cantidad--;

        if (productoEnCarrito.cantidad === 0) {
            eliminarProducto(idProducto);
            return;
        }
    }

    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

productosContenedor.addEventListener("click", (event) => {
    if (event.target.classList.contains("agregar-carrito")) {
        const idProducto = Number(event.target.dataset.id);
        agregarAlCarrito(idProducto);
    }
});

carritoContenedor.addEventListener("click", (event) => {
    const idProducto = Number(event.target.dataset.id);

    if (event.target.classList.contains("boton-eliminar")) {
        eliminarProducto(idProducto);
    }

    if (event.target.classList.contains("boton-cantidad")) {
        const accion = event.target.dataset.accion;
        cambiarCantidad(idProducto, accion);
    }
});

botonVaciarCarrito.addEventListener("click", vaciarCarrito);

obtenerProductos();
renderizarCarrito();