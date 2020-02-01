
exports.up = function(knex) {
    return knex.schema.createTable('tbl_users_roles', t => {
        t.increments('id')
        t.integer('user_id').unsigned().references('tbl_users.id');
        t.integer('role_id').unsigned().references('tbl_roles.id');
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('modified_at')
        t.timestamp('deleted_at')
        t.boolean('status').defaultTo(true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_users_roles')
};
