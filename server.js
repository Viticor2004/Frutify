// Importar Express
const express = require('express');
const app = express();

// Middleware para procesar solicitudes con JSON
app.use(express.json());

// Ruta para manejar PUT requests en '/empleados'
app.put('/empleados', (req, res) => {
    const empleados = req.body;  // Obtiene el cuerpo de la solicitud, que debería ser un JSON
    console.log('Empleados actualizados:', empleados);

    // Responde con los datos actualizados
    res.json({ message: 'Datos actualizados correctamente', empleados });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});