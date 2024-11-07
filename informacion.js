
fetch('informacion.json')
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
        let administrador=false;
        personas.forEach(usuario => {
            
            if (valor_nombre === usuario.nombre && valor_gmail === usuario.email && valor_contrasena === usuario.contrasena) {
                usuarioEncontrado = true;
                if(usuario.administrar===true){
                    administrador=true;
                }
                
                redirigir(valor_nombre,administrador);
            }
        });

        if (!usuarioEncontrado) {
            //alert("Usuario no encontrado");
            error.innerHTML=`
            <h1>Campos incorrectos</h1>
            `;

        }
    });
})
.catch(error=>{
    console.error('Error',error);
});

function redirigir(valor_nombre,administrador) {  
    // localStorage.setItem('contrasena',valor_contrasena);
    localStorage.setItem('nombre',valor_nombre);
    localStorage.setItem('administrador',administrador);
    // localStorage.setItem('gmail',valor_gmail);
    // Aquí puedes hacer alguna validación si lo necesitas
    // Luego redirigir a otra página
    window.location.href = "logueado.html"; // Cambia esto por la URL que necesites
     // Evita el envío real del formulario
}
