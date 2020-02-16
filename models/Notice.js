const { Model } = require('objection');
const knex      = require('../db/knex')
const User      = require('./User')

Model.knex(knex)

class Notice extends Model {

    static get tableName() {
        return 'tbl_notices';
    }

    static get relationMappings() {
        return {
            user: {
                relation  : Model.BelongsToOneRelation,
                modelClass: User,
                join      : {
                    from   : "tbl_notices.user_id",
                    to: "tbl_users.id"
                }
            }
        };
    }

}

module.exports = Notice;