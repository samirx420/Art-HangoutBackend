
exports.seed = function (knex) {
    return knex('tbl_users_roles').insert([
        {
            "id": 1,
            "role_id": 1,
            "user_id": 1,
        }
    ]);
};
