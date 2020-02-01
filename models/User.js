const { Model } = require('objection');
const knex      = require('../db/knex')
const Role      = require('./Role')


Model.knex(knex)

class User extends Model {

    static get tableName() {
        return 'tbl_users';
    }

    static get relationMappings() {
        return {
            roles: {
                relation  : Model.ManyToManyRelation,
                modelClass: Role,
                join      : {
                    from   : "tbl_users.id",
                    through: {
                        from: "tbl_users_roles.user_id",
                        to  : "tbl_users_roles.role_id"
                    },
                    to: "tbl_roles.id"
                }
            }
        };
    }

}

module.exports = User;