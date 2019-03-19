exports.up = function (knex, Promise) {
  return Promise.all([

    knex.schema.createTable('blogs', table => {
      table.increments('id').primary()
      table.string('title')
      table.string('desc', 1500)
    })

  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([

    knex.schema.dropTable('blogs')

  ])
}
