const mongoose = require('mongoose')
require('dotenv').config()

const url = mongodb+srv://cnpm-stdm:ohISsPVqCAeCAWMh@student-management.rs2ajjf.mongodb.net/

const connect = () => {
    mongoose.connect(url)
        .then(() => console.log('connect db sucess'))
        .catch((err) => console.log('connect err', err))
}

module.exports = connect
