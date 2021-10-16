const users = [
  {
    username: "foo",
    password: "1234",
    role_id: 1
  },
  {
    username: "bar",
    password: "4567",
    role_id: 2
  },
]

const roles = [
  {
    role_name: 'instructor'
  },
  {
    role_name: 'user'
  },

]

const classes = [
  {
    class_name: "HIIT",
    class_room: "5B",
    class_duration: 90,
    class_time: "10/14/2021 5PM"
  },
  {
    class_name: "yoga",
    class_room: "1A",
    class_duration: 60,
    class_time: "10/14/2021 9AM"
  },
]

exports.seed = async function (knex) {
  await knex('roles').insert(roles)
  await knex('users').insert(users)
  await knex('classes').insert(classes)
};
