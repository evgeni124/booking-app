const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/dbConfig')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    refreshTokenId: {type: DataTypes.INTEGER},
    roleId: {type: DataTypes.INTEGER},
    bookings: {type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []}
})

const Place = sequelize.define('place', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    images: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []},
    numberGuests: {type: DataTypes.INTEGER},
    price: {type: DataTypes.INTEGER}
})

const RefreshToken = sequelize.define('refresh_token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING},
    userId: {type: DataTypes.INTEGER}
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: { type: DataTypes.INTEGER },
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

User.hasOne(RefreshToken)
RefreshToken.belongsTo(User)

User.hasOne(Role)
Role.belongsTo(User)

User.hasMany(Place)
Place.belongsTo(User)

module.exports = {
    User, RefreshToken, Place, Role
}