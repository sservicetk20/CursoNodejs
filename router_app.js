var express = require("express");
var Producto = require("./models/productos");
var router = express.Router();

router.get("/",function(req,res){
    res.render("app/home")
});

/*
    REST
*/

router.get("/productos/new",function(req,res){
    res.render("app/productos/new")
});

router.get("/productos/:id/edit",function(req,res){
      Producto.findById(req.params.id,function(err,producto){
           res.render("app/productos/edit", { producto:producto });
        })
});


router.route("/productos/:id")
    .get(function(req,res){
        Producto.findById(req.params.id,function(err,producto){
           res.render("app/productos/show", { producto:producto });
        })
    })
     .put(function(req,res){
        Producto.findById(req.params.id,function(err, producto) {
            producto.title = req.body.title;
            producto.save(function(err){
                if(!err){
                    res.render("app/productos/show",{producto:producto});
                }else{
                     res.render("app/productos/"+producto.id+"/edit",{producto:producto});
                }
            })
            res.render("app/productos/show", { producto:producto });
        })
    })
     .delete(function(req,res){
        
    });
    
router.route("/productos")
    .get(function(req,res){
        Producto.find({},function(err,productos){
           if(err){ res.redirect("/app");return; }
           res.render("app/productos/index",{productos: productos }); 
        });
    })
    
     .post(function(req,res){
        var data = {
            title: req.body.title
        }
        var producto = new Producto(data);
        
        producto.save(function(err){
            if(!err){
                res.redirect("/app/productos/"+producto._id)
            }
            else{
                res.render(err);
            }
        });
    });

module.exports = router;