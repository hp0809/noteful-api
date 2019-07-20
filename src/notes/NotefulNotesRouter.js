const path = require('path');
const express = require('express');
const xss = require('xss');
const logger = require('../logger');
const NotesService = require('./notes-service');

const NotefulNotesRouter = express.Router();
const bodyParser = express.json()

const serializeNote = notes => ({
    id: notes.id,
    notes_name: xss(notes.notes_name),
    date_modified: notes.date_modified,
    content: xss(notes.content),
    folder_id: notes.folder_id
});

NotefulNotesRouter
    .route('/')
    
    .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    NotesService.listNotes(knexInstance)
        .then(notes => {
            res.json(notes)
        })
    .catch(next)
    })

    .post(bodyParser, (req, res, next) => {
        const {notes_name, content, folder_id} = req.body
        const newNote = {notes_name, content, folder_id}

        for(const field of ['notes_name', 'content']) {
            if(!newNote[field]) {
                logger.error(`${field} is required`)
                return res.status(400).send({
                    error: {message : `'${field}' is required`}
                })
            }
        }

        NotesService.insertNote(
            req.app.get('db'),
            newNote
            )
            .then(note => {
              logger.info(`Note with id ${note.id} created.`)
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `${note.id}`))
                .json(serializeNote(note))
            })
            .catch(next)
    })

NotefulNotesRouter
    .route('/:note_id')
    

    .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    NotesService.getNoteById(knexInstance, req.params.note_id)
        .then(note => {
            if(!note) {
                return res.status(404).json({
                    error: {message: `Note does not exist`}
                })
            }
            res.json(note)
        })
        .catch(next)
    })

    .delete(bodyParser,(req, res, next) => {
        const { id } = req.params;
        NotesService.deleteNote(
          req.app.get('db'),
          id
        )
          .then(note => {
            logger.info(`Note with id ${id} deleted.`)
            res.status(204).end()
          })
          .catch(next)
      })
    


module.exports = NotefulNotesRouter;