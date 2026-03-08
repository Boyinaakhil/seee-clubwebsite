import Home from './pages/student/Home';
import About from './pages/student/About';
import Events from './pages/student/Events';
import EventDetail from './pages/student/EventDetail'; // Add this
import Updates from './pages/student/Updates';
import College from './pages/student/College';
import Board from './pages/student/Board';
import Contact from './pages/student/Contact';
import Dashboard from './pages/admin/Dashboard';
import ManageEvents from './pages/admin/ManageEvents';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';
import ManageBoard from './pages/admin/ManageBoard';

const routes = {
  public: {
    home: <Home />,
    about: <About />,
    events: <Events />,
    eventDetail: <EventDetail />, // Add this
    updates: <Updates />,
    college: <College />,
    board: <Board />,
    contact: <Contact />
  },
  admin: {
    dashboard: <Dashboard />,
    events: <ManageEvents />,
    announcements: <ManageAnnouncements />,
    board: <ManageBoard />
  }
};

export default routes;