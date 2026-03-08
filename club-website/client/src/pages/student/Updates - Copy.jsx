import { useState, useEffect } from 'react';
import api from '../../services/api';

const Updates = () => {
const [announcements, setAnnouncements] = useState([]);
const [loading, setLoading] = useState(true);

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

if (loading) {
return (
<div className="page-container">
<div>Loading announcements...</div>
</div>
);
}

return (
<div className="page-container">
<h1 className="page-title">Updates & Announcements</h1>
  <div className="card-grid">
    {announcements.length > 0 ? (
      announcements.map((announcement) => (
        <div key={announcement._id} className="card">
          <h3 className="card-title">{announcement.title}</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
            {new Date(announcement.date).toLocaleDateString()}
          </p>
          <p>{announcement.content}</p>
          {announcement.category && (
            <span style={{
              display: 'inline-block',
              backgroundColor: '#e8f4fc',
              color: '#3498db',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              marginTop: '1rem'
            }}>
              {announcement.category}
            </span>
          )}
        </div>
      ))
    ) : (
      <div className="card">
        <p>No announcements available at the moment.</p>
      </div>
    )}
  </div>
</div>
);
};

export default Updates;