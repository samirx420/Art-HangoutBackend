
exports.up = function(knex) {
    return knex.schema.createTable('tbl_users', t => {
        t.increments('id')
        t.string('username')
        t.text('password')
        t.string('first_name')
        t.string('last_name')
        t.text('avatar_path')
        t.text('password_digest')
        t.text('registration_token')
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('modified_at')
        t.timestamp('deleted_at')
        t.boolean('status').defaultTo(true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_users')
};
