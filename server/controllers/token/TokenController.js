const jwt = require('jsonwebtoken')
const TokenService = require('../../services/token/TokenService')
const UserService = require('../../services/user/UserService')
const ApiError = require('../../errors/ApiError')

class TokenController {
    async refresh(req, res, next) {
        const cookie = req.cookies

        if (!cookie?.jwt) throw ApiError.Unauthorized()

        const token = cookie.jwt

        if (!token) throw ApiError.Unauthorized()

        const foundToken = await TokenService.findRefreshTokenByValue(token)        
        
        if (!foundToken) throw ApiError.Unauthorized()

        const foundUser = await UserService.getUserById(foundToken.userId)

        if (!foundUser) throw ApiError.Forbidden('Forbidden')

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,
            async (error, decoded) => {
                if (error || decoded.id !== foundUser.id || 
                    decoded.name !== foundUser.name || 
                    decoded.email !== foundUser.email || decoded.surname !== foundUser.surname) {
                        throw ApiError.Unauthorized()
                    }
                const tokens = await TokenService.generateTokens({
                    id: foundUser.id, name: foundUser.name, email: foundUser.email, surname: foundUser.surname})
                return res.json({ 
                    user: {
                        id: foundUser.id, 
                        name: foundUser.name, 
                        email: foundUser.email, 
                        surname: foundUser.surname
                    },
                    accessToken: tokens.accessToken 
                })
            })
    }

}

module.exports = new TokenController()