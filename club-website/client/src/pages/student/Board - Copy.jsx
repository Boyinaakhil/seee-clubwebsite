import { useState, useEffect } from 'react';
import api from '../../services/api';

const Board = () => {
const [boardMembers, setBoardMembers] = useState([]);
const [loading, setLoading] = useState(true);

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

if (loading) {
return (
<div className="page-container">
<div>Loading board members...</div>
</div>
);
}

return (
<div className="page-container">
<h1 className="page-title">Board Members</h1>
  <div className="card-grid">
    {boardMembers.length > 0 ? (
      boardMembers.map((member) => (
        <div key={member._id} className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#6a11cb',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem'
          }}>
            {member.name.charAt(0)}
          </div>
          <h3 className="card-title">{member.name}</h3>
          <p><strong>{member.position}</strong></p>
          <p>{member.department}</p>
          <p>{member.email}</p>
        </div>
      ))
    ) : (
      <div className="card">
        <p>Board member information coming soon.</p>
      </div>
    )}
  </div>
</div>
);
};

export default Board;
