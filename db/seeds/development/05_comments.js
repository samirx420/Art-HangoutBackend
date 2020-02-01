
exports.seed = function (knex) {
  return knex('tbl_comments').insert([
    {
      "id"      : 1,
      "message"    : "some comment",
      "notice_id": 1,
      "user_id"  : 1
    },
    {
      "id"      : 2,
      "message"    : "some qweqwe",
      "notice_id": 1,
      "user_id"  : 1
    },
    {
      "id"      : 3,
      "message"    : "some asdad",
      "notice_id": 1,
      "user_id"  : 1
    },
    {
      "id"      : 4,
      "message"    : "some asd",
      "notice_id": 1,
      "user_id"  : 1
    },
  ]);
};
