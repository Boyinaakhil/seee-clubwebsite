import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLogin = () => {
const [credentials, setCredentials] = useState({
username: '',
password: ''
});
const [error, setError] = useState('');
const { login } = useContext(AuthContext);
const navigate = useNavigate();

const handleChange = (e) => {
setCredentials({
...credentials,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();
setError('');try {
  await login(credentials);
  navigate('/admin/dashboard');
} catch (err) {
  setError('Invalid credentials. Please try again.');
}
};

return (
<div className="page-container">
<div className="form-container">
<h2 className="page-title">Admin Login</h2>
    {error && (
      <div style={{
        backgroundColor: '#fee',
        color: '#c33',
        padding: '1rem',
        borderRadius: '5px',
        marginBottom: '1rem'
      }}>
        {error}
      </div>
    )}
    
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          className="form-input"
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-input"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        Login
      </button>
    </form>
    
    <p style={{ marginTop: '1rem', textAlign: 'center', color: '#7f8c8d' }}>
      Back to{' '}
      <button 
        onClick={() => navigate('/welcome')}
        style={{
          background: 'none',
          border: 'none',
          color: '#6a11cb',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Welcome Page
      </button>
    </p>
  </div>
</div>
);
};

export default AdminLogin;