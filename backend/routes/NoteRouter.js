const express = require('express');
const noteController = require('./../Controllers/NoteController');
const User = require('../Models/User');
const asyncErrorHandler = require('./../utils/AsyncErrorHandler');
const util = require('util');
const jwt = require('jsonwebtoken');

const noteRouter = express.Router();

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

noteRouter.route('/')
    .get(protect,noteController.getNotes)
    .post(protect,noteController.postNotes);

noteRouter.route('/:id')
    .get(protect,noteController.getNote)
    .patch(protect,noteController.updateNote)
    .delete(protect,noteController.deleteNote)

module.exports = noteRouter;
