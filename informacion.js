let empleados = [];

fetch('informacion.json')
.then(response=>{
    if(!response.ok){
        throw new Error('Error');
    }
    return response.json();
})
.then(data=>{
    console.log("CACA4");
    const personas = data.usuarios;

    document.getElementById("formulario").addEventListener("submit", function(event) {
        
        console.log("CACA3");
        event.preventDefault(); // Evita el envío del formulario

        const valor_nombre = document.getElementById('nombre').value;
        const valor_gmail = document.getElementById('gmail').value;
        const valor_contrasena = document.getElementById('contrasena').value;
        const error = document.getElementById('error');

        let usuarioEncontrado = false;
        let usuario_administrador=false;
        let logeado = false;

        personas.forEach(usuario => {
            
            console.log("CACA2");
            console.log(usuario);

            let new_empleado = new Empleado(
                id=usuario.id,
                nombre=usuario.nombre,
                email=usuario.email,
                contrasena=usuario.contrasena,
                administrador=usuario.administrar,
                telefono=usuario.telefono,
                direccion=usuario.direccion,
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

        console.log(empleados);
        definirEmpleados(empleados);
        if (logeado) {
            console.log("CACA1");
            definirUsuarioLogeado(valor_nombre,usuario_administrador);
            redirigir();
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

function definirEmpleados(empleados) {
    localStorage.setItem('empleados', JSON.stringify(empleados));
}

function definirUsuarioLogeado(valor_nombre,usuario_administrador) {
    localStorage.setItem('nombre',valor_nombre);
    localStorage.setItem('administrador',usuario_administrador);
}

function redirigir() {
    window.location.href = "logueado.html";
}

// function getEmpleados() {
//     return empleados;
// }
