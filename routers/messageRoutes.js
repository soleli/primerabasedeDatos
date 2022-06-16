const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require("fs");
let messageFilePath = path.join(__dirname, '../message.json');

const message = JSON.parse(fs.readFileSync(messageFilePath, 'utf-8'));

router.get('/', (req, res) => {
    return res.json(message)
})
router.post('/create', (req, res) => {
    var io2=req.app.get('socket')
    let newMessage = {
        id: message.length + 1,
        ...req.body,
    };
    message.push(newMessage);
    fs.writeFileSync(messageFilePath, JSON.stringify(message, null , ' '));
//    io2.emit('newMyMessage', newMessage);
console.log("mi"+io2.id)
   io2.broadcast.emit('newMessage', newMessage);
    return res.json(newMessage)
})



module.exports = router;