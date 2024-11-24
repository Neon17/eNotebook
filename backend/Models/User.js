const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email should be unique']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select:false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm your password required'],
        validate: {
           validator: function(val){return val==this.password},
           message: 'Password and Confirm Password doesnt match'
        }
    },
    DateOfBirth: {
        type: String,
        required: [true, 'Date of Birth is required'],
        default: new Date().toISOString().split("T")[0]
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    passwordCreatedAt: {
        type: String,
        required: true,
        default: new Date().toISOString()
    }
});

userSchema.methods.comparePasswordInDb = async (pswd, pswdDB)=>{
    return await bcrypt.compare(pswd, pswdDB);
}

userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32);
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now()+10*60*1000;
    return resetToken;
}

userSchema.pre('save',function (next){
    this.confirmPassword = null;
    this.password = bcrypt.hashSync(this.password, 12);
    this.confirmPassword = undefined;
    next();
})

const User = mongoose.model('Users',userSchema);

module.exports =  User;
