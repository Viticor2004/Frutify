let empleados = [];
let carrito = [];

// Cargar usuarios desde JSON
fetch('../json/informacion.json')
.then(response => response.json())
.then(data => {
    const personas = data.usuarios;
    document.getElementById("formulario").addEventListener("submit", function(event) {
        event.preventDefault();
        const valor_nombre = document.getElementById('nombre').value;
        const valor_gmail = document.getElementById('gmail').value;
        const valor_contrasena = document.getElementById('contrasena').value;
        const error = document.getElementById('error');
        let genero;
        let edad;
        let logeado = false;
        let usuario_administrador = false;
        
        personas.forEach(usuario => {
            let new_empleado = {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                contrasena: usuario.contrasena,
                administrador: usuario.administrar,
                telefono: usuario.telefono,
                direccion: usuario.direccion,
                genero: usuario.genero,
                edad: usuario.edad
            };
            empleados.push(new_empleado);
            
            if (valor_nombre === usuario.nombre && valor_gmail === usuario.email && valor_contrasena === usuario.contrasena) {
                logeado = true;
                genero=usuario.genero;
                edad=usuario.edad;
                usuario_administrador = usuario.administrar;
            }
        });
        
        
        if (logeado) {
            definirUsuarioLogeado(valor_nombre, usuario_administrador, valor_gmail,genero,edad);
            usuario_administrador ? redirigir() : redirigirNoAdmin();
        } else {
            error.innerHTML = `<h1>Campos incorrectos</h1>`;
        }
    });
})
.catch(error => console.log(error));

function definirUsuarioLogeado(valor_nombre,usuario_administrador,valor_gmail,genero,edad){
    localStorage.setItem('nombre',valor_nombre);
    localStorage.setItem('administrador',usuario_administrador);
    localStorage.setItem('gmail',valor_gmail);
    localStorage.setItem('genero',genero);
    localStorage.setItem('edad',edad);
}


function redirigirNoAdmin(){
    window.location.href = "/Frutify/html/logueadoNoAdmin.html";
}


// Cargar productos desde JSON
fetch('../json/productos.json')
.then(response => response.json())
.then(data => {
    const productos = data.productos;
    printAllProducts(productos);
})
.catch(error => console.log(error));

function printAllProducts(productos) {
    let table = document.querySelector("#panel_escaparate table");
    table.innerHTML = `
        <tr>
            <th></th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Acción</th>
        </tr>
    `;
    productos.forEach(producto => {
        let row = table.insertRow();
        row.innerHTML = `
            <td><img src="../images/producto_${producto.id}.jpg" class="imagen_aparte"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.tipo}</td>
            <td><input id="cantidad_${producto.id}" type="number" value="1" min="1"></td>
            <td><button onclick="anadirAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio},'${producto.tipo}')">Comprar</button></td>
        `;
    });
}

function toggleCarrito() {
    let carritoDropdown = document.getElementById("carrito-dropdown");
    carritoDropdown.classList.toggle("activo");
}

// Evitar que el carrito se despliegue si el cursor no está sobre el botón
document.addEventListener("click", function (event) {
    let carritoIcono = document.querySelector(".carrito");
    let carritoDropdown = document.getElementById("carrito-dropdown");
    
    if (!carritoIcono.contains(event.target) && !carritoDropdown.contains(event.target)) {
        carritoDropdown.classList.remove("activo");
    }
});

function anadirAlCarrito(id, nombre, precio,tipo) {
    let id_añadir = 'cantidad_' + id;
    let cantidad_a_añadir = document.getElementById(id_añadir).value;

    if (cantidad_a_añadir <= 0) {
        alert("Selecciona una cantidad válida.");
        return;
    }

    // Buscar si el producto ya está en el carrito
    let productoExistente = carrito.find(producto => producto.id_producto === id);

    if (productoExistente) {
        productoExistente.cantidad += parseInt(cantidad_a_añadir);
    } else {
        carrito.push({
            id_producto: id,
            nombre_producto: nombre,
            precio: precio,
            cantidad: parseInt(cantidad_a_añadir),
            tipo:tipo
        });
    }

    actualizarCarrito();
}



function realizarCompra(carrito){
    // Recoger la información del comprador desde el localStorage (puedes ajustarlo según tus necesidades)
    const nombre=localStorage.getItem('nombre');
    const administrador=localStorage.getItem('administrador');
    const gmail=localStorage.getItem('gmail');
    const edad=localStorage.getItem('edad');
    const genero=localStorage.getItem('genero');
    let ventas;

    // Crear un array de ventas a partir del carrito
    ventas = carrito.map((producto) => ({
        id_producto: parseInt(producto.id_producto),
        nombre: producto.nombre_producto,
        cantidad: producto.cantidad,
        cliente: nombre,
        genero: genero, //null
        edad: edad, //null
        fecha_compra: new Date().toLocaleString(), // Fecha de compra actual
        tipo: producto.tipo //null
    }));
    console.log("Las ventas compradas son: ");
    console.log(ventas);

    // Enviar las ventas al backend
    fetch('http://localhost:3000/venta/producto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ventas) // Enviar todas las ventas en el payload
    })
    .then(response => response.json())
    .then(data => {
        alert("Compra realizada con éxito.");
        console.log("Ventas registradas:", data);
        carrito = []; // Vaciar el carrito tras la compra
        actualizarCarrito(); // Actualizar el carrito (ahora vacío)
    })
    .catch(error => {
        alert("Error al realizar la venta.");
        console.error(error);
    });
}
function actualizarCarrito() {
    let carritoContenido = document.getElementById("carrito-contenido");
    carritoContenido.innerHTML = "";

    if (carrito.length === 0) {
        carritoContenido.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let lista = document.createElement("ul");

    carrito.forEach(producto => {
        let item = document.createElement("li");
        item.innerHTML = `${producto.nombre_producto} (x${producto.cantidad}) - $${producto.precio * producto.cantidad}`;
        lista.appendChild(item);
    });

    carritoContenido.appendChild(lista);

    let botonVaciar = document.createElement("button");
    botonVaciar.classList.add("vaciar-carrito");
    botonVaciar.innerText = "Vaciar Carrito";
    botonVaciar.onclick = () => {
        carrito = [];
        actualizarCarrito();
    };

    carritoContenido.appendChild(botonVaciar);

    let botonComprar = document.createElement("button");
    botonComprar.classList.add("comprar-carrito");
    botonComprar.innerText = "Comprar Carrito";
    botonComprar.onclick = () => {

        realizarCompra(carrito);
    };

    carritoContenido.appendChild(botonComprar);
}

