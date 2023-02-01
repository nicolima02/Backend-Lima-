ejemplo para registrarse en http://localhost:8080/api/signup :
{
    "email": "nicoo@gmail.com",
    "username": "n222co",
    "password": "124",
    "address": "cordoba",
    "age": 25,
    "phone": "+54 9 3518109760",
    "avatar": "https://img.freepik.com/free-vector/find-person-job-opportunity_24877-63457.jpg?w=740&t=st=1675284638~exp=1675285238~hmac=301fe38b7ca136d2af4aa755bcb5825ee35c8ff26c8732cc45ce2a285fb35123"
}


para hacer un nuevo carrito, primero se debera iniciar sesion en http://localhost:8080/api/login, poniendo username y contraseña, despues hacer un post request en http://localhost:8080/api/Carrito

cuando se cree el carrito, devolvera los datos de este, entre los cuales se encuentra el id del carrito

para agregar productos al carrito se debe hacer un post en http://localhost:8080/api/carrito/"id del carrito"/productos como el siguiente:

{
    "id_prod": "id del producto",
    "cant": cantidad del producto
}

para confirmar la compra se debe hacer un post en http://localhost:8080/api/sendCarrito y se enviara al mail que este enlazado