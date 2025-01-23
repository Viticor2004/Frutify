const express = require('express');
const { defaultMaxListeners } = require('stream');
const app = express();




app.get('/eliminar/:id', (req, res) => {
    res.send('¡Hola, mundo con dExpress!');
    const idE = parseInt(req.params.id, 10); // Asegúrate de que el ID sea un número
    // 10 es de base decimal
    console.log(idE);
    eliminar(idE);
});




app.get('/modificar/usuario/:id/:nombre/:email/:telefono/:direccion',(req,res)=>{
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


app.get('/comprar/producto/:nombre_fruta/:cantidad_fruta/:cliente_fruta/:nombre_verdura/:cantidad_verdura/:cliente_verdura', (req, res) => {
   
    const nombre_fruta=req.params.nombre_fruta;
    const cantidad_fruta=req.params.cantidad_fruta;
    const cliente_fruta=req.params.cliente_fruta;
    const nombre_verdura=req.params.nombre_verdura;
    const cantidad_verdura=req.params.cantidad_verdura;
    const cliente_verdura=req.params.cliente_verdura;
    //const usuario=req.params.usuario;
    // const genero=req.params.genero;
   
    actualizarProducto(nombre_fruta,cantidad_fruta,nombre_verdura,cantidad_verdura,cliente_fruta,cliente_verdura);
});

app.get('/anadir/fruta/:nombre_fruta/:cantidad_fruta', (req, res) => {
   
    const nombre_fruta=req.params.nombre_fruta;
    const cantidad_fruta=req.params.cantidad_fruta;
    anadirFruta(nombre_fruta,cantidad_fruta);
});

app.get('/anadir/verdura/:nombre_verdura/:cantidad_verdura', (req, res) => {
    
    const nombre_verdura=req.params.nombre_verdura;
    const cantidad_verdura=req.params.cantidad_verdura;
    anadirVerdura(nombre_verdura,cantidad_verdura);
});

app.get('/eliminar/fruta/:nombre_fruta', (req, res) => {
    
    const nombre_fruta=req.params.nombre_fruta;
    eliminarFruta(nombre_fruta);
});

app.get('/eliminar/verdura/:nombre_verdura', (req, res) => {
   
    const nombre_verdura=req.params.nombre_verdura;
    eliminarVerdura(nombre_verdura);
});

app.get('/modificar/stock_fruta/:nombre_fruta/:cantidad_fruta', (req, res) => {
    
    const nombre_fruta=req.params.nombre_fruta;
    const cantidad_fruta=req.params.cantidad_fruta;
    modificarStockFruta(nombre_fruta,cantidad_fruta);
});

app.get('/modificar/stock_verdura/:nombre_verdura/:cantidad_verdura', (req, res) => {
    
    const nombre_verdura=req.params.nombre_verdura;
    const cantidad_verdura=req.params.cantidad_verdura;
    modificarStockVerdura(nombre_verdura,cantidad_verdura);
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
function actualizarProducto(nombre_fruta,cantidad_fruta,nombre_verdura,cantidad_verdura,cliente_fruta,cliente_verdura){
    const fs=require('fs');
    const path=require('path');


    const archivoJSON = path.join(__dirname, 'stock.json');
    const archivoVentasJSON=path.join(__dirname,'ventas.json');




    fs.readFile(archivoJSON,'utf8',(err,data)=>{
        if(err){
            console.error("Error al leer el archivo: ",err);
            return;
        }




        let jsonData = JSON.parse(data);


        const frutas=jsonData.frutas;
        const verduras=jsonData.verduras;
       
        frutas.forEach(fruta => {
            if(nombre_fruta===fruta.nombre){
                fruta.cantidad-=cantidad_fruta;
            }
        });




        verduras.forEach(verdura => {
            if(nombre_verdura===verdura.nombre){
                verdura.cantidad-=cantidad_verdura;
            }
        });


        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Archivo actualizado con éxito.");
        });






        const archivoJSONRegistrar=path.join(__dirname,'registrar_stock.json');
        const cantidad_frutaInt=parseInt(cantidad_fruta);
        const cantidad_verduraInt=parseInt(cantidad_verdura);


        const fechaActual=new Date();
        const fechaCreada=fechaActual.getFullYear()+"/"+fechaActual.getMonth()+"/"+fechaActual.getDay()+" "+fechaActual.getHours()+":"+fechaActual.getMinutes()+":"+fechaActual.getSeconds();




        const registroFruta=[
            {
                "nombre":nombre_fruta,
                "cantidad":cantidad_frutaInt,
                "fecha":fechaCreada
            }
        ];
        const registroVerdura=[
            {
                "nombre":nombre_verdura,
                "cantidad":cantidad_verduraInt,
                "fecha":fechaCreada
            }
        ];


        const jsonDataRegistrar={
            frutas:registroFruta,
            verduras:registroVerdura
        };


       
        fs.writeFile(archivoJSONRegistrar, JSON.stringify(jsonDataRegistrar, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Archivo actualizado con éxito.");
        });


       
    });


    fs.readFile(archivoVentasJSON,'utf8',(err,data)=>{
        if(err){
            console.error("Error al leer el archivo: ",err);
            return;
        }




        let jsonData = JSON.parse(data);




        const fechaActual=new Date();
        const fechaCreada=fechaActual.getFullYear()+"/"+fechaActual.getMonth()+"/"+fechaActual.getDay()+" "+fechaActual.getHours()+":"+fechaActual.getMinutes()+":"+fechaActual.getSeconds();




        if(cantidad_fruta>0){
            const cantidad_frutaInt=parseInt(cantidad_fruta);
            const registroFruta=[
                {
                    "producto":nombre_fruta,
                    "cantidad":cantidad_frutaInt,
                    "comprador":cliente_fruta,
                    "genero":genero,
                    "fecha_compra":fechaCreada
                }
            ];
            jsonData.frutas_anuales.push(registroFruta);
        }
        if(cantidad_verdura>0){
            const cantidad_verduraInt=parseInt(cantidad_verdura);
            const registroVerdura=[
                {
                    "producto":nombre_verdura,
                    "cantidad":cantidad_verduraInt,
                    "comprador":cliente_verdura,
                    "genero":genero,
                    "fecha_compra":fechaCreada
                }
            ];
            jsonData.verduras_anuales.push(registroVerdura);
        }


       
        fs.writeFile(archivoVentasJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Archivo de ventas actualizado con éxito.");
        });






    });


}
function anadirFruta(nombre_fruta,cantidad_fruta){
    const fs=require('fs');
    const path=require('path');

    const archivoJSON = path.join(__dirname, 'stock.json');


   
    fs.readFile(archivoJSON, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo: ", err);
            return;
        }
        let jsonData = {};
        if (data) {
            jsonData = JSON.parse(data);
        }
        
        let x=1;
        let encontrado = false;

        const frutasEncontrar=jsonData.frutas;
        const verdurasEncontrar=jsonData.verduras;

       
        do{
            for(let fruta of frutasEncontrar){
                if(fruta.id===x) {
                    encontrado=true;
                    break;
                }
            }
            if(encontrado)x++;
        }while(encontrado);

    
        do{
            for(let verdura of verdurasEncontrar){
                if(verdura.id===x) {
                    encontrado=true;
                    break;
                }
            }
            if(encontrado)x++;
        }while(encontrado);

        const cantidad_frutaInt=parseInt(cantidad_fruta);

        const registroFruta = [
            {
                "id":x,
                "nombre": nombre_fruta,
                "cantidad": cantidad_frutaInt
            }
        ];


        jsonData.frutas.push(...registroFruta);
       
        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Archivo actualizado con éxito.");
        });
    });
}

