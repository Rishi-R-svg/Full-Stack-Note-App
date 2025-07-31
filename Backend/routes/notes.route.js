import express from 'express'
import { createNote, deleteNotes, getNotes, updateNotes } from '../controllers/notes.controller.js';
import { checkLogin } from '../Middlewares/NoteMiddlWare.js';

const notesRouter = express.Router();

/// Create Notes
notesRouter.post('/create', checkLogin , createNote)
/// Get all Notes
notesRouter.post('/get/:userId', checkLogin , getNotes)
/// Delete Notes
notesRouter.delete('/delete/:id', checkLogin , deleteNotes)
/// Update Notes
notesRouter.put('/update/:id', checkLogin , updateNotes)





export {notesRouter} 