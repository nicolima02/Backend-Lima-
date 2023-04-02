Abrir el servidor:
1) Con el comando npm run start:mongo el servidor se desplegara con la base de datos de mongo
con npm run start:file se despliega con la base de datos en filesystem
2) con el comando npm run start:cluster (numero) inicia el servidor con los n clusters que se quiera asignar
3) con npm run dev el servidor se despliega con los ajustes default

--------------------------------------------------------------------------------
Explicación de como hacer un pedido:

(LOS CARRITOS TIENEN UNICAMENTE PERSISTENCIA EN LA BASE DE MONGO)

1) Registrarse:
Para registrarse se debe ir a el endpoint localhost:8080/api/signup y con el metodo post subir los siguientes datos
{
    "email": "string",
    "username": "string",
    "password": "string",
    "address": "string",
    "age": number,
    "phone": "string",
    "avatar": "string"(no obligatorio)
}

Cuando se registre enviara un mensaje al mail del administrador guardado en el archivo .env con los datos del registro

2) Iniciar sesion:
Una vez registrado se debe hacer un post con el usuario y contraseña del punto anterior al endpoint localhost:8080/api/login
Cuando la sesion esta iniciada en el url raiz localhost:8080/ con el metodo get le dara la bienvenida con el nombre de usuario registrado

3)Crear carrito: 
Para crear el carrito vacio se debe hacer un post en localhost:8080/api/carritos y creara un carrito vacio (si hay un carro ya creado con tu nombre de usuario y esta vacio no deja hacer otro)

4) Agregar productos al carrito:
Para poder agregar productos al carrito se debe hacer un post a localhost:8080/api/carrito/(ID del carrito creado)/productos con los datos:
{
    "id_prod": (id del producto que se quiera agregar),
    "cant": number
}

si el producto ya existe en el carrito y se hace el mismo request, las cantidad se reemplaza
 

5) Borrar un producto del carrito:
Para borrar un producto del carrito se debe hacer un delete a localhost:8080/api/carrito/(ID del carrito)/productos/(ID del producto)

6) Borrar carrito:
Para borrar el carrito completo se debe hacer un delete a localhost:8080/api/carrito/(ID carrito)

7) Ver carritos:
Para ver todos los carritos se debe hacer un get en localhost:8080/api/carrito

8) Ver carrito por id:
para ver un carrito por id se debe hacer un get en localhost:8080/api/carrito/(ID)/productos

9) Confirmar carrito:
Para confirmar el carrito se debe hacer un post a localhost:8080/api/send_carrito y se enviara por mail y whatsapp al numero del administrador los detalles del pedido del ultimo carrito del usuario logueado.
Tambien le envia al numero del usuario que su pedido ha sido confirmado

-------------------------------------------------

Chat:
El chat se encuentra en el url raiz localhost:8080/ y hay que completar los campos definidos para enviar un mensaje. El mensaje se almacenara en el sistema de persistencia elegido.

-------------------------------------------------


Para unirse al twilio el codigo es join saved-result