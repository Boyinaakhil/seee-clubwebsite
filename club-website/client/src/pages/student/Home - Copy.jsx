import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SEEE Club</h1>
          <p>Department of Electrical & Electronics Engineering</p>
          <p>Where Innovation Meets Excellence</p>
          <Link to="/about">
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Discover More
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-container">
        {/* About Card */}
        <div className="card">
          <h2>About Our Club</h2>
          <p>
            SEEE Club was established in 1997 with the vision of nurturing
            well-rounded students beyond academics. The club actively encourages
            participation in co-curricular and extracurricular activities.
            <br /><br />
            Through technical events, sports, cultural programs, workshops, and
            seminars, the club promotes leadership, teamwork, creativity, and
            innovation, contributing to the overall development of students.
          </p>
        </div>

        {/* Action Cards */}
        <div className="card-grid">

          {/* Upcoming Events */}
          <div className="card">
            <h3 className="card-title">Upcoming Events</h3>
            <p>
              Discover upcoming technical, cultural, and sports events organized
              by the SEEE Club to enhance learning and engagement.
            </p>
            <Link to="/events">
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                View Events
              </button>
            </Link>
          </div>

          {/* Latest Announcements */}
          <div className="card">
            <h3 className="card-title">Latest Announcements</h3>
            <p>
              Stay informed with the latest news, notices, and important updates
              from the SEEE Club.
            </p><br />
            <Link to="/updates">
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                View Updates
              </button>
            </Link>
          </div>

          {/* Get Involved */}
          <div className="card">
            <h3 className="card-title">Get Involved</h3>
            <p>
              Become a part of the SEEE Club and participate in exciting academic,
              technical, and co-curricular activities.
            </p>
            <Link to="/contact">
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Contact Us
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
