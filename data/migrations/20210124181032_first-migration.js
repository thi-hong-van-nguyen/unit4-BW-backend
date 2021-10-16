exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (roles) => {
      roles.increments('role_id')
      roles.string('role_name')
    })
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
      users.integer('role_id').unsigned().notNullable().references('role_id').inTable('roles').onUpdate('CASCADE').onDelete('CASCADE')
    })
    .createTable('classes', (classes) => {
      classes.increments('class_id')
      classes.string('class_name').notNullable()
      classes.string('class_room').notNullable()
      classes.string('class_time').notNullable()
      classes.string('class_duration').notNullable()
    })
    .createTable('user_class', tbl => {
      tbl.increments('user_class_id')
      tbl.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      tbl.integer('class_id').unsigned().notNullable().references('class_id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE')
    })

}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('user_class')
    .dropTableIfExists('classes')
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
}
