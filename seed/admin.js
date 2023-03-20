const mongoose = require('mongoose')
const User = require('../models/user')
require('dotenv').config({ path: '../' })

mongoose.connect('mongodb://root:abc123@ds129053.mlab.com:29053/sachin-blogs')

const user = new User({
    name: 'administrator',
    email: 'administrator@gmail.com',
    password: 'abc123'
})

user.save((err, user) => {
    if (err)
        console.log(err)
    else
        console.log("Success", user)
})