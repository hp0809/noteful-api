const logger = require('../logger')

const NO_ERRORS = null

function validateFolder(name) {
  if (name.length > 3) {
    logger.error(`Name is required`)
    return {
      error: {
        message: `A name is required`
      }
    }
  }

  return NO_ERRORS
}

module.exports = {
  validateFolder
}