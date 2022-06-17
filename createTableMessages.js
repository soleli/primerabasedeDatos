const db = require('./db/sqlite')
 
db
.schema.createTable('messages', table => {
      table.increments('id')
      table.string('email', 255)
      table.string('mensaje', 255)
      table.date('fecha')
    })
  .then(() => {
    console.log('Tabla de mensajes creada')
  })
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => db.destroy())
