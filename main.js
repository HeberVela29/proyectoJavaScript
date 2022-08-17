let zapatillas;
let zapatos;
let otros;
let listaProductos;

// RECUPERANDO DATOS DEL JSON

fetch("./basededatos.json")
    .then((response) => response.json())
    .then((data) => {
        zapatillas = data[0].slice(0);
        zapatos = data[1].slice(0);
        otros = data[2].slice(0);
        listaProductos = [...zapatillas, ...zapatos, ...otros];
        // GENERANDO CARDS
        const mostrarProductos = (zapatillas, contenedor) => {
            zapatillas.forEach(product => {
                const card = document.createElement("div");
                card.innerHTML +=
                    `<div class="card" id="${product.id}" style="width: 18rem;">
                                    <img src="${product.img}" class="card-img-top" alt="">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.nombre}</h5>
                                        <p class="card-text">$${product.precio}</p>
                                        <button class="btn btn-dark" id= "button${product.id}">Agregar al carrito</button>
                                    </div>
                                </div>`
                contenedor.appendChild(card);

                const button = document.getElementById(`button${product.id}`);
                button.addEventListener("click", () => {
                    carrito(product.id);
                    // TOASTIFY
                    Toastify({
                        text: "Agregaste un producto al carrito :)",
                        duration: 3000,
                        gravity: "bottom",
                        style: {
                            background: "#0f0f0f",
                            borderRadius: "5px",
                            marginBottom: "2em"
                        }
                    }).showToast();
                })
            })
        }
        const contenedorZapatillas = document.getElementById("contenedor-zapatillas");
        mostrarProductos(zapatillas, contenedorZapatillas);

        const contenedorZapatos = document.getElementById("contenedor-zapatos");
        mostrarProductos(zapatos, contenedorZapatos);

        const contenedorOtros = document.getElementById("contenedor-otros");
        mostrarProductos(otros, contenedorOtros);
    })

// SIMULADOR CARRITO

// Guardando y recuperando storage ---------------------------------------------
const carritoContenedor = document.getElementById("product-rows");

function capturarStorage() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarStorage(carritoNuevo) {
    localStorage.setItem("productos", JSON.stringify(carritoNuevo));
}

function iniciarCarrito() {
    let carritoSto = capturarStorage();
    carritoContenedor.innerHTML = "";
    carritoSto.forEach(product => {
        carritoContenedor.innerHTML +=
            `<div class="prod-row" id="${product.id}">
                <img class="img-carrito" src="${product.img}"/>
                <span>${product.cantidad}</span>
                <span>${product.nombre}</span>
                <span class="precio-carrito">$${product.precio * product.cantidad}</span>
                <button id="borrar${product.id}" class="btn btn-dark remove-btn">Borrar</button>
            </div>`
    })
    carritoSto.forEach(product => {
        let botonBorrar = document.getElementById(`borrar${product.id}`);
        botonBorrar.addEventListener("click", (e) => {
            borrarProducto(e);
        })
    })
    pintarTotales();
}

iniciarCarrito();
// ----------------------------------------------------------------------------------


// MOSTRAR productos en carrito ---------------------------------------------------
const carrito = (productId) => {
    const shopCarrito = capturarStorage();
    if (estaEnCarrito(productId)) {
        incrementarCantidad(productId);
    } else {
        let product = listaProductos.find(product => product.id == productId);
        // (spread añadiendo propiedad)
        product = { ...product, cantidad: 1 };
        shopCarrito.push(product);
        localStorage.setItem("productos", JSON.stringify(shopCarrito));
        mostrarEnCarrito(product);
    }
}

const mostrarEnCarrito = (product) => {
    let div = document.createElement("div");
    div.innerHTML =
        `<div class="prod-row" id="${product.id}">
        <img class="img-carrito" src="${product.img}"/>
        <span>${product.cantidad}</span>
        <span>${product.nombre}</span>
        <span class="precio-carrito">$${product.precio}</span>
        <button id="borrar${product.id}" class="btn btn-dark remove-btn">Borrar</button>
    </div>`
    carritoContenedor.appendChild(div);

    pintarTotales();

    let botonBorrar = document.getElementById(`borrar${product.id}`);
    botonBorrar.addEventListener("click", (e) => {
        borrarProducto(e);
    })
}

// CANTIDAD de productos en carrito
function incrementarCantidad(id) {
    let carrito = capturarStorage();
    const indice = carrito.findIndex(e => e.id == id);
    carrito[indice].cantidad++
    guardarStorage(carrito);
    iniciarCarrito();
}

function estaEnCarrito(id) {
    let carrito = capturarStorage();
    return carrito.some(e => e.id == id);
}

// BORRAR productoS
function borrarProducto(e) {
    const shopCarrito = capturarStorage();
    const newCarrito = shopCarrito.filter(prod => prod.id != e.target.id.substring(6));
    guardarStorage(newCarrito);
    let botonClick = e.target;
    botonClick.parentElement.remove();
    pintarTotales();
}

// TOTAL precio de productos
function pintarTotales() {
    const shopCarrito = capturarStorage();
    let totales = shopCarrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    let total = document.getElementById("contenedor-total");
    total.innerHTML =
        `<span>$${totales}</span>`

    //SWEET ALERT en botón comprar 
    let botonComprar = document.getElementById("boton-comprar");
    botonComprar.addEventListener("click", () => {
        if (totales == 0) {
            Swal.fire({
                title: `Por favor, agregue productos al carrito 😥`,
                icon: `warning`
            })
        } else {
            Swal.fire({
                title: '¿Desea continuar?',
                text: `El total de tu compra es: $${totales}`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: `Cancelar`,
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `Gracias por tu compra 😁`,
                        icon: `success`
                    })
                    localStorage.clear();
                    carritoContenedor.innerHTML = "";
                    pintarTotales();
                }
            })
        }
    })
}