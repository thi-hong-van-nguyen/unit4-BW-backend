const db = require('../../data/db-config')
const User = require('../users/users-model')

async function findAll() {
    const classes = await db('classes as c')
        .leftJoin('user_class as uc', 'c.class_id', 'uc.class_id')
        .select('c.*', 'uc.user_class_id', 'uc.user_id')
        .leftJoin('users as u', 'uc.user_id', 'u.user_id')
        .select('u.user_id', 'u.username')
        .orderBy('c.class_id')
    const idArr = classes.map(c => c.class_id)
    const idArray = idArr.filter((ite, idx) => idArr.indexOf(ite) === idx)
    const classArr = idArray.map(id => {
        let classArr = []
        classes.forEach(cl => {
            if (cl.class_id === id) {
                classArr.push(cl)
            }
        })

        return classArr

    })
    const result = classArr.map(ite => {
        return ({
            class_id: ite[0].class_id,
            class_type: ite[0].class_type,
            class_location: ite[0].class_location,
            class_time: ite[0].class_time,
            class_date: ite[0].class_date,
            class_duration: ite[0].class_duration,
            intensity_level: ite[0].intensity_level,
            attendance:
                ite[0].user_class_id === null
                    ? []
                    : ite.map(i => {
                        return ({
                            booking_id: i.user_class_id,
                            user_id: i.user_id,
                            username: i.username
                        })
                    })
        })
    })
    return result
}

async function add(newClass) {
    const [{ class_id }] = await db('classes').insert(newClass, ['class_id'])
    return db('classes').where({ class_id }).first()
}



function remove(class_id) {

}

module.exports = {
    findAll,
    add,
    remove
}
