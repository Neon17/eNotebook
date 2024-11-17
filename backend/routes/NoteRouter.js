const express = require('express');
const noteController = require('./../Controllers/NoteController');

const noteRouter = express.Router();

noteRouter.route('/')
    .get(noteController.getNotes)
    .post(noteController.postNotes);

noteRouter.route('/:id')
    .get(noteController.getNote)
    .patch(noteController.updateNote)
    .delete(noteController.deleteNote)

module.exports = noteRouter;
