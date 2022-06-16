const express = require('express')
const router = express.Router();
const path = require('path');



let productos = []


router.get('', (req, res) => {
    return res.render("index")
})
router.post('/createProduct', (req, res) => {
    var io=req.app.get('socket')
    let newProduct = {
        id: productos.length + 1,
        ...req.body,
    };
    productos.push(newProduct);
    io.emit('newProduct', newProduct)

    return res.json(productos)
})

router.get('/products', (req, res) => {
    return res.json(productos)
})

module.exports = router;