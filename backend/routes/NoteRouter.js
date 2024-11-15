const express = require('express');
const noteController = require('./../Controllers/NoteController');

const noteRouter = express.Router();

noteRouter.route('/').get(noteController.getNotes);

module.exports = noteRouter;
