const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    DateOfBirth: Date,
    email: {
        type: String,
    }
});

const User = mongoose.model('Users',userSchema);

module.exports =  User;
