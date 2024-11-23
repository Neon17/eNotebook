const User = require('../Models/User');
const asyncErrorHandler = require('./../utils/AsyncErrorHandler');
const util = require('util');
const jwt = require('jsonwebtoken');

const protect = asyncErrorHandler(async(req,res,next)=>{
    const testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith('Bearer')){
        token = testToken.split(" ")[1];
    }
    if (!token){
        throw new Error('jwt expired');
    }
    //validating the token
    const decodedToken = await util.promisify(jwt.verify)(token,process.env.SECRET_STR);
    const user = await User.findById(decodedToken.id);
    if (!user)
        throw new Error('jwt expired');
    req.user = user; 
    next();   
});

module.exports = protect;
