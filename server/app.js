require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const models = require('./models/models')
const { sequelize } = require('./db/dbConfig')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/ErrorMiddleware')

const PORT = process.env.NODE_ENV === 'development' ? 4800 : 5800

app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./static'))
app.use(cookieParser('jwt'))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.sync()
        await sequelize.authenticate()
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()