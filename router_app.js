var express = require("express");
var Producto = require("./models/productos");
var router = express.Router();
var fs = require("fs");

var producto_finder_middleware = require("./middlewares/find_producto");

router.get("/",function(req,res){
    Producto.find({})
     .populate("creator")
     .exec(function(err,productos){
         if(err) console.log(err);
         res.render("app/home",{ productos: productos });
     })
});

/*
    REST
*/



router.get("/productos/new",function(req,res){
    res.render("app/productos/new")
});

router.get("/productos/opciones",function(req,res){
    res.render("app/productos/opciones")
});

router.all("/productos/:id*",producto_finder_middleware);

router.get("/productos/:id/edit",function(req,res){
  res.render("app/productos/edit");
});


router.route("/productos/:id")
    .get(function(req,res){
      res.render("app/productos/show");
    })
     .put(function(req,res){
            res.locals.producto.title = req.body.title;
            res.locals.producto.save(function(err){
                if(!err){
                    res.render("app/productos/show");
                }else{
                     res.render("app/productos/"+req.params.id+"/edit");
                }
            })
            res.render("app/productos/show");
        })
 
     .delete(function(req,res){
        Producto.findOneAndRemove({_id:req.params.id},function(err){
            if(!err){
                res.redirect("/app/productos");
            }else{
                console.log(err);
                res.redirect("app/productos"+req.params.id)
            }
        })
    });
    
router.route("/productos")
    .get(function(req,res){
        Producto.find({creator: res.locals.user._id},function(err,productos){
           if(err){ res.redirect("/app");return; }
           res.render("app/productos/index",{ productos: productos }); 
        });
    })
    
     .post(function(req,res){
       console.log(req.body.archivo);
        var extension = req.body.archivo.name.split(".").pop();
        var data = {
            title: req.body.title,
            creator: res.locals.user._id,
            extension: extension
        }
        var producto = new Producto(data);
        producto.save(function(err){
            if(!err){
                fs.rename(req.body.archivo.path, "public/imagenes/"+producto._id+"."+extension);
                res.redirect("/app/productos/"+producto._id)
            }
            else{
                console.log(producto);
                res.render(err);
            }
        });
    });

module.exports = router;