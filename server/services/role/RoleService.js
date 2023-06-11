const { Role } = require("../../models/models");

class RoleService {
    async createOrGetRole(userId, user) {
        const role = await Role.findOne({ where: { userId }})

        if (role) {
            return role
        } else {
            const newRole = await Role.create({ userId })
            return newRole
        }
    }
}

module.exports = new RoleService()