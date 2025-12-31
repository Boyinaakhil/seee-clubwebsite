import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
const navigate = useNavigate();

return (
<div className="welcome-container">
<div className="welcome-card">
<h1 className="welcome-title">Welcome to ClubHub</h1>
<p className="welcome-subtitle">
University Club Management System - Connect, Collaborate, Celebrate
</p>    <div className="panel-container">
      <div 
        className="panel panel-student"
        onClick={() => navigate('/')}
      >
        <div className="panel-icon">🎓</div>
        <h3>Student Panel</h3>
        <p>Explore club events, announcements, board members and more.</p>
        <button className="btn btn-primary">Enter Website</button>
      </div>
      
      <div 
        className="panel panel-admin"
        onClick={() => navigate('/admin/login')}
      >
        <div className="panel-icon">🔐</div>
        <h3>Admin Panel</h3>
        <p>Manage events, announcements, and board members securely.</p>
        <button className="btn btn-primary">Admin Login</button>
      </div>
    </div>
    
    <p style={{ marginTop: '2rem', color: '#95a5a6' }}>
      Select a panel to continue
    </p>
  </div>
</div>
);
};

export default WelcomePage;