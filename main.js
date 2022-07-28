// GENERANDO CARDS DE PRODUCTOS

// Zapatillas

const mostrarZapatillas = (zapatillas) => {
    const contenedorZapatillas = document.getElementById("contenedor-zapatillas");
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
        contenedorZapatillas.appendChild(card);

        const button = document.getElementById(`button${product.id}`);
        button.addEventListener("click", ()=> {
             carrito(product.id);
        })
            
    })
}

// Zapatos
const mostrarZapatos = (zapatos) => {
    const contenedorZapatos = document.getElementById("contenedor-zapatos");
    zapatos.forEach(product => {
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
        contenedorZapatos.appendChild(card);

        const button = document.getElementById(`button${product.id}`);
        button.addEventListener("click", ()=> {
             carrito(product.id);
        })
            
    })
}

// Otros
const mostrarOtros = (otros) => {
    const contenedorOtros = document.getElementById("contenedor-otros");
    otros.forEach(product => {
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
        contenedorOtros.appendChild(card);

        const button = document.getElementById(`button${product.id}`);
        button.addEventListener("click", ()=> {
             carrito(product.id);
        })
            
    })
}


mostrarZapatillas(zapatillas);
mostrarZapatos(zapatos);
mostrarOtros(otros);


// SIMULADOR CARRITO

const carritoContenedor = document.getElementById("product-rows")

// APLICANDO JSON y STORAGE
function capturarStorage () {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarStorage (carritoNuevo) {
    localStorage.setItem("productos", JSON.stringify(carritoNuevo))
}

// Esto creo que debería ir en una función pero se me quemo la cabeza
carritoSto = capturarStorage()
carritoSto.forEach(product => {
    carritoContenedor.innerHTML += 
        `<div class="prod-row" id="${product.id}">
            <img class="img-carrito" src="${product.img}"/>
            <span>${product.nombre}</span>
            <span class="precio-carrito">$${product.precio}</span>
            <button id="borrar${product.id}" class="remove-btn">Borrar</button>
        </div>`
})

// -----------------------------------------------------------

const shopCarrito = [];

const carrito = (productId) => {
    const mostrarEnCarrito = () => {
        let product = listaProductos.find(product => product.id == productId);
        shopCarrito.push(product);
// localStorage set
        localStorage.setItem("productos", JSON.stringify(shopCarrito));
// ----------------
        let div = document.createElement("div");
        div.innerHTML = 
        `<div class="prod-row" id="${product.id}">
            <img class="img-carrito" src="${product.img}"/>
            <span>${product.nombre}</span>
            <span class="precio-carrito">$${product.precio}</span>
            <button id="borrar${product.id}" class="remove-btn">Borrar</button>
        </div>`
        carritoContenedor.appendChild(div);

        let botonBorrar = document.getElementById(`borrar${product.id}`);
        botonBorrar.addEventListener("click", (e) => {
            borrarProducto(e)
        })
    }

    mostrarEnCarrito();
}


function borrarProducto (e) {
    let botonClick = e.target;
    botonClick.parentElement.remove();
}


// FALTA HACER QUE BOTON BORRAR TMB BORRE
// FALTA AGREGAR EL TOTAL!!!!