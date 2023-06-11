const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')

const verifyJwt = (req, res, next) => {
    try {
        const headers = req.headers['authorization']

        if (!headers) return next(ApiError.Unauthorized())

        const token = headers.replace('Bearer', '').trim()

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) return next(ApiError.Forbidden('Forbidden'))

            req.user = decoded

            next()
        })
    } catch (error) {
        return next(ApiError.Unauthorized())
    }
}

module.exports = verifyJwt