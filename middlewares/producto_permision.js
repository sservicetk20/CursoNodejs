var Producto = require("../models/productos");

module.exports = function(producto,req,res){
    
    if(req.method === "GET" && req.path.indexOf("edit" ) < 0){
        return true;
    }
    
    if(typeof producto.creator == "undefined") return false;
    
    if(producto.creator._id.toString() == res.locals.user._id){
     return true;
    }
    
    return false;
}