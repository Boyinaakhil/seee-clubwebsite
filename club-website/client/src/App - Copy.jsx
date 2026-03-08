import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AdminSidebar from './components/admin/AdminSidebar';
import WelcomePage from './components/welcome/WelcomePage';
import AdminLogin from './components/auth/AdminLogin';
import routes from './routes';

import './assets/styles.css';

function App() {
return (
<AuthProvider>
<Router>
<Routes>
<Route path="/welcome" element={<WelcomePage />} />
<Route path="/admin/login" element={<AdminLogin />} />      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <div>
            <Navbar />
            <div className="admin-layout">
              <AdminSidebar />
              <div className="admin-content">
                <Routes>
                  <Route path="dashboard" element={routes.admin.dashboard} />
                  <Route path="events" element={routes.admin.events} />
                  <Route path="announcements" element={routes.admin.announcements} />
                  <Route path="board" element={routes.admin.board} />
                </Routes>
              </div>
            </div>
            <Footer />
          </div>
        </ProtectedRoute>
      } />
      
      {/* Public Routes */}
      <Route path="/*" element={
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={routes.public.home} />
            <Route path="/about" element={routes.public.about} />
            <Route path="/events" element={routes.public.events} />
            <Route path="/updates" element={routes.public.updates} />
            <Route path="/college" element={routes.public.college} />
            <Route path="/board" element={routes.public.board} />
            <Route path="/contact" element={routes.public.contact} />
            <Route path="/events/:id" element={routes.public.eventDetail} />
          </Routes>
          <Footer />
        </>
      } />
    </Routes>
  </Router>
</AuthProvider>
);
}

export default App;
