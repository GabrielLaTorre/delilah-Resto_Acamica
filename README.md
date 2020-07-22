# delilah-Resto_Acamica

#### El proyecto consiste en crear un REST API para manejar una tienda de comidas utilizando bases de datos MySQL.


## Pasos a seguir:

####  Clonar el repositorio o descargarlo desde GitHub
```
https://github.com/GabrielLaTorre/delilah-Resto_Acamica.git
```
#### Situarse en la carpeta del proyecto desde consola e instalar dependencias:
```
npm install
```
#### Configuración de base de datos:
1. Iniciar MySQL Server o el gestor de Base de datos que tenga.
2. Crear la Base de datos "delilah_resto".
3. Importar y ejecutar Query de estructura de Tablas `database/dbSetup.sql`.
4. Importar y ejecutar Query de carga de datos `database/dataStorage.sql`.
5. Verificar datos (host, puerto, usuario, contraseña, nombre de la db) en el archivo `database/db_connection.js`.

#### Ejecutar el programa:
En consola situarse dentro de la carpeta del proyecto y correr el comando:
```
node index.js
```

### Realizar las pruebas/consultas necesarias desde Postman utilizando los métodos, rutas y parámetros provistos en la especificación.
