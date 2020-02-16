
exports.seed = function (knex) {
  return knex('tbl_users').insert([
    {
      "id": 1,
      "username": "puzansakya",
      "password": "password",
      "first_name": "puzan",
      "last_name": "sakya",
      "password_digest": "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
      "avatar_path": "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.0-1/p240x240/10377357_880797555305669_4777108359366894370_n.jpg?_nc_cat=102&_nc_oc=AQnLx8nVN9gzYa3t7VplERUFchWiRgw9J-Xbs_t_cbvX-Bfirk_oRhZzgOENjRCFDA8&_nc_ht=scontent.fktm8-1.fna&_nc_tp=1002&oh=00be1c08a07e35967b0698f445db8de3&oe=5E8F90C6",
    },
    {
      "id": 2,
      "username": "saminadhikari",
      "password": "password",
      "first_name": "samin",
      "last_name": "adhikari",
      "password_digest": "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
      "avatar_path": "https://scontent.fktm8-1.fna.fbcdn.net/v/t1.0-1/p240x240/10377357_880797555305669_4777108359366894370_n.jpg?_nc_cat=102&_nc_oc=AQnLx8nVN9gzYa3t7VplERUFchWiRgw9J-Xbs_t_cbvX-Bfirk_oRhZzgOENjRCFDA8&_nc_ht=scontent.fktm8-1.fna&_nc_tp=1002&oh=00be1c08a07e35967b0698f445db8de3&oe=5E8F90C6",
    },
  ]);
};
