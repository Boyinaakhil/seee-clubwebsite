import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import e1 from '../../assets/Events/event1.jpeg';
import e2 from '../../assets/Events/event2.jpeg';
import e3 from '../../assets/Events/event3.jpeg';
import e4 from '../../assets/Events/event4.jpeg';
import e5 from '../../assets/Events/event5.jpeg';
import e6 from '../../assets/Events/event6.jpeg';

import g1a from '../../assets/Events/gallery/g1a.jpeg';
import g1b from '../../assets/Events/gallery/g1b.jpeg';
import g2a from '../../assets/Events/gallery/g2a.jpeg';
import g2b from '../../assets/Events/gallery/g2b.jpeg';
import g3a from '../../assets/Events/gallery/g3a.jpeg';
import g3b from '../../assets/Events/gallery/g3b.jpeg';
import g3c from '../../assets/Events/gallery/g3c.jpeg';
import g4a from '../../assets/Events/gallery/g4a.jpeg';
import g5a from '../../assets/Events/gallery/g5a.jpeg';
import g5b from '../../assets/Events/gallery/g5b.jpeg';
import g6a from '../../assets/Events/gallery/g6a.jpeg';
import g6b from '../../assets/Events/gallery/g6b.jpeg';

const staticEvents = [
  {
    _id: '1',
    title: 'Club Installation Ceremony',
    date: '2025-08-21',
    time: '2:00 PM',
    venue: 'Civil Seminar Hall',
    category: 'Social',
    Organized_by: 'SEEE Members',
    description: "Installation Day was celebrated with great joy, excitement, and active participation from students. The event began with an introduction highlighting the importance of the EEE Department and the EEE Club.",
    detailedDescription: "Installation Day was celebrated with great joy, excitement, and active participation from students. The event began with an introduction highlighting the importance of the EEE Department and the EEE Club.\n\nCertificates and badges were presented to seniors, while badges were awarded to juniors by the professors. Fun activities such as movie riddles, electrical riddles, and mimicry added excitement to the event.\n\nJuniors were also rewarded with gifts for their participation in the Chart Competition. The event continued with an energetic dance performance and concluded on a joyful and inspiring note.",
    registrationLink: '',
    imageUrl: e1,
    gallery: [e1, g1a, g1b],
  },
  {
    _id: '2',
    title: 'Chart Competition on behalf of Club Installation Ceremony',
    date: '2025-08-21',
    time: '2:30 PM',
    venue: 'Civil Seminar Hall (B8-301)',
    category: 'Social',
    Organized_by: 'SEEE Members',
    description: "Installation Day was celebrated with active student participation. A Chart Competition was conducted where students showcased electrical engineering concepts.",
    detailedDescription: "Installation Day was celebrated with active student participation. The program began with an introduction to the EEE Department and EEE Club.\n\nCertificates and badges were presented to seniors, and badges were given to juniors by the professors. A Chart Competition was conducted where students showcased electrical engineering concepts.\n\nFun activities like movie riddles, electrical riddles, and mimicry added excitement. The event ended with a dance performance and concluded on a joyful note.",
    registrationLink: '',
    imageUrl: e2,
    gallery: [e2, g2a, g2b],
  },
  {
    _id: '3',
    title: "Teacher's Day & Engineer's Day Celebration",
    date: '2025-09-16',
    time: '2:00 PM',
    venue: 'Mini Auditorium (B10-203)',
    category: 'Social',
    Organized_by: 'SEEE Members',
    description: "Teacher's Day and Engineer's Day were celebrated to highlight the importance of teachers and engineers in shaping society.",
    detailedDescription: "Teacher's Day and Engineer's Day were celebrated to highlight the importance of teachers and engineers in shaping society. The program began with an introduction on the role of teachers and the history of Engineer's Day, including the contributions of Sir M. Visvesvaraya.\n\nVarious fun activities such as song riddles, singing, scientist riddles, and games were conducted to engage students. Winners of indoor and outdoor games were awarded prizes.\n\nTeachers were honored with gifts as a token of appreciation. The event concluded joyfully with a cake-cutting ceremony with the teachers.",
    registrationLink: '',
    imageUrl: e3,
    gallery: [e3, g3a, g3b, g3c],
  },
  {
    _id: '4',
    title: "Fresher's Day",
    date: '2025-11-13',
    time: '11:00 AM',
    venue: 'Main Auditorium',
    category: 'Social',
    Organized_by: 'SEEE Members',
    description: "Freshers' Day was organized to warmly welcome the new students and help them feel comfortable in the department.",
    detailedDescription: "Freshers' Day was organized to warmly welcome the new students and help them feel comfortable in the department. The event began with an introduction to the department and faculty members.\n\nSenior students shared their experiences and guidance with the freshers. Various fun activities, games, and cultural performances such as singing and dancing were conducted, creating a lively atmosphere.\n\nFaculty members motivated the freshers to focus on their studies and skill development. The event concluded on a joyful note, leaving the freshers with memorable experiences.",
    registrationLink: '',
    imageUrl: e4,
    gallery: [e4],
  },
  {
    _id: '5',
    title: 'Power Tech Fusion Expo',
    date: '2025-05-15',
    time: '9:00 AM',
    venue: 'Main Auditorium',
    category: 'Technical',
    Organized_by: 'SEEE Members',
    description: "Power Tech Fusion Expo was organized to showcase innovative ideas and technical knowledge in Electrical and Electronics Engineering.",
    detailedDescription: "Power Tech Fusion Expo was organized to showcase innovative ideas and technical knowledge in Electrical and Electronics Engineering. Students presented various technical projects, models, and ideas related to power systems and emerging technologies.\n\nThe event provided a platform for students to demonstrate their creativity and technical skills. Faculty members and visitors interacted with participants and appreciated their work.\n\nThe expo concluded successfully, inspiring students to explore innovation and real-world engineering applications.",
    registrationLink: '',
    imageUrl: e5,
    gallery: [e5, g5a, g5b],
  },
  {
    _id: '6',
    title: 'Retrofitting',
    date: '2026-01-23',
    time: '2:00 PM',
    venue: 'Beside B0-101',
    category: 'Workshop',
    Organized_by: 'SEEE Members & IEEE SB PES Members',
    description: "A Retrofitting workshop was organized in collaboration with Naturays EV to create awareness about electric vehicles and sustainable mobility.",
    detailedDescription: "A Retrofitting workshop was organized in collaboration with Naturays EV to create awareness about electric vehicles and sustainable mobility. The session introduced the concept of converting petrol vehicles into electric vehicles.\n\nMr. Siva Jagarapu, Managing Director of Naturays EV, explained the importance of eco-friendly transportation. Students learned about EV components, working principles, and observed a live demonstration of EV conversion.\n\nThe workshop provided valuable insights into future trends in electric mobility and sustainable engineering solutions.",
    registrationLink: '',
    imageUrl: e6,
    gallery: [e6, g6a, g6b],
  },
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxImg, setLightboxImg] = useState(null);

  const event = staticEvents.find((e) => e._id === id);

  const openLightbox = (img) => setLightboxImg(img);
  const closeLightbox = () => setLightboxImg(null);

  if (!event) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>Event Not Found</h2>
          <p>The event you are looking for does not exist.</p>
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

  return (
    <div className="page-container" style={{ padding: '1rem' }}>

      {/* BACK BUTTON */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => navigate('/events')}
          className="btn"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Back to Events
        </button>
      </div>

      {/* HERO — click to open lightbox */}
      <div
        className="card"
        style={{ padding: 0, overflow: 'hidden', cursor: 'zoom-in' }}
        onClick={() => openLightbox(event.imageUrl)}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '20 / 9',
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(' +
              event.imageUrl +
              ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '1rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '0.75rem',
              backgroundColor: 'rgba(0,0,0,0.55)',
              color: '#fff',
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
            }}
          >
            Click to enlarge
          </div>

          <div>
            <h1
              style={{
                fontSize: 'clamp(1.2rem, 4.5vw, 2.8rem)',
                marginBottom: '1rem',
                lineHeight: 1.2,
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              {event.title}
            </h1>
            <div
              style={{
                backgroundColor: 'rgba(106, 17, 203, 0.85)',
                color: 'white',
                padding: '0.4rem 1.2rem',
                borderRadius: '25px',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: 'clamp(0.7rem, 2.2vw, 0.95rem)',
              }}
            >
              {event.category.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY STRIP */}
      {event.gallery && event.gallery.length > 1 && (
        <div className="card" style={{ marginTop: '1.5rem', padding: '1.2rem' }}>
          <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>
            Event Gallery
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem' }}>
            Click any image to view full size
          </p>
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              scrollbarWidth: 'thin',
              scrollbarColor: '#6a11cb #f0f0f0',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {event.gallery.map((img, index) => (
              <div
                key={index}
                onClick={() => openLightbox(img)}
                style={{
                  flexShrink: 0,
                  width: 'clamp(150px, 36vw, 260px)',
                  height: 'clamp(100px, 22vw, 165px)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  cursor: 'zoom-in',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(106,17,203,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                }}
              >
                <img
                  src={img}
                  alt={event.title + ' photo ' + (index + 1)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.07)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILS GRID — single col on mobile, two col on desktop */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem',
        }}
      >
        {/* LEFT: Event Info */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Event Details</h3>

          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>📅</span>
            <div>
              <strong style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</strong>
              <p style={{ margin: '0.2rem 0 0', color: '#333', fontSize: '0.95rem' }}>
                {new Date(event.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>🕒</span>
            <div>
              <strong style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</strong>
              <p style={{ margin: '0.2rem 0 0', color: '#333', fontSize: '0.95rem' }}>{event.time}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>📍</span>
            <div>
              <strong style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Venue</strong>
              <p style={{ margin: '0.2rem 0 0', color: '#333', fontSize: '0.95rem' }}>{event.venue}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>👥</span>
            <div>
              <strong style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Organized By</strong>
              <p style={{ margin: '0.2rem 0 0', color: '#6a11cb', fontWeight: '600', fontSize: '0.95rem' }}>
                {event.Organized_by}
              </p>
            </div>
          </div>

          {event.registrationLink ? (
            <div style={{ marginTop: '1.5rem' }}>
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', display: 'block', textAlign: 'center', boxSizing: 'border-box' }}
              >
                Register Now
              </a>
            </div>
          ) : null}
        </div>

        {/* RIGHT: About */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>About the Event</h3>

          <h4 style={{ marginBottom: '0.4rem', fontSize: '0.9rem', color: '#555' }}>Brief Description</h4>
          <p style={{ lineHeight: '1.7', marginBottom: '1.5rem', color: '#444', fontSize: '0.92rem' }}>
            {event.description}
          </p>

          <h4 style={{ marginBottom: '0.4rem', fontSize: '0.9rem', color: '#555' }}>Detailed Information</h4>
          <div
            style={{
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              fontSize: '0.92rem',
              color: '#333',
            }}
          >
            {event.detailedDescription || event.description}
          </div>
        </div>

      </div>

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.93)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            cursor: 'zoom-out',
          }}
        >
          <button
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              top: '1rem',
              right: '1.25rem',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              cursor: 'pointer',
              lineHeight: 1,
              zIndex: 10000,
            }}
          >
            &times;
          </button>

          <img
            src={lightboxImg}
            alt="Full view"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 0 50px rgba(0,0,0,0.7)',
              cursor: 'default',
            }}
          />
        </div>
      )}

    </div>
  );
};

