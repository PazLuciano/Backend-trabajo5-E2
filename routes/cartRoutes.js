const { Router } = require("express");

const router = Router();


router.post("/", async (req, res) => {
    const resultado = await instanciaCarrito.createCart()
    res.send(resultado)
})

router.get("/:cid", async(req, res) => {
    let cid = req.params.cid;
    // pid = parseInt(pid)
    if(isNaN(cid)){
        return res.status(400).send("Parametro incorrecto!")
    }
    
    const resultado = await instanciaCarrito.getCartById(cid);
    res.send(resultado)

})

router.post("/:cid/products/:pid", async(req,res) => {
    let { cid, pid } = req.params
    if(isNaN(cid) || isNaN(pid)){
        return res.status(400).send("Parametro incorrecto!")
    }
    const cantidad = req.body;
    if(isNaN(cantidad)){
        return res.status(400).send("Parametro incorrecto!")
    }
    const resultado = await instanciaCarrito.addProductCart(cid,pid)
    res.send(resultado)
})



module.exports = router;