
exports.seed = function (knex) {
  return knex('tbl_roles').insert([
    { id: 1, role: 'Admin' },
    { id: 2, role: 'Provider' },
    { id: 3, role: 'Seeker' }
  ]);
};
