const User = require('./../Models/User');
const jwt = require('jsonwebtoken');


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
