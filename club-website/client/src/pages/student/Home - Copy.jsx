import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../../components/common/HeroCarousel';

import hodImg from '../../assets/events/hod.jpeg';
import facultyImg from '../../assets/events/Coordinator.jpeg';

const faculty = [
  {
    name: 'Dr. G. V. E. Satish Kumar',
    role: 'Head of the Department',
    image: hodImg,
    bio: 'Dr. G. V. E. Satish Kumar is the Head of the Department of Electrical and Electronics Engineering (EEE). He provides strong academic leadership and guidance to both faculty and students. Under his supervision, the department focuses on quality education, research, and innovation in the field of electrical engineering. His support and vision contribute greatly to the growth and development of the department and student activities.',
  },
  {
    name: 'Mr. K. Ravi Kumar',
    role: 'Faculty Coordinator, SEEE Club',
    image: facultyImg,
    bio: 'Mr. K. Ravi Kumar serves as the Faculty Coordinator of the club. He actively supports and guides students in organizing technical events, workshops, and activities. With his continuous encouragement and mentorship, he helps students develop practical knowledge, leadership skills, and teamwork. His guidance plays an important role in the successful functioning of the club.',
  },
];

const TOTAL_SLIDES = 6;
const INTERVAL = 3000;

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % TOTAL_SLIDES);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          minHeight: 'clamp(300px, 52vw, 560px)',
        }}
      >
        {/* Carousel fills entire hero */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HeroCarousel />
        </div>

        {/* Simple dark overlay — uniform, no color tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            zIndex: 1,
          }}
        />

        {/* Centred content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: 'clamp(300px, 52vw, 560px)',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 8vw, 6rem)',
            color: '#fff',
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 5.5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 0.5rem',
              textShadow: '0 2px 16px rgba(0,0,0,0.6)',
              letterSpacing: '-0.01em',
              opacity: 0.8
            }}
          >
            Welcome to SEEE Club
          </h1>

          {/* Thin divider */}
          <div
            style={{
              width: 'clamp(40px, 8vw, 64px)',
              height: '3px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              opacity: 0.5,
              margin: '0.75rem 0',
            }}
          />

          {/* Tagline 1 */}
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.3vw, 1.15rem)',
              margin: '0.15rem 0',
              opacity: 0.82,
              textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              fontWeight: 500,
            }}
          >
            Department of Electrical &amp; Electronics Engineering
          </p>

          {/* Tagline 2 */}
          <p
            style={{
              fontSize: 'clamp(0.78rem, 1.8vw, 0.98rem)',
              margin: '0.15rem 0 1.8rem',
              opacity: 0.6,
              textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              fontStyle: 'italic',
            }}
          >
            Where Innovation Meets Excellence
          </p>

          {/* Two buttons */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link to="/about">
              <button
                className="btn btn-primary"
                style={{
                  fontSize: 'clamp(0.82rem, 1.8vw, 1rem)',
                  padding: 'clamp(0.5rem, 1.4vw, 0.72rem) clamp(1.2rem, 3vw, 2rem)',
                  borderRadius: '50px',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                Discover More
              </button>
            </Link>

            <Link to="/events">
              <button
                style={{
                  fontSize: 'clamp(0.82rem, 1.8vw, 1rem)',
                  padding: 'clamp(0.5rem, 1.4vw, 0.72rem) clamp(1.2rem, 3vw, 2rem)',
                  borderRadius: '50px',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: '2px solid rgba(255,255,255,0.7)',
                  color: '#fff',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)';
                  e.currentTarget.style.borderColor = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                }}
              >
                View Events
              </button>
            </Link>
          </div>

          {/* Slide dots */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              marginTop: '2rem',
              alignItems: 'center',
            }}
          >
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === slideIndex ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '50px',
                  backgroundColor: i === slideIndex ? '#fff' : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── PAGE CONTENT ──────────────────────────────────────────────── */}
      <div className="page-container">

        {/* ABOUT */}
        <div className="card">
          <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>About Our Club</h2>
          <p style={{ lineHeight: '1.75', fontSize: 'clamp(0.88rem, 2vw, 1rem)' }}>
            SEEE Club was established in 1997 with the vision of nurturing
            well-rounded students beyond academics. The club actively encourages
            participation in co-curricular and extracurricular activities.
            <br /><br />
            Through technical events, sports, cultural programs, workshops, and
            seminars, the club promotes leadership, teamwork, creativity, and
            innovation, contributing to the overall development of students.
          </p>
        </div>

        {/* LEADERSHIP */}
        <div style={{ marginTop: '2.5rem' }}>
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              fontSize: 'clamp(1.15rem, 3.5vw, 1.75rem)',
            }}
          >
            Our Leadership
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {faculty.map((person) => (
              <div
                key={person.name}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 'clamp(1.2rem, 3vw, 2rem) clamp(1rem, 2.5vw, 1.5rem)',
                  gap: '0.85rem',
                }}
              >
                <div
                  style={{
                    width: 'clamp(88px, 18vw, 128px)',
                    height: 'clamp(88px, 18vw, 128px)',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid #6a11cb',
                    flexShrink: 0,
                    boxShadow: '0 4px 16px rgba(106,17,203,0.22)',
                  }}
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <h3 style={{ margin: 0, fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)', color: '#1a1a1a' }}>
                    {person.name}
                  </h3>
                  <p
                    style={{
                      margin: '0.3rem 0 0',
                      color: '#6a11cb',
                      fontWeight: 600,
                      fontSize: 'clamp(0.72rem, 1.6vw, 0.82rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {person.role}
                  </p>
                </div>

                <div
                  style={{
                    width: '42px',
                    height: '3px',
                    backgroundColor: '#6a11cb',
                    borderRadius: '4px',
                    opacity: 0.4,
                  }}
                />

                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(0.82rem, 1.8vw, 0.9rem)',
                    lineHeight: '1.78',
                    color: '#555',
                    textAlign: 'left',
                  }}
                >
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="card-grid" style={{ marginTop: '2rem' }}>
          <div className="card">
            <h3 className="card-title">Upcoming Events</h3>
            <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)' }}>
              Discover upcoming technical, cultural, and sports events organized
              by the SEEE Club to enhance learning and engagement.
            </p>
            <Link to="/events">
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                View Events
              </button>
            </Link>
          </div>

          <div className="card">
            <h3 className="card-title">Latest Announcements</h3>
            <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)' }}>
              Stay informed with the latest news, notices, and important updates
              from the SEEE Club.
            </p>
            <Link to="/updates">
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                View Updates
              </button>
            </Link>
          </div>

          <div className="card">
            <h3 className="card-title">Get Involved</h3>
            <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)' }}>
              Become a part of the SEEE Club and participate in exciting academic,
              technical, and co-curricular activities.
            </p>
            <Link to="/contact">
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
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
