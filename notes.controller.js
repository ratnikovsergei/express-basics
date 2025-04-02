const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added!'));
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
  console.log(chalk.redBright(`Note with id ${id} was successfully removed from list!`));
}

async function updateNote(currentNote) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === currentNote.id);

  if (index >= 0) {
    notes[index] = { ...notes[index], ...currentNote };
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.yellow('Note was updated!'));
  }
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

module.exports = {
  addNote,
  updateNote,
  getNotes,
  removeNote,
};
