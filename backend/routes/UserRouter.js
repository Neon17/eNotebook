const express = require('express');
const userController = require('./../Controllers/UserController');
const protect = require('./../Controllers/protect');

const userRouter = express.Router();

userRouter.post('/signup',userController.signUp);
userRouter.post('/login',userController.login);
userRouter.get('/profile',protect,userController.profile);

module.exports = userRouter;
