import { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageBoard = () => {
const [boardMembers, setBoardMembers] = useState([]);
const [loading, setLoading] = useState(true);
const [formData, setFormData] = useState({
name: '',
position: '',
department: '',
email: ''
});
const [editingId, setEditingId] = useState(null);

useEffect(() => {
fetchBoardMembers();
}, []);

const fetchBoardMembers = async () => {
try {
const response = await api.get('/board');
setBoardMembers(response.data);
} catch (error) {
console.error('Error fetching board members:', error);
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
  if (editingId) {
    await api.put(`/board/${editingId}`, formData);
  } else {
    await api.post('/board', formData);
  }
  
  setFormData({
    name: '',
    position: '',
    department: '',
    email: ''
  });
  setEditingId(null);
  fetchBoardMembers();
} catch (error) {
  console.error('Error saving board member:', error);
}
};

const handleEdit = (member) => {
setFormData({
name: member.name,
position: member.position,
department: member.department,
email: member.email
});
setEditingId(member._id);
};

const handleDelete = async (id) => {
if (!window.confirm('Are you sure you want to delete this board member?')) return;
try {
  await api.delete(`/board/${id}`);
  fetchBoardMembers();
} catch (error) {
  console.error('Error deleting board member:', error);
}
};

if (loading) {
return (
<div className="page-container">
<div>Loading board members...</div>
</div>
);
}

return (
<div className="page-container">
<h1 className="page-title">Manage Board Members</h1>
  <div className="card">
    <h3>{editingId ? 'Edit Board Member' : 'Add New Board Member'}</h3>
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Position</label>
          <input
            type="text"
            name="position"
            className="form-input"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            className="form-input"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary">
        {editingId ? 'Update Member' : 'Add Member'}
      </button>
      
      {editingId && (
        <button 
          type="button"
          className="btn"
          onClick={() => {
            setFormData({
              name: '',
              position: '',
              department: '',
              email: ''
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
    <h3>All Board Members</h3>
    
    {boardMembers.length > 0 ? (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Position</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Department</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boardMembers.map((member) => (
            <tr key={member._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '1rem' }}>{member.name}</td>
              <td style={{ padding: '1rem' }}>{member.position}</td>
              <td style={{ padding: '1rem' }}>{member.department}</td>
              <td style={{ padding: '1rem' }}>{member.email}</td>
              <td style={{ padding: '1rem' }}>
                <button 
                  onClick={() => handleEdit(member)}
                  className="btn btn-primary"
                  style={{ marginRight: '0.5rem' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(member._id)}
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
      <p style={{ marginTop: '1rem' }}>No board members found.</p>
    )}
  </div>
</div>
);
};

export default ManageBoard;
