const jwt = require('jsonwebtoken')
const { RefreshToken } = require('../../models/models')

class TokenService {
    async createOrUpdateRefreshToken(userId, value) {
        const refreshToken = await RefreshToken.findOne({ where: { userId } })
        
        if (refreshToken) {
            refreshToken.userId = userId
            refreshToken.value = value
            await refreshToken.save()
            return refreshToken
        } else {
            const newRefreshToken = await RefreshToken.create({ userId, value })
            return newRefreshToken
        }
    }

    async findRefreshTokenByValue(value) {
        const refreshToken = await RefreshToken.findOne({ where: { value } })
        return refreshToken
    }

    async deleteRefreshToken(refreshToken) {
        await RefreshToken.destroy({ where: { value: refreshToken  }})
    }

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d'})

        return {
            accessToken, refreshToken
        }
    }
}

module.exports = new TokenService()