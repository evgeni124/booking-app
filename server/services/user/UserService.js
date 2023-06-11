const { User } = require("../../models/models")

class UserService {
    async getUserByEmail(email) {
        const user = await User.findOne({ where: { email }})
        return user
    }

    async getUserById(id) {
        const user = await User.findOne({ where: { id }})
        return user
    }

    async saveUser(userData) {
        const user = await User.create({...userData})
        return user
    }
}

module.exports = new UserService()