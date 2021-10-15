'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MsgEmailSchema extends Schema {
  up () {
    this.create('msg_emails', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('username', 20).notNullable()
      table.string('titulo_msg_email', 20).notNullable()
      table.string('msg_email').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('msg_emails')
  }
}

module.exports = MsgEmailSchema
