/*INFO ADMINISTRADOR solo en consola*/

let listaZapatillas = [{nombre: "Nike Cortez", precio: 3000}, {nombre: "Vans Old Skool", precio: 2500}, {nombre: "Adidas Samba", precio: 3000}, {nombre: "New Balance 574", precio: 2500}];

let listaZapatos = [{nombre: "Alden Indy Boot", precio: 4500}, {nombre: "Corthay Arca Derby", precio: 4000}, {nombre: "Edward Green Chelsea", precio: 5000}, {nombre: "John Lobb William II", precio: 4500}];

let listaOtros = [{nombre: "Ojotas Adidas", precio: 1500}, {nombre: "Ojotas Lacoste", precio: 1300}, {nombre: "Havaianas", precio: 1000}, {nombre: "Crocs", precio: 1200}, {nombre: "Pantuflas Selu", precio: 1200}];

listaZapatillas.push({nombre: "Topper", precio: 2500})

// ---------- Agregar producto en consola ----------
class Producto {
    constructor (nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const agregarProd = () => {
    let nombre = prompt("Nombre del producto");
    let precio = prompt("Precio del producto");
    let prod = new Producto (nombre, precio);
    listaProductos.push(prod);
    console.log(listaProductos);
}
// -------------------------------------------------

let listaProductos = listaZapatillas.concat(listaZapatos, listaOtros);
console.log(listaProductos)


/*SIMULADOR DE CARRITO*/

/*Saludo*/

function saludar() {
    let nombre = prompt("¿Cuál es tu nombre?");

    while(nombre == null || nombre == ""){
        alert("Por favor, ingresa tu nombre.");
        nombre = prompt("¿Cuál es tu nombre?");
    }
    alert("Hola " + nombre + "! Bienvenido/a a Vela's Shoes. Tenemos los mejores calzados para vos");
}


/*Simulador*/

let producto = "";
let total = 0;

function carrito() {
    while(producto != "4") {

        /*Lista general*/
        producto = prompt("Por favor, elige que productos deseas comprar:\n 1. Zapatillas\n 2. Zapatos\n 3. Otros\n 4. Finalizar compra");
        switch(producto){

            /*Lista zapatillas*/
            case "1":
                zapatillas = prompt("Elige el modelo de tu interés:\n 1. Nike Cortez $3000\n 2. Vans Old Skool $2500\n 3. Adidas Samba $3000\n 4.New Balance 574 $2500");
                switch(zapatillas){
                    case "1":
                        total += 3000;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "2":
                        total += 2500;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "3":
                        total += 3000;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "4":
                        total += 2500;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    default:
                        alert("Ingresa una opción válida");
                }
            break;
            
            /*Lista zapatos*/
            case "2":
                zapatos = prompt("Elige el modelo de tu interés:\n 1. Alden Indy Boot $4500\n 2. Corthay Arca Derby $4000\n 3. Edward Green Chelsea $5000\n 4. John Lobb William II $4500");
                switch(zapatos){
                    case "1":
                        total += 4500;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "2":
                        total += 4000;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "3":
                        total += 5000;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "4":
                        total += 4500;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    default:
                        alert("Ingresa una opción válida");
                }
            break;

            /*Lista otros*/
            case "3":
                otros = prompt("Elige el modelo de tu interés:\n 1. Ojotas Adidas $1500\n 2. Ojotas Lacoste $1300\n 3. Havaianas $1000\n 4. Crocs $1200\n 5. Pantuflas Selu $1200");
                switch(otros){
                    case "1":
                        total += 1500;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "2":
                        total += 1300;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "3":
                        total += 1000;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "4":
                        total += 1200;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    case "5":
                        total += 1200;
                        alert(`Su compra es: $ ${total}`);
                        break;
                    default:
                        alert("Ingresa una opción válida");
                }
            break;
            
            /*Salida del simulador*/
            case "4":
                alert(`Gracias por tu compra. El monto total es: $ ${total}`);
            break;
            
            /*Ingresos incorrectos*/
            default:
                alert("Ingresa una opción válida");
        }
    }
}

/*Autentificador*/

let valor = prompt("¿Eres administrador?");

while(valor == "No" || valor == "no"){
    saludar();
    carrito();
    break;
}

