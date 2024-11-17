const express = require('express');
const noteController = require('./../Controllers/NoteController');

const noteRouter = express.Router();

noteRouter.route('/')
    .get(noteController.getNotes)
    .post(noteController.postNotes);

noteRouter.route('/:id')
    .patch(noteController.updateNote)
    .delete(noteController.deleteNote)

module.exports = noteRouter;
