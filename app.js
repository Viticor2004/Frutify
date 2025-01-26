const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const { captureRejectionSymbol } = require('events');
const { LocalStorage } = require('node-localstorage');
const { loadEnvFile } = require('process');
const { strict } = require('assert');
const localStorage = new LocalStorage('./miDirectorioDeStorage');
app.use(cors());
app.use(express.json());


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


app.get('/anadir/:nombre/:email/:telefono/:direccion/:genero/:edad', (req, res) => {
    console.log("anadir ha entrado");
    //const idA=parseInt(req.params.id,10);
    const nombre=req.params.nombre;
    const email=req.params.email;
    //const contrasena=req.params.contrasena;
    //const administrar=req.params.administrar;
    const telefono=req.params.telefono;
    const direccion=req.params.direccion;
    const genero=req.params.genero;
    const edad=req.params.edad;
    anadir(nombre,email,telefono,direccion, genero, edad);
});


app.post('/comprar/producto', (req, res) => {
    
    // Extraer los datos del payload
    const { frutas, verduras } = req.body;
    // Llamar a la función realizarVenta con los datos extraídos
    
    realizarVenta(frutas,verduras);

    // Responder al cliente con éxito
    res.status(200).json({ message: 'Venta realizada con éxito' });
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


function anadir(nombre,email,telefono,direccion, genero, edad){


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
            direccion: direccion, // Reemplaza con la dirección del usuario
            genero: genero,
            edad: edad
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

function realizarVenta(frutas,verduras){
    const fs=require('fs');
    const path=require('path');
    
    console.log("hola que tal todo: ");

    localStorage.setItem('frutas', JSON.stringify(frutas));
    localStorage.setItem('verduras', JSON.stringify(verduras));


    let cliente_fruta_genero,cliente_fruta_edad;
    let cliente_verdura_genero,cliente_verdura_edad;

    let id_fruta;
    let id_verdura;

    const archivoCliente=path.join(__dirname,'informacion.json');
    const archivoStock=path.join(__dirname,'stock.json');

    fs.readFile(archivoCliente,'utf8',(err,data)=>{
        if(err){
            console.error("Error al leer el archivo: ",err);
            return;
        }

        let jsonData = JSON.parse(data);

        jsonData.usuarios.forEach(usuario => {
            if(usuario.nombre===frutas.cliente){
                cliente_fruta_genero=usuario.genero;
                cliente_fruta_edad=usuario.edad;
                
            }
            if(usuario.nombre===verduras.cliente){
                cliente_verdura_genero=usuario.genero;
                cliente_verdura_edad=usuario.edad;
            }  
        });

        localStorage.setItem('cliente_fruta_genero',cliente_fruta_genero);
        localStorage.setItem('cliente_fruta_edad',cliente_fruta_edad);
        localStorage.setItem('cliente_verdura_genero',cliente_verdura_genero);
        localStorage.setItem('cliente_verdura_edad',cliente_verdura_edad);

        

    });

    fs.readFile(archivoStock,'utf8',(err,data)=>{

        if(err){
            console.error("Error al leer el archivo: ",err);
            return;
        }

        let jsonData = JSON.parse(data);

        jsonData.frutas.forEach(fruta => {
            if(fruta.nombre===frutas.nombre){
                id_fruta=fruta.id;
            }
        });

        jsonData.verduras.forEach(verdura => {
            if(verdura.nombre===verduras.nombre){
                id_verdura=verdura.id;
            }
        });

        localStorage.setItem('id_fruta',id_fruta);
        localStorage.setItem('id_verdura',id_verdura);

        anadirVenta();



    
    });
   
    
    // let x=1;
    // let encontrado = false;

    

    // fs.readFile(archivoCliente,'utf8',(err,data)=>{
    //     if(err){
    //         console.error("Error al leer el archivo: ",err);
    //         return;
    //     }

    //     let jsonData = JSON.parse(data);


    //     jsonData.usuarios.forEach(usuario => {
    //         if(usuario.nombre===cliente_fruta){
    //             cliente_fruta_genero=usuario.genero;
    //             cliente_fruta_edad=usuario.edad;
    //         }
    //         if(usuario.nombre===cliente_verdura){
    //             cliente_verdura_genero=usuario.genero;
    //             cliente_verdura_edad=usuario.edad;
    //         }
    //     });
    
        
        

    //     const id_encontrar=jsonData.usuarios;

    //     do{
    //         for(let usuario of id_encontrar){
    //             if(usuario.id===x) {
    //                 encontrado=true;
    //                 break;
    //             }
    //         }
    //         if(encontrado)x++;
    //     }while(encontrado);



    // });


    // fs.readFile(archivoStock,'utf8',(err,data)=>{
    //     if(err){
    //         console.error("Error al leer el archivo: ",err);
    //         return;
    //     }

    //     let jsonData = JSON.parse(data);

    //     jsonData.frutas.forEach(fruta => {
    //         if(fruta.nombre===nombre_fruta){
    //             id_fruta=fruta.id;
    //         }          
    //     });

    //     jsonData.verduras.forEach(verdura => {
    //         if(verdura.nombre===cliente_fruta){
    //             id_verdura=verdura.id;
    //         }          
    //     });


    // });

//   fs.readFile(archivoVentasJSON,'utf8',(err,data)=>{
        // const fechaActual=new Date();
        // const fechaCreada=fechaActual.getFullYear()+"/"+fechaActual.getMonth()+"/"+fechaActual.getDay()+" "+fechaActual.getHours()+":"+fechaActual.getMinutes()+":"+fechaActual.getSeconds();
        // let registroFruta;
        // let registroVerdura;

        // if(cantidad_fruta>0){
            
        //     const cantidad_frutaInt=parseInt(cantidad_fruta);
        //     crear_registro_fruta=true;
        //     registroFruta=[
        //         {
        //             "id_venta":x,
        //             "id_producto":id_fruta,
        //             "producto":nombre_fruta,
        //             "cantidad":cantidad_frutaInt,
        //             "comprador":cliente_fruta,
        //             "genero":cliente_fruta_genero,
        //             "edad":cliente_fruta_edad,
        //             "fecha_compra":fechaCreada
        //         }
        //     ];
            
        // }

        // if(cantidad_verdura>0){
        //     const cantidad_verduraInt=parseInt(cantidad_verdura);
        //     if(crear_registro_fruta){
        //         x+=1;
        //     }
        //     registroVerdura=[
        //         {
        //             "id_venta":x,
        //             "id_producto":id_verdura,
        //             "producto":nombre_verdura,
        //             "cantidad":cantidad_verduraInt,
        //             "comprador":cliente_verdura,
        //             "genero":cliente_verdura_genero,
        //             "edad":cliente_verdura_edad,
        //             "fecha_compra":fechaCreada
        //         }
        //     ];
            
        // }

       
        

        // const datos={
        //     frutas: registroFruta,
        //     verduras: registroVerdura
        // };
        

        // fs.writeFile(archivoVentasJSON, JSON.stringify(jsonData, null, 2),'utf8', (err) => {
        //     if (err) {
        //         console.error("Error al escribir en el archivo: ", err);
        //         return;
        //     }
        //     console.log("Se ha añadido ventas al fichero ventas.json");

        // });



//    });


}



function anadirVenta(){
    
    const fs=require('fs');
    const path=require('path');

    const archivoVentasJSON=path.join(__dirname,'ventas.json');

    const frutas = JSON.parse(localStorage.getItem('frutas'));
    const verduras = JSON.parse(localStorage.getItem('verduras'));

    const cliente_fruta_genero=localStorage.getItem('cliente_fruta_genero');
    const cliente_fruta_edad=localStorage.getItem('cliente_fruta_edad');
    const cliente_fruta_edadInt=parseInt(cliente_fruta_edad);
    const cliente_verdura_genero=localStorage.getItem('cliente_verdura_genero');
    const cliente_verdura_edad=localStorage.getItem('cliente_verdura_edad');
    const cliente_verdura_edadInt=parseInt(cliente_verdura_edad);


    const id_fruta=localStorage.getItem('id_fruta');
    const id_frutaInt=parseInt(id_fruta);
    const id_verdura=localStorage.getItem('id_verdura');
    const id_verduraInt=parseInt(id_verdura);

    fs.readFile(archivoVentasJSON, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo: ", err);
            return;
        }
        let jsonData=JSON.parse(data);

        const fechaActual=new Date();
        const fechaCreada=fechaActual.getFullYear()+"/"+fechaActual.getMonth()+"/"+fechaActual.getDay()+" "+fechaActual.getHours()+":"+fechaActual.getMinutes()+":"+fechaActual.getSeconds();

        

        const registroFruta=
            {
                "id_venta":1,
                "id_producto":id_frutaInt,
                "producto":frutas.nombre,
                "cantidad":frutas.cantidad,
                "comprador":frutas.cliente,
                "genero":cliente_fruta_genero,
                "edad":cliente_fruta_edadInt,
                "fecha_compra":fechaCreada
            }   

        const registroVerdura=
            {
                "id_venta":1,
                "id_producto":id_verduraInt,
                "producto":verduras.nombre,
                "cantidad":verduras.cantidad,
                "comprador":verduras.cliente,
                "genero":cliente_verdura_genero,
                "edad":cliente_verdura_edadInt,
                "fecha_compra":fechaCreada
            }       

        jsonData.frutas.push(registroFruta);
        jsonData.verduras.push(registroVerdura);


        fs.writeFile(archivoVentasJSON, JSON.stringify(jsonData, null, 2),'utf8', (err) => {
            if (err) {
                console.error("Error al escribir en el archivo: ", err);
                return;
            }
            console.log("Se ha realizado con éxito las ventas");

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
