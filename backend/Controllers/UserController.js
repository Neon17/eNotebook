const User = require('./../Models/User');
const jwt = require('jsonwebtoken');
const util = require('node:util');
const bcrypt = require('bcrypt');
const sendEmail = require('./../utils/sendEmail');


const signToken = id =>{
    return jwt.sign({id: id},process.env.SECRET_STR,{
        expiresIn: process.env.LOGIN_EXPIRES
    })
}

exports.signUp = async (req,res)=>{
    try {
        // Validate the incoming request body if needed
        if (!req.body || !req.body.email || !req.body.password) {
            return res.status(200).json({
                status: 'fail',
                message: 'Invalid input. Please provide all required fields.'
            });
        }
        let user = await User.create(req.body);
        
        //token is created
        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            token,
            data: user
        })
    }
    catch (err) {
        res.status(200)
        res.json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.login = async (req,res)=>{
    try {
        //check this password and password in db by bcyrpt.compare(a,b)
        let { email,password } = req.body;

        if (!email || !password){
            throw new Error('Please provide email ID and Password for login');
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user){
            throw new Error('Incorrect username or password');
        }

        const isMatch = await user.comparePasswordInDb(password, user.password);
        if (!isMatch){
            throw new Error('Incorrect username or password');
        }
        
        //token is now created
        const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token,
            data: user
        })
    }
    catch (err) {
        res.status(200)
        res.json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.profile = async(req,res)=>{
    try{
        let user = req.user;
        user.password = undefined;
        res.json({
            status: 'success',
            data: user
        })
    }
    catch(err){
        res.status(200).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.update = async(req,res)=>{
    try {
        let token = req.headers.authorization;
        if (!token)
            throw new Error("Invalid Token");
        token = token.split(" ")[1];
        const decodedToken = await (util.promisify)(jwt.verify)(token,process.env.SECRET_STR);
        let updatedUser = await User.findByIdAndUpdate(decodedToken.id,req.body,{ new:true, runValidators: true });
        if (!updatedUser)
            throw new Error('No user found with that id');
        res.status(200).json({
            status: 'success',
            data: updatedUser
        }) 
    }
    catch (err){
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.updatePassword = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).select('+password');
        const isMatch = await user.comparePasswordInDb(req.body.currentPassword, user.password);

        if (!isMatch)
            throw new Error("Password didn't match");
        if (req.body.password=="")
            throw new Error("Password shouldn't be empty");
        if (req.body.password!=req.body.confirmPassword)
            throw new Error("New and Confirm Password didn't match");

        req.body.password = bcrypt.hashSync(req.body.password,12);
        req.body.confirmPassword = undefined;
        const updatedUser = await User.findByIdAndUpdate(user._id,req.body,{ new:true, runValidators:true });

        res.status(200).json({
            status: 'success',
            data: updatedUser
        })
    }
    catch (err){
        res.status(200).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.sendResetTokenEmail = async(req,res)=>{
    try {
        if (!req.user.email)
            throw new Error("Email is required");
        const user = await User.findOne({email: req.user.email});
        const resetToken = await user.createResetPasswordToken();
        // await user.save({validateBeforeSave: false});
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
        const message = `We have received a password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\n This reset url will be valid only for 10 min`;
        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Change Request Received',
                message: message
            })
            res.status(200).json({
                status: 'success',
                message: 'Password Reset Link sent to the user email'
            })
        }
        catch (err){
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;
            // await user.save({validateBeforeSave: false});
        }
    }
    catch (err){
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.resetPassword = async(req,res)=>{
    try {
        //creating new password and confirming
    }
    catch (err){
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }
}
