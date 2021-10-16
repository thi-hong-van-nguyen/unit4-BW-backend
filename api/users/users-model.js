const db = require('../../data/db-config')

const findAll = () => {
    return db('users')
}

const add = async (user) => {
    await db('users').insert(user)
    return db('users').where('users.username', user.username).first()
}

const findBy = (filter) => {
    return db('users').where(filter)
}

module.exports = {
    findAll, add, findBy
}
