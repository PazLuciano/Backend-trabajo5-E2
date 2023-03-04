// const { log } = require("console");
// const fs = require("fs/promises");
const path = require("path");
const { Router } = require("express");
const { log } = require("console");



const router = Router();

router.get("/realtimeproducts", async (req,res) =>{
    let productos = await instancia.getProducts()   
    res.render("realTimmeProducts", { productos })
})

router.get("/", async (req, res) => {

    let productos = await instancia.getProducts()
    // console.log(productos);
    const { limit } = req.query;
    if (limit) {
        let productosSeleccionados = []
        let numero = 1;
        productos.forEach(element => {
            if (numero <= limit){
                productosSeleccionados.push(element);
                numero ++;
            }
        });
        productos = productosSeleccionados
        // console.log(productos);
        // return res.render("home", {productos})
        return res.send(productosSeleccionados)
    }
    else{
        console.log(productos);
        // return res.render("home", {productos})
        return res.send(productos)
    }
    
})

router.get("/:pid", async (req, response) => {

    const pid = req.params.pid;
    if(isNaN(pid)){
        return response.status(400).send("Parametro incorrecto!")
    }
    
    let producto = await instancia.getProductById(pid)   
    
    response.send(producto)
}
);

router.post("/", async (req,res) => {
    const product = req.body
    // console.log("body", product);
    const resultado = await instancia.addProduct(product);
    console.log("res =>" ,resultado);
    // console.log(resultado);
    let productos = await instancia.getProducts()   
    res.render("realTimmeProducts", { productos })
})
router.put("/:pid", async(req,res) => {
    const pid = req.params.pid;
    if(isNaN(pid)){
        return res.status(400).send("Parametro incorrecto!")
    }
    const objActualizar = req.body;
    const resultado = await instancia.updateProduct(pid, objActualizar);
    res.send(resultado);

})
router.delete("/:pid", async(req,res) => {
    const pid = req.params.pid;
    if(isNaN(pid)){
        return res.status(400).send("Parametro incorrecto!")
    }  
    const resultado = await instancia.deleteProduct(pid)
    res.send(resultado)
})

// router.delete("/delete", async(req,res) => {
//     console.log("sssss");
//     const { id }  = req.params;
//     console.log(id)
//     // console.log("holaaa");
//     const resultado = await instancia.deleteProduct(id)
//     // console.log(("RES --> ", resultado));
//     let productos = await instancia.getProducts()   
//     res.render("realTimmeProducts", { productos })
// })


module.exports = router;