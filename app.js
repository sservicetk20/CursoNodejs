var express = require("express");
var bodyParser = require("body-parser");//para peticiones al servidor
var app = express();
var mongoose = require("mongoose"),
    Schema = mongoose.Schema; //lo usamos para definir los datos de la base de datos como un objeto json

mongoose.connect("mongodb://localhost/App");

var userSchemaJSON = {
  email:String,
  password:String
};

var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model("User",user_schema);

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
    User.find(function(err,doc){
        console.log(doc);
       res.render("login"); 
    });
});

app.post("/users",function(req,res){
    var user = new  User({
        email: req.body.email, 
        password: req.body.password
    });
    
    user.save(function(){
        res.send("recibimos tus datos");    
    });
    
});


app.listen(8080);