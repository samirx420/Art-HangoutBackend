
exports.seed = function (knex) {
  return knex('tbl_notices').insert([
    {
      "id"         : 1,
      "title"      : "Tomorrow is holiday.",
      "description": "Each video lesson teaches a new concept and includes practice examples for you to try out yourself.",
      "user_id"     : 1
    },
    {
      "id"         : 2,
      "title"      : "Tomorrow is holiday.",
      "description": "Each video lesson teaches a new concept and includes practice examples for you to try out yourself.",
      "user_id"     : 1
    },
    {
      "id"         : 3,
      "title"      : "Tomorrow is holiday.",
      "description": "Each video lesson teaches a new concept and includes practice examples for you to try out yourself.",
      "user_id"     : 1
    },
    {
      "id"         : 4,
      "title"      : "Tomorrow is holiday.",
      "description": "Each video lesson teaches a new concept and includes practice examples for you to try out yourself.",
      "user_id"     : 1
    },
    {
      "id"         : 5,
      "title"      : "Tomorrow is holiday.",
      "description": "Each video lesson teaches a new concept and includes practice examples for you to try out yourself.",
      "user_id"     : 1
    }
  ]);
};
