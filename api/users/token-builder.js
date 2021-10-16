const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'keep it secret'

module.exports = user => {
    const payload = {
        subject: user.user_id,
        username: user.username,
        password: user.password,
        role_id: user.role_id
    }

    const options = {
        expiresIn: '1d'
    }

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        options
    )

    return token
}