export default EventDetail;

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import api from '../../services/api';

// const EventDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchEvent();
//   }, [id]);

//   const fetchEvent = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/events/${id}`);
//       setEvent(response.data);
//       setError('');
//     } catch (err) {
//       console.error('Error fetching event:', err);
//       setError('Event not found or failed to load.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to get complete image URL
//   const getImageUrl = (imageUrl) => {
//     if (!imageUrl) {
//       return 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80';
//     }
    
//     // If it's a local upload (starts with /uploads/)
//     if (imageUrl.startsWith('/uploads/')) {
//       // For local development, prepend server URL
//       if (import.meta.env.MODE === 'development') {
//         return `http://localhost:5000${imageUrl}`;
//       }
//       // For production, use relative path
//       return imageUrl;
//     }
    
//     // If it's already a full URL
//     return imageUrl;
//   };

//   if (loading) {
//     return (
//       <div className="page-container">
//         <div className="card" style={{ textAlign: 'center' }}>
//           <h2>Loading event details...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (error || !event) {
//     return (
//       <div className="page-container">
//         <div className="card" style={{ textAlign: 'center' }}>
//           <h2>Event Not Found</h2>
//           <p>{error || 'The event you are looking for does not exist.'}</p>
//           <button 
//             onClick={() => navigate('/events')}
//             className="btn btn-primary"
//             style={{ marginTop: '1rem' }}
//           >
//             Back to Events
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const imageUrl = getImageUrl(event.imageUrl);

