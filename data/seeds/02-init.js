const users = [
  {
    username: "foo",
    password: "1234",
    role_id: 1
  },
  {
    username: "bar",
    password: "1234",
    role_id: 2
  },
]

const roles = [
  {
    role_name: 'instructor'
  },
  {
    role_name: 'client'
  },

]

const classes = [
  {
    class_type: "HIIT",
    class_location: "5B",
    class_duration: 90,
    class_time: "5PM",
    class_date: "10/14/2021",
    intensity_level: 5,
  },
  {
    class_type: "yoga",
    class_location: "san jose",
    class_duration: 60,
    class_time: "9AM",
    class_date: "12/05/2021",
    intensity_level: 3,
  },

]

exports.seed = async function (knex) {
  await knex('roles').insert(roles)
  await knex('users').insert(users)
  await knex('classes').insert(classes)
};
