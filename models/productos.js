var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var img_schema = new Schema({
    title:{type:String,required:true}
});

var Producto = mongoose.model("Producto",img_schema);

module.exports = Producto;