var express = require("express");
var bodyParser = require("body-parser");//para peticiones al servidor
var User = require("./models/user").User; //treyendo modelo user = BaseDeDatos

var app = express();


// montar el middleware pasar el middleware como paremetro al metodo app
// podemos observar todo lo que este dentro de la carpeta public

app.use(express.static("public")); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extends: true} ));

app.set("view engine", "jade");

app.get("/",function(req,res){
    res.render("index",{title: "Sistema de Ingreso"});
});

app.get("/signup",function(req,res){
    User.find(function(err,doc){
       console.log(doc);
       res.render("signup"); 
    });
});

app.get("/login",function(req,res){
       res.render("login"); 
});

app.post("/users",function(req,res){
    var user = new  User({
        email: req.body.email, 
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    });
   
   user.save().then(function(us){
       res.send("Guardamos el usuario exitosamente");
   }),function(err){
       console.log(String(err));
       res.send("no pudimos guardar la informacion");
   }
    
});

app.post("/sessions",function(req,res){
    User.findOne({email:req.body.email,password:req.body.password},function(err,docs){
        console.log(docs);
        res.send("hola Bienvenido");
    });
});


app.listen(8080);