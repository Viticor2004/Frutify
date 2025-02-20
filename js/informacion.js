let empleados = [];

fetch('../json/informacion.json')
.then(response=>{
    if(!response.ok){
        throw new Error('Error');
    }
    return response.json();
})
.then(data=>{
    const personas = data.usuarios;
    document.getElementById("formulario").addEventListener("submit", function(event) {
        
        event.preventDefault(); // Evita el envío del formulario
        const valor_nombre = document.getElementById('nombre').value;
        const valor_gmail = document.getElementById('gmail').value;
        const valor_contrasena = document.getElementById('contrasena').value;
        const error = document.getElementById('error');
        let usuarioEncontrado = false;
        let usuario_administrador=false;
        let logeado = false;
        personas.forEach(usuario => {

            let new_empleado = new Empleado(
                id=usuario.id,
                nombre=usuario.nombre,
                email=usuario.email,
                contrasena=usuario.contrasena,
                administrador=usuario.administrar,
                telefono=usuario.telefono,
                direccion=usuario.direccion,
                genero=usuario.genero,
                edad=usuario.edad

            )
                
            empleados.push(new_empleado);

            if (valor_nombre === usuario.nombre && valor_gmail === usuario.email && valor_contrasena === usuario.contrasena) {
                usuarioEncontrado = true;
                if(usuario.administrar===true){
                    usuario_administrador=true;
                }
                logeado = true;                
            }
        });

        definirEmpleados(empleados);
        if (logeado && usuario_administrador) {
            definirUsuarioLogeado(valor_nombre,usuario_administrador,valor_gmail);
            redirigir();
        } else if (logeado && usuario_administrador === false){
            definirUsuarioLogeado(valor_nombre,usuario_administrador,valor_gmail);
            redirigirNoAdmin();
        }

        if (!logeado) {
            //alert("Usuario no encontrado");
            error.innerHTML=`
            <h1>Campos incorrectos</h1>
            `;
        }
    });
    
})
.catch(error=>{
    console.log(error)
});

fetch('../json/productos.json')
    .then(response=>{
        if(!response.ok){
            throw new Error('Error');
        }
            return response.json();
        })
    .then(data=>{
        const productos = data.productos;
        productos.forEach(producto => ({
            nombre: producto.nombre,
            precio: producto.precio,
            tipo: producto.tipo,
            cantidad: producto.cantidad
        }));
        // CALL PRINT FUNCTIONS HERE
        printAllProducts(productos);
    })
    .catch(error=>{
        console.log(error)
    });
function printAllProducts(productos) {
    let table = document.querySelector("#panel_escaparate table:first-of-type");
    // Creamos el encabezado de la tabla
    table.innerHTML = `
        <tr>
            <th></th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Tipo</th>
            <th>Cantidad</th>
        </tr>
    `;
    // Recorremos los productos y los agregamos a la tabla
    productos.forEach(producto => {
        let row = table.insertRow();

        row.innerHTML = `
        <img src="../images/producto_${producto.id}.jpg" class="imagen_aparte">
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.tipo}</td>
        <td>${producto.cantidad}</td>
        <td><button onclick="anadirAlCarrito('${producto.id}')">Comprar</button></td>
        <td><input id="cantidad_${producto.id}" type="number"></td>
        
        `;
        
       
    });
}

var carrito = [];

function anadirAlCarrito(id){
    let id_añadir = 'cantidad_' + id;
    let cantidad_a_añadir = document.getElementById(id_añadir).value;
    
    carrito.push({
        id_producto: id,
        cantidad: cantidad_a_añadir
    })

    console.log(cantidad_a_añadir);
}

function definirEmpleados(empleados) {
    localStorage.setItem('empleados', JSON.stringify(empleados));
}

function definirUsuarioLogeado(valor_nombre,usuario_administrador,valor_gmail) {
    localStorage.setItem('nombre',valor_nombre);
    localStorage.setItem('administrador',usuario_administrador);
    localStorage.setItem('email',valor_gmail);
}

function redirigir() {
    window.location.href = "logueado.html";
}

function redirigirNoAdmin() {
    window.location.href = "logueadoNoAdmin.html";
}
// function getEmpleados() {
//     return empleados;
// }

 