**Indice**

1. [Requisitos para iniciar el codigo](#requirements)
2. [Descargar el codigo](#download)
3. [Iniciar la base de datos](#db)
4. [Iniciar servidor](#server)
5. [Iniciar client](#client)

# ¿ Como iniciar el proyecto (local) ?

<span id="requirements"></span>

## Requisitos

- Tener nodejs instalado
- Tener XAMPP instalado (para correr una base de datos en mysql)

<span id="download"></span>

## Descargar el proyecto

---

1. En cualquier carpeta del S.O. abrir una terminal (cual sea) y ejecutar el siguiente comando: `git clone https://github.com/programador51/pi`

![clone_code](./tutorial/1-git.png)

Debe dar como resultado la siguiente estructura de carpetas, `client` y `server`.

![folder](./tutorial/2-git.png)

---

2. Ejecutar el siguiente comando **EN LA RAIZ** de los de la carpeta `client` y `server`: `npm i`.

<span id="db"></span>

## Iniciar la base de datos

1. Ejecutar Apache y MySQL con XAMPP.
2. Abrir el gestor de base de datos `MySQL` e importar la base de datos. **Se debe llamar `pi_ste`.** El archivo se encuentra en la raiz de este repositorio y se llama `pi_ste.sql`.

<span id="server"></span>

## Iniciar el servidor

1. Abrir la carpeta `server` de este repositorio en la terminal del S.O.
2. Ejectuar el comando `npm run server`

**NOTA:** Si la terminal muestra un error por no poder conectarse a la DB.
Adapatar las credenciales de conexion en este archivo acorde a tu configuracion de XAMPP `server\config.js | Linea 2-7`

```javascript
const connection = mysql.createConnection({
    host:'localhost' // Dejarlo igual,
    user:'root' // Dejarlo igual, pero cambiarlo si tienes un usuario diferente a root,
    password:'jl1731168' // Dejar con comillas simples si no tienes contraseña o usar la tuya,
    database:'pi_ste' // Nombre de la DB, se de llamar pi_ste o segun hallas nombrado
});
```

<span id="client"></span>

## Iniciar el cliente

1. Abrir la carpeta `client` da este repositorio
2. Ejecutar el comando `npm start`
