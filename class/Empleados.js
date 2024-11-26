class Empleado {
    constructor(id, nombre, email, contrasena, administrador, telefono, direccion) {
      this.id = id;
      this.nombre = nombre;
      this.email = email;
      this.contrasena = contrasena;
      this.administrador = administrador;
      this.telefono = telefono;
      this.direccion = direccion;
    }
  
    // Método para mostrar información del empleado
    mostrarInfo() {
      console.log(`ID: ${this.id}`);
      console.log(`Nombre: ${this.nombre}`);
      console.log(`Email: ${this.email}`);
      console.log(`Administrador: ${this.administrador ? 'Sí' : 'No'}`);
      console.log(`Teléfono: ${this.telefono}`);
      console.log(`Dirección: ${this.direccion}`);
    }
  
    // Método para actualizar la contraseña del empleado
    actualizarContrasena(nuevaContrasena) {
      this.contrasena = nuevaContrasena;
      console.log('Contraseña actualizada correctamente.');
    }
  
    // Método para cambiar el estado de administrador
    cambiarAdministrador(estado) {
      this.administrador = estado;
      console.log(`Administrador ahora: ${this.administrador ? 'Sí' : 'No'}`);
    }
  }
  