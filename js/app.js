const express = require('express');
const app = express();


app.get('/eliminar/:id', (req, res) => {
    res.send('¡Hola, mundo con dExpress!');
    const idE = parseInt(req.params.id, 10); // Asegúrate de que el ID sea un número
    // 10 es de base decimal
    console.log(idE);
    eliminar(idE);
});

app.get('/modificar/:id/:nombre/:email/:telefono/:direccion',(req,res)=>{
    console.log("modificar ha entrado");
    const idM=parseInt(req.params.id,10);
    const nombre=req.params.nombre;
    const email=req.params.email;
    //const contrasena=req.params.contrasena;
    //const administrar=req.params.administrar;
    const telefono=req.params.telefono;
    const direccion=req.params.direccion;
    modificar(idM,nombre,email,telefono,direccion);
    
});

app.get('/anadir/:nombre/:email/:telefono/:direccion', (req, res) => {
    console.log("anadir ha entrado");
    //const idA=parseInt(req.params.id,10);
    const nombre=req.params.nombre;
    const email=req.params.email;
    //const contrasena=req.params.contrasena;
    //const administrar=req.params.administrar;
    const telefono=req.params.telefono;
    const direccion=req.params.direccion;
    anadir(nombre,email,telefono,direccion);
});

app.listen(3000,() => {
    console.log('Servidor escuchando en http://localhost:3000');
});


function eliminar(idE){
    const fs=require('fs');
    const path=require('path');

    const archivoJSON = path.join(__dirname, 'informacion.json');

    fs.readFile(archivoJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
        //console.log("Se ha leido el contenido");

        // Parsear el contenido JSON
        let jsonData = JSON.parse(data);


        // El id del usuario que quieres eliminar
        const idEliminar = idE;


        // Filtrar los usuarios para eliminar el usuario con el id especificado
        jsonData.usuarios = jsonData.usuarios.filter(usuario => usuario.id !== idEliminar);


        // Guardar el archivo actualizado
        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return;
            }
            console.log('Usuario eliminado y archivo actualizado');
            //alert("Usuario eliminado y archivo actualizado con éxito");
        });
    });
}

function modificar(idM,nombre,email,telefono,direccion){
    //modificar(idM,nombre,email,contrasena,administrar,telefono,direccion);
    const fs=require('fs');
    const path=require('path');

    const archivoJSON = path.join(__dirname, 'informacion.json');

    fs.readFile(archivoJSON,'utf8',(err,data)=>{
        if(err){
            console.error("Error al leer el archivo: ",err);
            return;
        }


        let jsonData = JSON.parse(data);

        const personas=jsonData.usuarios;

        const idModificar=idM;
        
        
        personas.forEach(usuario => {
            if(idModificar===usuario.id){
                console.log("Usuario encontrado");

                usuario.nombre=nombre;
                usuario.email=email;
                //usuario.contrasena=contrasena;
                //usuario.administrar=administrar;
                usuario.telefono=telefono;
                usuario.direccion=direccion;
            }
        });

        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Archivo actualizado con éxito.");
        });
    });
}

function anadir(nombre,email,telefono,direccion){

    const fs=require('fs');
    const path=require('path');

    const archivoJSON = path.join(__dirname, 'informacion.json');

    fs.readFile(archivoJSON, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo: ", err);
            return;
        }
    
        // Parsear el contenido del archivo
        let jsonData = JSON.parse(data);
    
        // Obtener el arreglo de usuarios
        const personas = jsonData.usuarios;
        let x=1;
        let idA=0;
        let encontrado;

       
        do{
            encontrado=false;
            for(let usuario of personas){
                if(usuario.id===x) {
                    encontrado=true;
                    break;
                }
            }
            if(encontrado)x++;
        }while(encontrado);

        // Crear el nuevo usuario
        const nuevoUsuario = {
            id: x, // Función para generar un ID único
            nombre: nombre, // Reemplaza con el nombre del usuario
            email: email, // Reemplaza con el email del usuario
            contrasena: "123456", // Puedes incluir la contraseña si es necesario
            administrar: false, // Indica si el usuario es administrador
            telefono: telefono, // Reemplaza con el teléfono del usuario
            direccion: direccion// Reemplaza con la dirección del usuario
        };
    
        // Añadir el nuevo usuario al arreglo
        personas.push(nuevoUsuario);
    
        // Guardar los cambios escribiendo en el archivo JSON
        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Usuario añadido con éxito.");
        });
    });

}