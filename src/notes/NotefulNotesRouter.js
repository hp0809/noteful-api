const path = require('path');
const express = require('express');
const xss = require('xss');
const logger = require('../logger');
const NotesService = require('./notes-service');

const NotefulNotesRouter = express.Router();
const bodyParser = express.json()

const serializeNote = notes => ({
    id: notes.id,
    name: xss(notes.name),
    modified: notes.modified,
    content: xss(notes.content),
    folderid: notes.folderid
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
        const {name, content, folderid} = req.body
        const newNote = {name, content, folderid}

        for(const field of ['name', 'content', 'folderid']) {
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
            .then(notes => {
              logger.info(`Note with id ${notes.id} created.`)
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `${notes.id}`))
                .json(serializeNote(notes))
            })
            .catch(next)
    })

NotefulNotesRouter
    .route('/:noteId')
    

    .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    console.log(req.params)
    NotesService.getNoteById(knexInstance, req.params.noteId)
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

    .delete((req, res, next) => {
        const { noteId } = req.params;
        NotesService.deleteNote(
          req.app.get('db'),
          noteId
        )
        .then(note => {
            logger.info(`Note with id ${noteId} deleted.`)
            console.log("note is ", note)
            res.status(204).end();
          })
          .catch(err => {
            next(err);
          });
      });
          
    


module.exports = NotefulNotesRouter;