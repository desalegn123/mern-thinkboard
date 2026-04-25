import Note from '../../model/Note.js';
export async function getAllNote(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log('error on getAllnotes');
    res.status(500).json({ message: 'internal server error' });
  }
}
export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const saveNote = await note.save();
    res.status(201).json(saveNote);
  } catch (error) {
    console.log('error on getAllnotes');
    res.status(500).json({ message: 'internal server error' });
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'notes not found' });
    res.status(200).json(note);
  } catch (error) {
    console.log('error conttroler', error);
    res.status(500).json({ message: 'internal server error' });
  }
}
export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;

    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updateNote)
      return res.status(404).json({ message: 'notes not found' });

    res.status(200).json({ message: 'Note is updated successfully' });
  } catch (error) {
    console.log('error conttroler', error);
    res.status(500).json({ message: 'internal server error' });
  }
}
export async function deleteNotes(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote)
      return res.status(404).json({ message: 'notes not found' });
    res.json({ message: 'notes deleted successfully' });
  } catch (error) {
    console.log('error conttroler', error);
    res.status(500).json({ message: 'internal server error' });
  }
}
