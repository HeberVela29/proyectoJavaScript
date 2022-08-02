// GENERANDO CARDS DE PRODUCTOS

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
        button.addEventListener("click", ()=> {
             carrito(product.id);
        })          
    })
}
const contenedorZapatillas = document.getElementById("contenedor-zapatillas");
mostrarProductos(zapatillas, contenedorZapatillas);

const contenedorZapatos = document.getElementById("contenedor-zapatos");
mostrarProductos(zapatos, contenedorZapatos);

const contenedorOtros = document.getElementById("contenedor-otros");
mostrarProductos(otros, contenedorOtros);


// SIMULADOR CARRITO

// Guardando y recuperando storage ---------------------------------------------
const carritoContenedor = document.getElementById("product-rows")

// (operador ternario)
function capturarStorage () {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarStorage (carritoNuevo) {
    localStorage.setItem("productos", JSON.stringify(carritoNuevo))
}

function iniciarCarrito () {
    const carritoSto = capturarStorage();
    carritoSto.forEach(product => {
        carritoContenedor.innerHTML += 
            `<div class="prod-row" id="${product.id}">
                <img class="img-carrito" src="${product.img}"/>
                <span>${product.cantidad}</span>
                <span>${product.nombre}</span>
                <span class="precio-carrito">$${product.precio}</span>
                <button id="borrar${product.id}" class="remove-btn">Borrar</button>
            </div>`
    })
    carritoSto.forEach(product => {
        let botonBorrar = document.getElementById(`borrar${product.id}`);
        botonBorrar.addEventListener("click", (e) => {
            borrarProducto(e);
        })
    })
}

iniciarCarrito();
// ----------------------------------------------------------------------------------


// Mostrando productos en carrito ---------------------------------------------------
const carrito = (productId) => {
    const mostrarEnCarrito = () => {
        const shopCarrito = capturarStorage();
        let product = listaProductos.find(product => product.id == productId);
// (spread añadiendo propiedad)
        shopCarrito.push({ ...product, cantidad:1});
        localStorage.setItem("productos", JSON.stringify(shopCarrito));

        let div = document.createElement("div");
        div.innerHTML = 
        `<div class="prod-row" id="${product.id}">
            <img class="img-carrito" src="${product.img}"/>
            <span>${product.cantidad}</span>
            <span>${product.nombre}</span>
            <span class="precio-carrito">$${product.precio}</span>
            <button id="borrar${product.id}" class="remove-btn">Borrar</button>
        </div>`
        carritoContenedor.appendChild(div);

        let botonBorrar = document.getElementById(`borrar${product.id}`);
        botonBorrar.addEventListener("click", (e) => {
            borrarProducto(e);
        })
    }
    mostrarEnCarrito();
}


function borrarProducto (e) {
    const shopCarrito = capturarStorage();
    const newCarrito = shopCarrito.filter(prod => prod.id !=e.target.id.substring(6));
    guardarStorage(newCarrito);
    let botonClick = e.target;
    botonClick.parentElement.remove();
}
// -----------------------------------------------------------------------------

// BOTON BORRAR ELIMINA LAS COPIAS DEL MISMO PRODUCTO EN SU TOTALIDAD! SOLUCIONAR AGREGANDO CANTIDAD POR CADA PRODUCTO
// FALTA AGREGAR EL TOTAL!!!!