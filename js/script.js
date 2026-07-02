const productosContenedor = document.getElementById("productos-contenedor");
const mensajeProductos = document.getElementById("mensaje-productos");

const API_PRODUCTOS = "https://fakestoreapi.com/products/category/electronics";

async function obtenerProductos() {
    try {
        const respuesta = await fetch(API_PRODUCTOS);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        renderizarProductos(productos);
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

obtenerProductos();
