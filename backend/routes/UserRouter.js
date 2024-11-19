const express = require('express');
const userController = require('./../Controllers/UserController');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const userRouter = express.Router();

const protect = async(req,res,next)=>{
    const testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith('Bearer')){
        token = testToken.split(" ")[1];
    }
    if (!token){
        throw new Error('You are not logged in');
    }
    //validating the token
    const decodedToken = await util.promisify(jwt.verify)(token,process.env_SECRET_STR);
    const user = await User.findById(decodedToken.id);
    if (!user)
        throw new Error('User with given token doesnt exist');
    req.user = user;    
}

userRouter.post('/signup',userController.signUp);
userRouter.post('/login',userController.login);

module.exports = userRouter;
