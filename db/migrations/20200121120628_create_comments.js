
exports.up = function(knex) {
    return knex.schema.createTable('tbl_comments', t => {
        t.increments('id')
        t.text('message')
        t.integer('notice_id').unsigned().references('tbl_notices.id');
        t.integer('user_id').unsigned().references('tbl_users.id');
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('modified_at')
        t.timestamp('deleted_at')
        t.boolean('status').defaultTo(true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_comments')
};
