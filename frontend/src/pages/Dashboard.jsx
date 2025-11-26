import { useEffect, useState } from "react";
import api from "../services/api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async (query = "") => {
    const res = await api.get("/notes", { params: { q: query } });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (note) => {
    const res = await api.post("/notes", note);
    setNotes((prev) => [res.data, ...prev]);
  };

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchNotes(value);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notes Dashboard</h1>
          <p className="page-subtitle">
            Create, search, and manage your personal notes.
          </p>
        </div>
        <input
          className="search-input"
          placeholder="Search notes..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <h2 className="panel-title">Create a note</h2>
          <NoteForm onCreate={handleCreate} />
        </section>

        <section className="panel">
          <h2 className="panel-title">Your notes</h2>
          <NoteList notes={notes} onDelete={handleDelete} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
