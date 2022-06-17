const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require("fs");
const db = require('../db/sqlite')

//let messageFilePath = path.join(__dirname, '../message.json');

//const message = JSON.parse(fs.readFileSync(messageFilePath, 'utf-8'));

router.get('/', (req, res) => {
    console.log("auu")

    return db.from('messages').select('*')
      .then(messagess => {
          console.log(messagess)
        return res.json(messagess)
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({
          error: 'Error de servidor'
        })
      })
    
})
router.post('/create', (req, res) => {
    var io=req.app.get('socket')
    let newMessage = {
        ...req.body,
    };
    return db.from('messages').insert(newMessage)
    .then((msg) => {
        console.log(msg)
        io.emit('newMessage', newMessage);
        return res.json(newMessage)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        error: 'Error de servidor'
      })
    })

})



module.exports = router;