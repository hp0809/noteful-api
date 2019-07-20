'use strict';

const NotesService = {
  listNotes(knex) {
    return knex
    .select('*')
    .from('notes');
  },

  getNoteById(knex, id) {
    return knex
        .from('notes')
        .select('*')
        .where('id', id)
        .first()
    },

  insertNote(knex, note) {
    return knex
      .insert(note)
      .into('notes')
      .returning('*')
      .then(rows => rows[0]);
    },

  deleteNote(knex, id) {
    return knex('notes')
        .where({id})
        .delete()
    }
};

module.exports = NotesService;