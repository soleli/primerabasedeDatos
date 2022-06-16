const { options } = require('./db/mysql')
// const { options } = require('./db/sqlite')

const knex = require('knex')(options)

knex
.schema.createTable('products', table => {
      table.increments('id')
      table.string('name', 30)
      table.float('price')
      table.string('image', 255)
    })
  .then(() => {
    console.log('Tabla de productos creada')
  })
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy())
