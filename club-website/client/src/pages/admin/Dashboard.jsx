import { useState, useEffect } from 'react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    events: 0,
    announcements: 0,
    boardMembers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [eventsRes, announcementsRes, boardRes] = await Promise.all([
        api.get('/events'),           // Remove /api
        api.get('/announcements'),    // Remove /api
        api.get('/board')             // Remove /api
      ]);
      
      setStats({
        events: eventsRes.data.length,
        announcements: announcementsRes.data.length,
        boardMembers: boardRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Dashboard</h1>
      
      <div className="card-grid">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 className="card-title">🎉 Events</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#6a11cb' }}>
            {stats.events}
          </p>
          <p>Total events scheduled</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 className="card-title">📢 Announcements</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2575fc' }}>
            {stats.announcements}
          </p>
          <p>Active announcements</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 className="card-title">👥 Board Members</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#27ae60' }}>
            {stats.boardMembers}
          </p>
          <p>Current board members</p>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/admin/events'}
          >
            Add New Event
          </button>
          <button 
            className="btn btn-success"
            onClick={() => window.location.href = '/admin/announcements'}
          >
            Create Announcement
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/admin/board'}
          >
            Add Board Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;