// EVENTOS - SIMULADOR CARRITO

const botonAgregar = document.getElementsByClassName("agregar");
console.log(botonAgregar)
for(let boton of botonAgregar){
    boton.addEventListener("click", obtenerDatos)
}


// Obteniendo datos del nodo
function obtenerDatos (e) {
    let boton = e.target;
    let producto = boton.parentElement;
    
    let prodName = producto.querySelector(".nombre").innerText;
    let prodPrice = producto.querySelector(".precio").innerText;
    let imagen = producto.parentElement;
    let prodID = imagen.getAttribute("id");
    let prodImg = imagen.querySelector(".imagen").src;
    agregarCarrito(prodID, prodName, prodPrice, prodImg)
}

// Definiendo elementos a mostrar
function agregarCarrito (prodID, prodName, prodPrice, prodImg) {
    let productRow = document.createElement("div");
    let contenedorRows = document.querySelector(".product-rows");

    let productoCarrito = `
        <div class="prod-row" id="${prodID}">
            <img class="img-carrito" src="${prodImg}"/>
            <span>${prodName}</span>
            <span class="precio-carrito">${prodPrice}</span>
            <button class="remove-btn">Borrar</button>
        </div>
    `
    productRow.innerHTML = productoCarrito;
    contenedorRows.append(productRow);

    let botonesBorrar = productRow.querySelectorAll(".remove-btn");
    for(let boton of botonesBorrar) {
        boton.addEventListener("click", borrarElemento);
    }
}

// Función de remover elementos
function borrarElemento(e) {
    btnBorrar = e.target;
    btnBorrar.parentElement.parentElement.remove();
}

// FALTA AGREGAR EL TOTAL!!!!