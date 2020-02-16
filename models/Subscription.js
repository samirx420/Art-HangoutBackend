const { Model } = require('objection');
const knex = require('../db/knex')
const Organization = require('./Organization')
const User = require('./User')

Model.knex(knex)

class Subscription extends Model {
    static get tableName() {
        return 'tbl_subscriptions';
    }

    static get relationMappings() {
        return {
            organization: {
                modelClass: Organization,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'tbl_subscriptions.organization_id',
                    to: 'tbl_organizations.id'
                }
            },
            user: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'tbl_subscriptions.user_id',
                    to: 'tbl_users.id'
                }
            },
        };
    }

}

module.exports = Subscription;