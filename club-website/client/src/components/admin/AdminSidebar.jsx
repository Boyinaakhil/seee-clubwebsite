import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminSidebar = () => {
const { logout } = useContext(AuthContext);

return (
<div className="admin-sidebar">
<h2 style={{ padding: '0 2rem', marginBottom: '2rem' }}>Admin Panel</h2>
  <NavLink 
    to="/admin/dashboard" 
    className={({ isActive }) => 
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    📊 Dashboard
  </NavLink>
  
  <NavLink 
    to="/admin/events" 
    className={({ isActive }) => 
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    🎉 Manage Events
  </NavLink>
  
  <NavLink 
    to="/admin/announcements" 
    className={({ isActive }) => 
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    📢 Manage Announcements
  </NavLink>
  
  <NavLink 
    to="/admin/board" 
    className={({ isActive }) => 
      `sidebar-link ${isActive ? 'active' : ''}`
    }
  >
    👥 Manage Board
  </NavLink>
  
  <div style={{ marginTop: 'auto', padding: '2rem' }}>
    <button 
      onClick={logout}
      className="btn btn-danger"
      style={{ width: '100%' }}
    >
      Logout
    </button>
  </div>
</div>
);
};

export default AdminSidebar;