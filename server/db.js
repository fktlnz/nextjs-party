// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve('server/db/database.sqlite')
console.log('dir:'+dbPath)
// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "books"
knex.schema
  // Make sure no "books" table exists
  // before trying to create new
  .hasTable('questions')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (book)
        return knex.schema.createTable('questions', (table)  => {
          table.increments('id').primary()
          table.string('question')
          table.string('select1_text')
          table.string('select1_imgpath')
          table.string('select2_text')
          table.string('select2_imgpath')
          table.string('select3_text')
          table.string('select3_imgpath')
          table.string('select4_text')
          table.string('select4_imgpath')
          table.string('answer')
        })
        .then(() => {
          // Log success message
          console.log('Table \'questions\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "books" table
// knex.select('*').from('questions')
//   .then(data => console.log('data:', data))
//   .catch(err => console.log(err))

// Export the database
module.exports = knex
