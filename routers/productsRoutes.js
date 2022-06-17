const express = require('express')
const router = express.Router();
const path = require('path');
const db = require('../db/mysql')


let productos = []


router.get('', (req, res) => {
    return res.render("index")
})
router.post('/createProduct', (req, res) => {
    var io=req.app.get('socket')
    let newProduct = {
        ...req.body,
    };
    return db.from('products').insert(newProduct)
    .then((productsIds) => {
      const [ productId ] = productsIds
      console.log(`Producto insertado`, productId)
      newProduct.id = productId

      io.emit('newProduct', newProduct)
      return res.status(201).json(newProduct)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        error: 'Error de servidor'
      })
    })
    
})

router.get('/products', (req, res) => {
    return db.from('products').select('*')
      .then(productos => {
        return res.json(productos)
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({
          error: 'Error de servidor'
        })
      })
})
router.get('/borrarProduct/:id', (req, res) => {
    return db.from('products').where({ id: req.params.id })
    .del()
      .then(productos => {
        return res.redirect('/')
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({
          error: 'Error de servidor'
        })
      })
})


module.exports = router;