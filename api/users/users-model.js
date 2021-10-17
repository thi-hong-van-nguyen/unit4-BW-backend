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

const findBookings = async (username) => {
    const { user_id } = await db('users').select('user_id').where({ username }).first()

    const userBookings = await db('users as u')
        .leftJoin('user_class as uc', 'uc.user_id', 'u.user_id')
        .select('u.user_id', 'u.username', 'uc.class_id')
        .where('u.user_id', user_id)
        .leftJoin('classes as c', 'c.class_id', 'uc.class_id')
        .select('c.class_id', 'c.class_type', 'c.class_location', 'c.class_date', 'c.class_time', 'c.class_duration', 'c.intensity_level')

    return ({
        user_id: userBookings[0].user_id,
        username: userBookings[0].username,
        bookings: userBookings.map(b => {
            return ({
                class_id: b.class_id,
                class_type: b.class_type,
                class_location: b.class_location,
                class_date: b.class_date,
                class_time: b.class_time,
                class_duration: b.class_duration,
                intensity_level: b.intensity_level,
            })
        })
    })
}


async function book(username, class_id) {
    const user = await findBy({ username }).first()
    await db('user_class').insert({ 'class_id': class_id, 'user_id': user.user_id })
    const userBooking = await db('user_class as uc')
        .leftJoin('users as u', 'uc.user_id', 'u.user_id')
        .select('uc.user_class_id', 'u.username', 'u.user_id')
        .where('uc.user_id', user.user_id)
        .leftJoin('classes as c', 'uc.class_id', 'c.class_id')
        .select('c.*')
    return ({
        user_id: userBooking[0].user_id,
        username: userBooking[0].username,
        bookings: userBooking.map(item => {
            return {
                class_id: item.class_id,
                class_type: item.class_type,
                class_location: item.class_location,
                class_time: item.class_time,
                class_date: item.class_date,
                class_duration: item.class_duration,
                intensity_level: item.intensity_level
            }
        })
    })
}

module.exports = {
    findAll, add, findBy, findBookings, book
}
