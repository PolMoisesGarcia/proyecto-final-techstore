# TechStore - Proyecto Final Front-End JS

## Descripción

TechStore es un sitio web de e-commerce ficticio de productos tecnológicos, desarrollado como proyecto final del curso Front-End JS de Talento Tech.

El proyecto permite visualizar productos obtenidos desde una API REST, agregarlos a un carrito de compras dinámico, modificar cantidades, eliminar productos, vaciar el carrito y mantener la información guardada mediante LocalStorage.

También incluye un formulario de contacto funcional conectado con Formspree y validado con JavaScript.

## Objetivo del proyecto

El objetivo principal fue construir una página web completa, dinámica e interactiva, aplicando los conocimientos vistos durante el módulo de Front-End JS.

Se trabajaron conceptos de HTML, CSS, JavaScript, DOM, eventos, consumo de API, asincronía, LocalStorage, validación de formularios, diseño responsive, accesibilidad, SEO básico, Git, GitHub y GitHub Pages.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Flexbox
- CSS Grid
- Media Queries
- Google Fonts
- Fetch API
- API REST
- LocalStorage
- JSON
- Formspree
- Git y GitHub
- GitHub Pages

## Funcionalidades principales

- Estructura HTML semántica.
- Diseño responsive adaptable a distintos tamaños de pantalla.
- Consumo de productos desde una API REST.
- Renderizado dinámico de productos en el DOM.
- Traducción/adaptación de títulos y descripciones de productos al español.
- Cards de productos con imagen, título, descripción, precio y botón de compra.
- Carrito de compras dinámico.
- Agregado de productos al carrito.
- Control de productos duplicados mediante cantidad.
- Suma y resta de cantidades.
- Eliminación individual de productos.
- Botón para vaciar el carrito completo.
- Cálculo dinámico del total.
- Contador dinámico de productos en el carrito.
- Persistencia del carrito con LocalStorage.
- Formulario de contacto funcional mediante Formspree.
- Validación del formulario con JavaScript.
- Mensajes de error y confirmación para el usuario.
- SEO básico mediante metaetiquetas.
- Accesibilidad básica con etiquetas semánticas, atributos `alt`, `label` y `aria-label`.

## API utilizada

El proyecto consume productos desde Fake Store API, usando el endpoint de productos electrónicos:

```plaintext
https://fakestoreapi.com/products/category/electronics
```

Los productos se obtienen mediante `fetch()` y se renderizan dinámicamente en la sección de productos.

## Estructura del proyecto

```plaintext
proyecto-final-techstore/
│
├── index.html
├── README.md
│
├── assets/
│   └── img/
│       ├── auriculares.jpg
│       ├── banner.jpg
│       ├── mouse.jpg
│       └── teclado.jpg
│
├── css/
│   └── styles.css
│
└── js/
    └── script.js
```

## Secciones del sitio

- Inicio
- Productos
- Carrito
- Reseñas
- Multimedia
- Contacto

## Detalle de funcionalidades del carrito

El carrito permite:

- Agregar productos desde las cards.
- Aumentar la cantidad de un producto si ya existe en el carrito.
- Restar cantidades.
- Eliminar productos.
- Vaciar todo el carrito.
- Calcular subtotales por producto.
- Calcular el total general de la compra.
- Mostrar un contador actualizado en el menú de navegación.
- Guardar los datos en LocalStorage para que no se pierdan al actualizar la página.

## Formulario de contacto

El formulario incluye los siguientes campos:

- Nombre
- Correo electrónico
- Mensaje

Además, cuenta con validación mediante JavaScript para comprobar que:

- El nombre no esté vacío.
- El correo electrónico tenga un formato válido.
- El mensaje no esté vacío.
- El mensaje tenga una longitud mínima.

El envío de datos se realiza mediante Formspree.

## SEO y accesibilidad

El proyecto incluye:

- Etiquetas semánticas como `header`, `nav`, `main`, `section`, `article` y `footer`.
- Encabezados organizados de forma lógica.
- Metaetiquetas de descripción, palabras clave y autor.
- Atributos `alt` en imágenes.
- Labels asociados a los campos del formulario.
- Botones reales para acciones interactivas.
- `aria-label` en elementos de navegación y formulario.

## Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir el archivo `index.html` con Live Server.
4. Probar la navegación, los productos, el carrito y el formulario.

## Estado del proyecto

Proyecto en desarrollo para entrega final del curso Front-End JS de Talento Tech.

## Autor

Proyecto realizado por Pol Moisés.

## Link del repositorio

Pendiente de publicación en GitHub.

## Link del sitio publicado

Pendiente de publicación en GitHub Pages.