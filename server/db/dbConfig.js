const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    {
        username: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        host: process.env.DB_HOST
    }  
)

module.exports = { sequelize }