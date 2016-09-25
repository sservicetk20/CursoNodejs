var Producto = require("../models/productos");
var owner_check = require("./producto_permision");

module.exports = function (req,res,next){
     Producto.findById(req.params.id)
      .populate("creator")
      .exec(function(err,producto){
        if(producto != null && owner_check(producto,req,res)){
            console.log("Encontre el producto" +" "+ producto.title + " "+"con con codigo :"+producto._id);
            res.locals.producto = producto;
            next();
        }else{
            res.redirect("/app");
        }
     });
}