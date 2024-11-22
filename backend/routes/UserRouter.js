const express = require('express');
const userController = require('./../Controllers/UserController');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const userRouter = express.Router();

userRouter.post('/signup',userController.signUp);
userRouter.post('/login',userController.login);

module.exports = userRouter;
