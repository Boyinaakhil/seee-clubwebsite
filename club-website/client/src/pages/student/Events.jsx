import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEventClick = () => {
    navigate('/admin/login');
  };

  /**
   * ✅ IMAGE URL HANDLER (VITE + BACKEND SAFE)
   */
  const getImageUrl = (imageUrl) => {
    // Fallback image (must exist in public/)
    if (!imageUrl) {
      return '/default-event.jpg';
    }

    // Backend uploads (/uploads/...)
    if (imageUrl.startsWith('/uploads/')) {
      return import.meta.env.VITE_API_BASE_URL
        ? `${import.meta.env.VITE_API_BASE_URL}${imageUrl}`
        : `http://localhost:5000${imageUrl}`;
    }

    // Public images (Vite serves public from root "/")
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }

    // External image URLs
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    // Final fallback
    return '/default-event.jpg';
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading events...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <h1 className="page-title">Events</h1>
        <button
          onClick={handleAddEventClick}
          className="btn btn-success"
        >
          + Add Event (Admin)
        </button>
      </div>

      {/* EVENTS GRID */}
      <div className="card-grid">
        {events.length > 0 ? (
          events.map((event) => {
            const imageUrl = getImageUrl(event.imageUrl);

            return (
              <div
                key={event._id}
                className="card"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                {/* IMAGE */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    backgroundImage: `linear-gradient(
                      rgba(0,0,0,0.3),
                      rgba(0,0,0,0.3)
                    ), url(${imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >

                  {/* CATEGORY */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: '#6a11cb',
                      color: '#fff',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {event.category?.toUpperCase()}
                  </div>
                </div>

                {/* CONTENT */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 className="card-title">{event.title}</h3>

                  {/* META */}
                  <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                    <div>📅 {new Date(event.date).toLocaleDateString()}</div>
                    <div>🕒 {event.time}</div>
                    <div>📍 {event.venue}</div>
                  </div>

                  {/* DESCRIPTION */}
                  <p
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '1.2rem'
                    }}
                  >
                    {event.description}
                  </p>

                  {/* ACTION */}
                  <Link to={`/events/${event._id}`}>
                    <button className="btn btn-primary" style={{ width: '100%' }}>
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card">
            <p>No events scheduled yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
