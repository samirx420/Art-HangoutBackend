
exports.up = function(knex) {
    return knex.schema.createTable('tbl_roles', t => {
        t.increments('id')
        t.string('role')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_roles')
};
