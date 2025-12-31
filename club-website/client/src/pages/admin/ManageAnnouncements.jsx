import { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageAnnouncements = () => {
const [announcements, setAnnouncements] = useState([]);
const [loading, setLoading] = useState(true);
const [formData, setFormData] = useState({
title: '',
content: '',
category: 'general'
});
const [editingId, setEditingId] = useState(null);

useEffect(() => {
fetchAnnouncements();
}, []);

const fetchAnnouncements = async () => {
try {
const response = await api.get('/announcements');
setAnnouncements(response.data);
} catch (error) {
console.error('Error fetching announcements:', error);
} finally {
setLoading(false);
}
};

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
  const dataToSend = {
    ...formData,
    date: new Date().toISOString()
  };
  
  if (editingId) {
    await api.put(`/announcements/${editingId}`, dataToSend);
  } else {
    await api.post('/announcements', dataToSend);
  }
  
  setFormData({
    title: '',
    content: '',
    category: 'general'
  });
  setEditingId(null);
  fetchAnnouncements();
} catch (error) {
  console.error('Error saving announcement:', error);
}
};

const handleEdit = (announcement) => {
setFormData({
title: announcement.title,
content: announcement.content,
category: announcement.category || 'general'
});
setEditingId(announcement._id);
};

const handleDelete = async (id) => {
if (!window.confirm('Are you sure you want to delete this announcement?')) return;
try {
  await api.delete(`/announcements/${id}`);
  fetchAnnouncements();
} catch (error) {
  console.error('Error deleting announcement:', error);
}
};

if (loading) {
return (
<div className="page-container">
<div>Loading announcements...</div>
</div>
);
}

return (
<div className="page-container">
<h1 className="page-title">Manage Announcements</h1>
  <div className="card">
    <h3>{editingId ? 'Edit Announcement' : 'Create New Announcement'}</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-input"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="event">Event</option>
          <option value="important">Important</option>
          <option value="update">Update</option>
        </select>
      </div>
      
      <div className="form-group">
        <label className="form-label">Content</label>
        <textarea
          name="content"
          className="form-input"
          rows="4"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      <button type="submit" className="btn btn-primary">
        {editingId ? 'Update Announcement' : 'Create Announcement'}
      </button>
      
      {editingId && (
        <button 
          type="button"
          className="btn"
          onClick={() => {
            setFormData({
              title: '',
              content: '',
              category: 'general'
            });
            setEditingId(null);
          }}
          style={{ marginLeft: '1rem' }}
        >
          Cancel Edit
        </button>
      )}
    </form>
  </div>
  
  <div className="card" style={{ marginTop: '2rem' }}>
    <h3>All Announcements</h3>
    
    {announcements.length > 0 ? (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '1rem' }}>{announcement.title}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{
                  backgroundColor: '#e8f4fc',
                  color: '#3498db',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  {announcement.category}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                {new Date(announcement.date).toLocaleDateString()}
              </td>
              <td style={{ padding: '1rem' }}>
                <button 
                  onClick={() => handleEdit(announcement)}
                  className="btn btn-primary"
                  style={{ marginRight: '0.5rem' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(announcement._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p style={{ marginTop: '1rem' }}>No announcements found.</p>
    )}
  </div>
</div>
);
};

export default ManageAnnouncements;
