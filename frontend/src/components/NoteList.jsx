const NoteList = ({ notes, onDelete }) => {
  if (!notes.length) {
    return <p className="note-empty">No notes yet. Create your first one.</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note._id} className="note-item">
          <div>
            <div className="note-title">{note.title}</div>
            {note.content && (
              <div className="note-content">{note.content}</div>
            )}
          </div>
          <button
            className="btn-danger"
            type="button"
            onClick={() => onDelete(note._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
