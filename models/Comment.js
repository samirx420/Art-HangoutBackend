const { Model } = require('objection');
const knex      = require('../db/knex')
const Notice    = require('./Notice')
const User      = require('./User')

Model.knex(knex)

class Comment extends Model {

    static get tableName() {
        return 'tbl_comments';
    }

    static get relationMappings() {
        return {
            notice: {
                relation  : Model.BelongsToOneRelation,
                modelClass: Notice,
                join      : {
                    from: "tbl_comments.notice_id",
                    to  : "tbl_notices.id"
                }
            },
            user: {
                relation  : Model.BelongsToOneRelation,
                modelClass: User,
                join      : {
                    from: "tbl_comments.user_id",
                    to  : "tbl_users.id"
                }
            }
        };
    }

}

module.exports = Comment;