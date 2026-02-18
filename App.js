
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://127.0.0.1:8000/api/bookmarks/";

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const res = await axios.get(API);
    setBookmarks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API}${editId}/`, { title, url });
      setEditId(null);
    } else {
      await axios.post(API, { title, url });
    }
    setTitle("");
    setUrl("");
    fetchBookmarks();
  };

  const handleEdit = (bookmark) => {
    setTitle(bookmark.title);
    setUrl(bookmark.url);
    setEditId(bookmark.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}${id}/`);
    fetchBookmarks();
  };

  return (
    <div className="container">
      <h2>Smart Bookmark Manager</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className={editId ? "update-btn" : "add-btn"}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="card">
          <h4>{bookmark.title}</h4>
          <a href={bookmark.url} target="_blank" rel="noreferrer">
            {bookmark.url}
          </a>
          <br /><br />
          <button className="edit-btn" onClick={() => handleEdit(bookmark)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(bookmark.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
