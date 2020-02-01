const { Model } = require('objection');
const knex = require('../db/knex')


Model.knex(knex)

class Role extends Model {
  static get tableName() {
    return 'tbl_roles';
  }

}

module.exports = Role;