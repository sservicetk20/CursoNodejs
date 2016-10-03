# CursoNodejs


### aprendiendo de nodejs

```
1.interacion de node con las vistas(html,css,java etc) creando un servidor = commit mesage
2.NPM = es el manejador de paquetes node(manejador de paquetes que uitlizamos en la aplicacion)
3.express = libreria web 
4.JADE se usara para sentizar el html
5.Middleware (validador de peticiones al servidor )
6.montar el middleware pasar el middleware como paremetro al metodo app
7.body-parser 
8.se instalo base de datos mongoose
9.mongoose realizar consultas a la base de datos de una forma mas sencilla
10.express-session manejar seciones con express
```

```
Running MongoDB 

$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod

Start

$./mongod

```

```
sirve para traer el archivo user de la carpeta models el cual contiene la base de datos de los usuarios
var User = require("./models/user").User;

```

```
NodeMon

sirve para que el servidor se actualize solo sin nesecidad de estar reseteando el servidor

```

```

sudo service redis-server start
redis-cli


```