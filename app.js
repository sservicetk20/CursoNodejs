var express = require("express");
var bodyParser = require("body-parser");//para peticiones al servidor
var User = require("./models/user").User; //treyendo modelo user = BaseDeDatos
var session = require("express-session");
var router_app = require("./router_app");
var session_middleware = require("./middlewares/session");
var methodOverride = require("method-override");
var formidable = require("express-formidable");
var RedisStore = require("connect-redis")(session);

var app = express();


// montar el middleware pasar el middleware como paremetro al metodo app
// podemos observar todo lo que este dentro de la carpeta public

app.use(express.static("public")); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extends: true} ));

app.use(methodOverride("_method"))

/*rutas modulares*/

var sessionMiddleware = session({
    store: new RedisStore({}),
    secret: "secreto"
});
    
app.use(sessionMiddleware);

app.use(formidable.parse({ keepExtensions: true }));

app.set("view engine", "jade");

app.get("/",function(req,res){
    console.log(req.session.user_id);
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
    User.findOne({email:req.body.email,password:req.body.password},function(err,user){
        req.session.user_id = user._id;
        res.redirect("/app");
    });
});

app.use("/app",session_middleware)
app.use("/app",router_app);

app.listen(8080);