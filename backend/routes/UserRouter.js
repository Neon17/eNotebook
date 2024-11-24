const express = require('express');
const userController = require('./../Controllers/UserController');
const protect = require('./../Controllers/protect');

const userRouter = express.Router();

userRouter.post('/signup',userController.signUp);
userRouter.post('/login',userController.login);
userRouter.get('/profile',protect,userController.profile);
userRouter.patch('/update',protect,userController.update);
userRouter.put('/sendResetTokenEmail',protect,userController.sendResetTokenEmail);
userRouter.get('/resetPassword/:token',userController.resetPassword);
userRouter.patch('/updatePassword',protect,userController.updatePassword);

module.exports = userRouter;
