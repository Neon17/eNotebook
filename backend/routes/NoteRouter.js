const express = require('express');
const noteController = require('./../Controllers/NoteController');
const protect = require('./../Controllers/protect');

const noteRouter = express.Router();

noteRouter.route('/')
    .get(protect,noteController.getNotes)
    .post(protect,noteController.postNotes);

noteRouter.route('/:id')
    .get(protect,noteController.getNote)
    .patch(protect,noteController.updateNote)
    .delete(protect,noteController.deleteNote)

module.exports = noteRouter;