//   return (
//     <div className="page-container">
//       <div style={{ marginBottom: '1rem' }}>
//         <button 
//           onClick={() => navigate('/events')}
//           className="btn"
//           style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
//         >
//           ← Back to Events
//         </button>
//       </div>

//       {/* Event Hero Section */}
//       <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
//         <div style={{
//           width: '100%',
//           aspectRatio: '16 / 9',
//           backgroundImage: `linear-gradient(
//             rgba(0,0,0,0.5),
//             rgba(0,0,0,0.5)
//           ), url('${imageUrl}')`,
//           backgroundSize: 'contain',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: 'white',
//           textAlign: 'center',
//           padding: '2rem'
//         }}>

//           <div>
//             <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{event.title}</h1>
//             <div style={{
//               backgroundColor: 'rgba(106, 17, 203, 0.8)',
//               color: 'white',
//               padding: '0.5rem 1.5rem',
//               borderRadius: '25px',
//               display: 'inline-block',
//               fontWeight: 'bold'
//             }}>
//               {event.category.toUpperCase()}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card-grid" style={{ marginTop: '2rem' }}>
//         {/* Event Details */}
//         <div className="card">
//           <h3 className="card-title">📅 Event Details</h3>
//           <div style={{ marginTop: '1rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//               <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>📅</span>
//               <div>
//                 <strong>Date:</strong>
//                 <p>{new Date(event.date).toLocaleDateString('en-US', { 
//                   weekday: 'long', 
//                   year: 'numeric', 
//                   month: 'long', 
//                   day: 'numeric' 
//                 })}</p>
//               </div>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//               <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>🕒</span>
//               <div>
//                 <strong>Time:</strong>
//                 <p>{event.time}</p>
//               </div>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//               <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>📍</span>
//               <div>
//                 <strong>Venue:</strong>
//                 <p>{event.venue}</p>
//               </div>
//             </div>

