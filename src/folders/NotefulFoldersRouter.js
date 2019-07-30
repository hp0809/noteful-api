const path = require('path');
const express = require('express');
const xss = require('xss');
const logger = require('../logger');
const FoldersService = require('./folders-service');
const {validateFolder} = require('./validateFolder');

const NotefulFoldersRouter = express.Router();
const bodyParser = express.json()

const serializeFolder = folders => ({
    id: folders.id,
    name: xss(folders.name),
})

NotefulFoldersRouter
    .route('/')

    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        FoldersService.listFolders(knexInstance)
            .then(folders => {
                res.json(folders)
            })
        .catch(next)
        
    })

    
    .post(bodyParser, (req, res, next) => {
        const name = req.body
        const newFolder = name;

        if(!newFolder) {
            logger.error(`Name is required`)
                return res.status(400).send({
                    error: {message : `Name is required`}
            })
        }

        const error = validateFolder(newFolder);

        if(error) return res.status(400).send(error)


        FoldersService.insertFolder(
            req.app.get('db'),
            newFolder
            )
            .then(folders => {
              logger.info(`Folder with id ${folders.id} & ${folders.name} created.`)
              res
                .status(201)
                .location(path.posix.join(`${folders.id}`))
                .json(serializeFolder(folders))
            })
            .catch(next)
    })

NotefulFoldersRouter
    .route('/:folderId')
    
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const { folderId } = req.params
        FoldersService.getFolderById(knexInstance, req.params.folderId)
            .then(folders => {
                if(!folders) {
                    logger.error(`Folder with id ${folderId} not found.`)
                    return res.status(404).json({
                        error: {message: `Folder does not exist`}
                        })
                    }
                    res.json(folders)
                })
                .catch(next)
    })
    .delete((req, res, next) => {
        const { folderId } = req.params;
        FoldersService.deleteFolder(
          req.app.get('db'),
          folderId
        )
          .then(folders => {
            logger.info(`Folder with id ${folderId} deleted.`)
            res.status(204).end()
          })
          .catch(next)
      })    

    module.exports = NotefulFoldersRouter;