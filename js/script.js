const productosContenedor = document.getElementById("productos-contenedor");
const mensajeProductos = document.getElementById("mensaje-productos");

const carritoContenedor = document.getElementById("carrito-contenedor");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

const API_PRODUCTOS = "https://fakestoreapi.com/products/category/electronics";
const CLAVE_CARRITO = "carritoTechStore";

const traduccionesProductos = {
    9: {
        title: "Disco externo WD 2TB USB 3.0",
        description: "Disco portátil ideal para guardar archivos, trabajos, fotos y copias de seguridad. Compatible con USB 3.0 y USB 2.0."
    },
    10: {
        title: "Disco sólido SanDisk SSD 1TB",
        description: "Unidad SSD interna para mejorar la velocidad de arranque, carga de programas y rendimiento general de una computadora."
    },
    11: {
        title: "Disco sólido Silicon Power SSD 256GB",
        description: "Unidad SSD compacta y rápida, recomendada para mejorar el almacenamiento y la velocidad de respuesta del equipo."
    },
    12: {
        title: "Disco externo WD 4TB para gaming",
        description: "Disco portátil de alta capacidad, ideal para guardar juegos, archivos pesados y ampliar el almacenamiento de una consola o PC."
    },
    13: {
        title: "Monitor Acer 21.5 pulgadas Full HD",
        description: "Monitor Full HD de 21.5 pulgadas, adecuado para estudiar, trabajar, navegar por internet y realizar tareas diarias."
    },
    14: {
        title: "Monitor curvo Samsung 49 pulgadas",
        description: "Monitor curvo ultrawide pensado para gaming, multitarea y experiencias visuales amplias con mayor nivel de inmersión."
    }
};

let productosDisponibles = [];
let carrito = cargarCarritoDesdeLocalStorage();

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
        const productoTraducido = traduccionesProductos[producto.id] || producto;

        const card = document.createElement("article");
        card.classList.add("producto-card");

        card.innerHTML = `
            <img src="${producto.image}" alt="${productoTraducido.title}">
            <h3>${productoTraducido.title}</h3>
            <p>${productoTraducido.description}</p>
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

    actualizarCarrito();
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
    actualizarCarrito();
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

    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
    }

    return [];
}

function actualizarCarrito() {
    guardarCarritoEnLocalStorage();
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

const formularioContacto = document.getElementById("formulario-contacto");
const mensajeFormulario = document.getElementById("mensaje-formulario");

function validarEmail(email) {
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionEmail.test(email);
}

function validarFormularioContacto(event) {
    const nombre = formularioContacto.nombre.value.trim();
    const email = formularioContacto.email.value.trim();
    const mensaje = formularioContacto.mensaje.value.trim();

    mensajeFormulario.textContent = "";
    mensajeFormulario.className = "mensaje-formulario";

    if (nombre === "") {
        event.preventDefault();
        mensajeFormulario.textContent = "Por favor, ingresá tu nombre.";
        mensajeFormulario.classList.add("error");
        return;
    }

    if (email === "") {
        event.preventDefault();
        mensajeFormulario.textContent = "Por favor, ingresá tu correo electrónico.";
        mensajeFormulario.classList.add("error");
        return;
    }

    if (!validarEmail(email)) {
        event.preventDefault();
        mensajeFormulario.textContent = "Por favor, ingresá un correo electrónico válido.";
        mensajeFormulario.classList.add("error");
        return;
    }

    if (mensaje === "") {
        event.preventDefault();
        mensajeFormulario.textContent = "Por favor, escribí un mensaje.";
        mensajeFormulario.classList.add("error");
        return;
    }

    if (mensaje.length < 10) {
        event.preventDefault();
        mensajeFormulario.textContent = "El mensaje debe tener al menos 10 caracteres.";
        mensajeFormulario.classList.add("error");
        return;
    }

    mensajeFormulario.textContent = "Formulario válido. Enviando mensaje...";
    mensajeFormulario.classList.add("exito");
}

formularioContacto.addEventListener("submit", validarFormularioContacto);