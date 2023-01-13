const jwt = require('jsonwebtoken');

const secret = 'test-anydata'
const JWT = {
    generate(value, expires) {
        return jwt.sign(value, secret, {expiresIn: expires})
    },
    vertify(token) {
        try {
            return jwt.verify(token, secret)
        } catch (error) {
            return false
        }
    }
}

module.exports = JWT