//             {event.registrationLink && (
//               <div style={{ marginTop: '2rem', textAlign: 'center' }}>
//                 <a 
//                   href={event.registrationLink} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="btn btn-primary"
//                   style={{ width: '100%' }}
//                 >
//                   Register Now
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Event Description */}
//         <div className="card" style={{ gridColumn: 'span 2' }}>
//           <h3 className="card-title">📝 About the Event</h3>
//           <div style={{ marginTop: '1rem' }}>
//             <h4>Brief Description</h4>
//             <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>{event.description}</p>
            
//             <h4>Detailed Information</h4>
//             <div style={{ 
//               lineHeight: '1.6', 
//               whiteSpace: 'pre-wrap',
//               padding: '1rem',
//               backgroundColor: '#f8f9fa',
//               borderRadius: '5px',
//               marginTop: '1rem'
//             }}>
//               {event.detailedDescription || event.description}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Debug info (remove in production) */}
//       {import.meta.env.MODE === 'development' && (
//         <div className="card" style={{ marginTop: '2rem', backgroundColor: '#f8f9fa' }}>
//           <h3 className="card-title">🔧 Debug Info</h3>
//           <p>Image URL: {event.imageUrl}</p>
//           <p>Resolved URL: {imageUrl}</p>
//           <p>Event ID: {event._id}</p>
//           <button 
//             onClick={() => console.log('Event data:', event)}
//             className="btn"
//           >
//             Log Event Data
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventDetail;
