import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notes')
      const data = await response.json()
      setNotes(data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const addNote = async (e) => {
    e.preventDefault()
    if (!newNote) return

    try {
      await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newNote })
      })
      setNewNote('')
      fetchNotes()
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE'
      })
      fetchNotes()
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Docker Notes App</h1>
      <p>This simple React app is talking to your Node server, which is talking to Postgres!</p>

      <form onSubmit={addNote} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
          style={{ padding: '10px', width: '70%', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Save</button>
      </form>

      <div>
        {notes.length === 0 ? <p>No notes yet. Add one above!</p> : null}
        {notes.map(note => (
          <div key={note.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ margin: 0 }}>{note.content}</p>
            <button onClick={() => deleteNote(note.id)} style={{ background: '#ff4444', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
