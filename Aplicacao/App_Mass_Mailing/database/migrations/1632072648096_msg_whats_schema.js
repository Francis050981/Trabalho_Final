'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MsgWhatsSchema extends Schema {
  up () {
    this.create('msg_whats', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('username', 20).notNullable()
      table.string('titulo_msg_whats', 20).notNullable()
      table.string('msg_txt_whats').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('msg_whats')
  }
}

module.exports = MsgWhatsSchema
