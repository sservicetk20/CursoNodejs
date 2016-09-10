var express = require("express");
var bodyParser = require("body-parser");//para peticiones al servidor

var app = express();

// montar el middleware pasar el middleware como paremetro al metodo app
// podemos observar todo lo que este dentro de la carpeta public
app.use(express.static("public")); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extends: true} ));

app.set("view engine", "jade");

app.get("/",function(req,res){
    res.render("index");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/users",function(req,res){
    console.log("contraseña:"+ req.body.password);
    console.log("Email:"+ req.body.email);
    res.send("recibimos tus datos");
});


app.listen(8080);