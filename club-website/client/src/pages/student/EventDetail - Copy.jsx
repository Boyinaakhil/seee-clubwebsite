import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching event:', err);
      setError('Event not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  // Function to get complete image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80';
    }
    
    // If it's a local upload (starts with /uploads/)
    if (imageUrl.startsWith('/uploads/')) {
      // For local development, prepend server URL
      if (import.meta.env.MODE === 'development') {
        return `http://localhost:5000${imageUrl}`;
      }
      // For production, use relative path
      return imageUrl;
    }
    
    // If it's already a full URL
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>Loading event details...</h2>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>Event Not Found</h2>
          <p>{error || 'The event you are looking for does not exist.'}</p>
          <button 
            onClick={() => navigate('/events')}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(event.imageUrl);

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => navigate('/events')}
          className="btn"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          ← Back to Events
        </button>
      </div>

      {/* Event Hero Section */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          width: '100%',
          aspectRatio: '16 / 9',
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.5),
            rgba(0,0,0,0.5)
          ), url('${imageUrl}')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '2rem'
        }}>

          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{event.title}</h1>
            <div style={{
              backgroundColor: 'rgba(106, 17, 203, 0.8)',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '25px',
              display: 'inline-block',
              fontWeight: 'bold'
            }}>
              {event.category.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {/* Event Details */}
        <div className="card">
          <h3 className="card-title">📅 Event Details</h3>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>📅</span>
              <div>
                <strong>Date:</strong>
                <p>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>🕒</span>
              <div>
                <strong>Time:</strong>
                <p>{event.time}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>📍</span>
              <div>
                <strong>Venue:</strong>
                <p>{event.venue}</p>
              </div>
            </div>

            {event.registrationLink && (
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <a 
                  href={event.registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Register Now
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Event Description */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 className="card-title">📝 About the Event</h3>
          <div style={{ marginTop: '1rem' }}>
            <h4>Brief Description</h4>
            <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>{event.description}</p>
            
            <h4>Detailed Information</h4>
            <div style={{ 
              lineHeight: '1.6', 
              whiteSpace: 'pre-wrap',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '5px',
              marginTop: '1rem'
            }}>
              {event.detailedDescription || event.description}
            </div>
          </div>
        </div>
      </div>

      {/* Debug info (remove in production) */}
      {import.meta.env.MODE === 'development' && (
        <div className="card" style={{ marginTop: '2rem', backgroundColor: '#f8f9fa' }}>
          <h3 className="card-title">🔧 Debug Info</h3>
          <p>Image URL: {event.imageUrl}</p>
          <p>Resolved URL: {imageUrl}</p>
          <p>Event ID: {event._id}</p>
          <button 
            onClick={() => console.log('Event data:', event)}
            className="btn"
          >
            Log Event Data
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetail;