const UserService = require('../../services/user/UserService')
const TokenService = require('../../services/token/TokenService')
const RoleService = require('../../services/role/RoleService')
const ApiError = require('../../errors/ApiError')
const { validationHandler } = require('../../validation/validate')
const bcrypt = require('bcrypt')

class UserController {
    async login(req, res, next) {
        try {
            const errors = validationHandler(req)
            if (errors) return res.send({ errors })
            
            const { email, password } = req.body

            const foundUser = await UserService.getUserByEmail(email)

            if (!foundUser) {
                throw ApiError.BadRequest('Bad Request.')
            }

            const equalPasswords = await bcrypt.compare(password, foundUser.password)

            if (!equalPasswords) {
                throw ApiError.BadRequest('Bad Request.')
            }
            // token
            const tokens = await TokenService.generateTokens({
                id: foundUser.id, name: foundUser.name, surname: foundUser.surname, email: foundUser.email
            })
            const newRefreshToken = await TokenService.createOrUpdateRefreshToken(foundUser.id, tokens.refreshToken)
            if (newRefreshToken) {
                const newRefreshTokenId = newRefreshToken.id
                foundUser.refreshTokenId = newRefreshTokenId
                await foundUser.save()
            }
            // role
            const role = await RoleService.createOrGetRole(foundUser.id)
            foundUser.roleId = role.id
            await foundUser.save()

            res.cookie('jwt', tokens.refreshToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 })

            return res.status(200).json({ 
                    user: {
                            id: foundUser.id,
                            name: foundUser.name,
                            surname: foundUser.surname,
                            email: foundUser.email
                    },
                    role: role.role,
                    accessToken: tokens.accessToken 
            })
        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next) {
        try {
            const errors = validationHandler(req)
            if (errors) return res.send({ errors })

            const {name, surname, email, password} = req.body

            const user = await UserService.getUserByEmail(email)

            if (user) throw ApiError.BadRequest('User already exists.')

            const newUserData = {
                name, surname, email, password: await bcrypt.hash(password, 8)
            }

            const createdUser = await UserService.saveUser(newUserData)
            
            if (createdUser) {
                return res.json({ message: 'User has been created successfully.' })
            }
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const cookie = req.cookies
            if (!cookie?.jwt) throw ApiError.NoContent('No Content.')

            const refreshToken = cookie?.jwt

            const foundToken = await TokenService.findRefreshTokenByValue(refreshToken)
            const foundUser = await UserService.getUserById(foundToken.userId)
            
            if (!foundUser) {
                res.clearCookie('jwt', {httpOnly: true, path: '/'});
                throw ApiError.NoContent('No Content.'); // No content
            }

            await TokenService.deleteRefreshToken(refreshToken);
            foundUser.refreshTokenId = null
            await foundUser.save()

            res.clearCookie('jwt', {httpOnly: true, path: '/'});
            return res.status(204).json({ message: 'No content '})   
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()