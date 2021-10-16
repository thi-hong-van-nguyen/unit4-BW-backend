const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('./users-model')
const md = require('./users-middleware')
const tokenBuilder = require('./token-builder')

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
})

router.post('/register', md.validatePayload, md.checkUsernameUnique, md.checkRoleId, (req, res, next) => {
    let user = req.body

    const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 4

    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash

    User.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(next)
})

router.post('/login', md.validatePayload, md.checkUsernameExist, async (req, res, next) => {
    try {
        let user = req.body

        const existingUser = await User.findBy({ 'username': user.username }).first()

        if (bcrypt.compareSync(user.password, existingUser.password)) {
            const role = await md.getRole(existingUser.user_id)

            const token = tokenBuilder(existingUser)

            res.status(200).json({
                message: `welcome back, ${existingUser.username}`,
                token,
                role_name: role.role_name
            })

        } else {
            next({
                status: 401,
                message: 'invalid pw'
            })
        }
    } catch (err) { next(err) }
})


module.exports = router
