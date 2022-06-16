const db = require('./db/mysql')
 
db
.schema.createTable('products', table => {
      table.increments('id')
      table.string('title', 30)
      table.float('price')
      table.string('image', 255)
    })
  .then(() => {
    console.log('Tabla de productos creada')
  })
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => db.destroy())
