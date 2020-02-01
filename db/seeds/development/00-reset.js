
exports.seed = function (knex) {
  return knex('tbl_users_roles').del()
    .then(() => {
      return knex('tbl_comments').del()
    })
    .then(() => {
      return knex('tbl_notices').del()
    })
    .then(() => {
      return knex('tbl_users').del()
    })
    .then(() => {
      return knex('tbl_roles').del()
    })
};