function anadirVerdura(nombre_verdura,cantidad_verdura){
    const fs=require('fs');
    const path=require('path');

    const archivoJSON = path.join(__dirname, 'stock.json');


   
    fs.readFile(archivoJSON, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo: ", err);
            return;
        }
        let jsonData = {};
        if (data) {
            jsonData = JSON.parse(data);
        }
        
        let x=1;
        let encontrado = false;

        const frutasEncontrar=jsonData.frutas;
        const verdurasEncontrar=jsonData.verduras;

        
        do{
            for(let fruta of frutasEncontrar){
                if(fruta.id===x) {
                    encontrado=true;
                    break;
                }
            }
            if(encontrado)x++;
        }while(encontrado);

        do{
            for(let verdura of verdurasEncontrar){
                if(verdura.id===x) {
                    encontrado=true;
                    break;
                }
            }
            if(encontrado)x++;
        }while(encontrado);


        const cantidad_verduraInt=parseInt(cantidad_verdura);

        const registroVerdura = [
            {
                "id":x,
                "nombre": nombre_verdura,
                "cantidad": cantidad_verduraInt
            }
        ];
        

        jsonData.verduras.push(...registroVerdura);
       
        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Archivo actualizado con éxito.");
        });
    });

}

function eliminarFruta(nombre_fruta){
    const fs=require('fs');
    const path=require('path');


    const archivoJSON = path.join(__dirname, 'stock.json');


    fs.readFile(archivoJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
        let jsonData = JSON.parse(data);
       
        jsonData.frutas = jsonData.frutas.filter(fruta => fruta.nombre !== nombre_fruta);
        // Guardar el archivo actualizado
        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return;
            }
            console.log('Verdura y fruta eliminado y archivo actualizado');
           
        });
    });
}

function eliminarVerdura(nombre_verdura){
    const fs=require('fs');
    const path=require('path');


    const archivoJSON = path.join(__dirname, 'stock.json');


    fs.readFile(archivoJSON, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
        let jsonData = JSON.parse(data);
        jsonData.verduras = jsonData.verduras.filter(verdura => verdura.nombre !== nombre_verdura);
        // Guardar el archivo actualizado
        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return;
            }
            console.log('Verdura y fruta eliminado y archivo actualizado');
           
        });
    });
}

function modificarStockFruta(nombre_fruta,cantidad_fruta){
   
    const fs=require('fs');
    const path=require('path');
    const archivoJSON = path.join(__dirname, 'stock.json');
    
    fs.readFile(archivoJSON,'utf8',(err,data)=>{
        if(err){
            console.error("Error al leer el archivo: ",err);
            return;
        }

        let jsonData = JSON.parse(data);

        const cantidad_frutaInt=parseInt(cantidad_fruta);

        jsonData.frutas.forEach(fruta => {
            if(fruta.nombre===nombre_fruta){
                fruta.cantidad=cantidad_frutaInt;
            }
        });

        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Stock modificado con éxito");
        });
    });
}

function modificarStockVerdura(nombre_verdura,cantidad_verdura){
   
    const fs=require('fs');
    const path=require('path');
    const archivoJSON = path.join(__dirname, 'stock.json');
    
    fs.readFile(archivoJSON,'utf8',(err,data)=>{
        if(err){
            console.error("Error al leer el archivo: ",err);
            return;
        }

        let jsonData = JSON.parse(data);

        const cantidad_verduraInt=parseInt(cantidad_verdura);

        jsonData.verduras.forEach(verdura => {
            if(verdura.nombre===nombre_verdura){
                verdura.cantidad=cantidad_verduraInt;
            }
        });

        fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Stock modificado con éxito");
        });
    });
}
