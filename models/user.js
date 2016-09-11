
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/App");

var posibles_valores = ["M","F"];
/*
TIPOS DE DATOS QUE SE PUEDEN UTILIZAR CON MOONGOSE
    String
    Numbre
    Date
    Buffer
    Boolean
    Mixed
    Objectic
    Array
    
*/
var user_schema = new Schema ({
   name: String,
   username: {type:String},
   password: {
       type:String,minlength:[8,"la contraseña es muy corta"],
       validate: {
           validator:function(p){ //la p hace referencia al dato ingresado por el usuario
               return this.password_confirmation == p;
           },
           message:"la contraseña no coincide"
       }
   },
   age: {type: Number,min:[5,"la edad no puede ser menor a 5"],max:[100,"la edad no puede ser mayor a 100"]},
   email: {type: String,required: "El correo es obligatorio"},
   date_of_birth: Date,
   sex: {type:String,enum:{values: posibles_valores,message:"Opcion no valida"}}
});

user_schema.virtual("password_confirmation").get(function(){
    return this.p_c;
}).set(function(password){
    this.p_c = password;
});

var User = mongoose.model("User",user_schema);

module.exports.User = User;