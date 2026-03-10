import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import e1 from '../../assets/Events/event1.jpeg';
import e2 from '../../assets/Events/event2.jpeg';
import e3 from '../../assets/Events/event3.jpeg';
import e4 from '../../assets/Events/event4.jpeg';
import e5 from '../../assets/Events/event5.jpeg';
import e6 from '../../assets/Events/event6.jpeg';

const staticEvents = [
  {
    _id: '1',
    title: 'Club Installation Ceremony',
    date: '2025-08-21',
    time: '2:00 PM',
    venue: 'Civil Seminar Hall',
    category: 'Social',
    description: "Installation Day was celebrated with great joy, excitement, and active participation from students. The event began with an introduction highlighting the importance of the EEE Department and the EEE Club. Certificates and badges were presented to seniors, while badges were awarded to juniors by the professors. Fun activities such as movie riddles, electrical riddles, and mimicry added excitement to the event. Juniors were also rewarded with gifts for their participation in the Chart Competition. The event continued with an energetic dance performance and concluded on a joyful and inspiring note.",
    imageUrl: e1,
    Organized_by: 'SEEE Members',
  },
  {
    _id: '2',
    title: 'Chart Competition on behalf of Club Installation Ceremony',
    date: '2025-08-21',
    time: '2:30 PM',
    venue: 'Civil Seminar Hall (B8-301)',
    category: 'Social',
    description: "Installation Day was celebrated with active student participation. The program began with an introduction to the EEE Department and EEE Club. Certificates and badges were presented to seniors, and badges were given to juniors by the professors. A Chart Competition was conducted where students showcased electrical engineering concepts. Fun activities like movie riddles, electrical riddles, and mimicry added excitement. The event ended with a dance performance and concluded on a joyful note.",
    imageUrl: e2,
    Organized_by: 'SEEE Members',
  },
  {
    _id: '3',
    title: "Teacher's Day & Engineer's Day Celebration",
    date: '2025-09-16',
    time: '2:00 PM',
    venue: 'Mini Auditorium (B10-203)',
    category: 'Social',
    description: "Teacher's Day and Engineer's Day were celebrated to highlight the importance of teachers and engineers in shaping society. Various fun activities such as song riddles, singing, scientist riddles, and games were conducted to engage students. Winners of indoor and outdoor games were awarded prizes. Teachers were honored with gifts as a token of appreciation. The event concluded joyfully with a cake-cutting ceremony.",
    imageUrl: e3,
    Organized_by: 'SEEE Members',
  },
  {
    _id: '4',
    title: "Fresher's Day",
    date: '2025-11-13',
    time: '11:00 AM',
    venue: 'Main Auditorium',
    category: 'Social',
    description: "Freshers' Day was organized to warmly welcome the new students and help them feel comfortable in the department. Senior students shared their experiences and guidance with the freshers. Various fun activities, games, and cultural performances such as singing and dancing were conducted, creating a lively atmosphere. The event concluded on a joyful note, leaving the freshers with memorable experiences.",
    imageUrl: e4,
    Organized_by: 'SEEE Members',
  },
  {
    _id: '5',
    title: 'Power Tech Fusion Expo',
    date: '2025-05-15',
    time: '9:00 AM',
    venue: 'Main Auditorium',
    category: 'Technical',
    description: "Power Tech Fusion Expo was organized to showcase innovative ideas and technical knowledge in Electrical and Electronics Engineering. Students presented various technical projects, models, and ideas related to power systems and emerging technologies. The expo concluded successfully, inspiring students to explore innovation and real-world engineering applications.",
    imageUrl: e5,
    Organized_by: 'SEEE Members',
  },
  {
    _id: '6',
    title: 'Retrofitting',
    date: '2026-01-23',
    time: '2:00 PM',
    venue: 'Beside B0-101',
    category: 'Workshop',
    description: "A Retrofitting workshop was organized in collaboration with Naturays EV to create awareness about electric vehicles and sustainable mobility. Mr. Siva Jagarapu, Managing Director of Naturays EV, explained the importance of eco-friendly transportation. Students learned about EV components, working principles, and observed a live demonstration of EV conversion.",
    imageUrl: e6,
    Organized_by: 'SEEE Members & IEEE SB PES Members',
  },
];

const Events = () => {
  const navigate = useNavigate();
  const [lightboxImg, setLightboxImg] = useState(null);

  const openLightbox = (e, img) => {
    e.stopPropagation();
    setLightboxImg(img);
  };

  const closeLightbox = () => setLightboxImg(null);

  return (
    <div className="page-container">

      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <h1 className="page-title">Events</h1>
        <button className="btn btn-success">+ Add Event (Admin)</button>
      </div>

      {/* EVENTS GRID */}
      <div className="card-grid">
        {staticEvents.map((event) => (
          <div
            key={event._id}
            className="card"
            style={{
              padding: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => navigate('/events/' + event._id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {/* IMAGE AREA — click opens lightbox */}
            <div
              style={{ position: 'relative' }}
              onClick={(e) => openLightbox(e, event.imageUrl)}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(' +
                    event.imageUrl +
                    ')',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                {/* ZOOM HINT */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.6rem',
                    left: '0.6rem',
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                  }}
                >
                  🔍 Click to enlarge
                </div>

                {/* CATEGORY BADGE */}
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
                    fontWeight: 'bold',
                  }}
                >
                  {event.category?.toUpperCase()}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div style={{ padding: '1.25rem' }}>
              <h3 className="card-title" style={{ marginBottom: '0.75rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                {event.title}
              </h3>

              {/* META */}
              <div style={{ marginBottom: '1rem', fontSize: '0.88rem', lineHeight: '1.9', color: '#444' }}>
                <div>📅 {new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                <div>🕒 {event.time}</div>
                <div>📍 {event.venue}</div>
                <div style={{ color: '#6a11cb', fontWeight: '500' }}>
                  👥 {event.Organized_by}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '1.2rem',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  color: '#555',
                }}
              >
                {event.description}
              </p>

              {/* VIEW DETAILS BUTTON */}
              <div onClick={(e) => e.stopPropagation()}>
                <Link to={'/events/' + event._id}>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX OVERLAY */}
      {lightboxImg && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.92)',
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
              boxShadow: '0 0 40px rgba(0,0,0,0.6)',
              cursor: 'default',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Events;
// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../../services/api';

// const  Events = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await api.get('/events');
//       setEvents(response.data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddEventClick = () => {
//     navigate('/admin/login');
//   };

//   /**
//    * ✅ IMAGE URL HANDLER (VITE + BACKEND SAFE)
//    */
//   const getImageUrl = (imageUrl) => {
//     // Fallback image (must exist in public/)
//     if (!imageUrl) {
//       return '/default-event.jpg';
//     }

//     // Backend uploads (/uploads/...)
//     if (imageUrl.startsWith('/uploads/')) {
//       return import.meta.env.VITE_API_BASE_URL
//         ? `${import.meta.env.VITE_API_BASE_URL}${imageUrl}`
//         : `http://localhost:5000${imageUrl}`;
//     }

//     // Public images (Vite serves public from root "/")
//     if (imageUrl.startsWith('/')) {
//       return imageUrl;
//     }

//     // External image URLs
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }

//     // Final fallback
//     return '/default-event.jpg';
//   };

//   if (loading) {
//     return (
//       <div className="page-container">
//         <h2>Loading events...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       {/* HEADER */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '1.5rem'
//         }}
//       >
//         <h1 className="page-title">Events</h1>
//         <button
//           onClick={handleAddEventClick}
//           className="btn btn-success"
//         >
//           + Add Event (Admin)
//         </button>
//       </div>

//       {/* EVENTS GRID */}
//       <div className="card-grid">
//         {events.length > 0 ? (
//           events.map((event) => {
//             const imageUrl = getImageUrl(event.imageUrl);

//             return (
//               <div
//                 key={event._id}
//                 className="card"
//                 style={{ padding: 0, overflow: 'hidden' }}
//               >
//                 {/* IMAGE */}
//                 <div
//                   style={{
//                     width: '100%',
//                     aspectRatio: '16 / 9',
//                     backgroundImage: `linear-gradient(
//                       rgba(0,0,0,0.3),
//                       rgba(0,0,0,0.3)
//                     ), url(${imageUrl})`,
//                     backgroundSize: 'contain',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundPosition: 'center',
//                     position: 'relative'
//                   }}
//                 >

//                   {/* CATEGORY */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: '1rem',
//                       right: '1rem',
//                       backgroundColor: '#6a11cb',
//                       color: '#fff',
//                       padding: '0.3rem 0.8rem',
//                       borderRadius: '20px',
//                       fontSize: '0.8rem',
//                       fontWeight: 'bold'
//                     }}
//                   >
//                     {event.category?.toUpperCase()}
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div style={{ padding: '1.5rem' }}>
//                   <h3 className="card-title">{event.title}</h3>

//                   {/* META */}
//                   <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
//                     <div>📅 {new Date(event.date).toLocaleDateString()}</div>
//                     <div>🕒 {event.time}</div>
//                     <div>📍 {event.venue}</div>
//                   </div>

//                   {/* DESCRIPTION */}
//                   <p
//                     style={{
//                       display: '-webkit-box',
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                       marginBottom: '1.2rem'
//                     }}
//                   >
//                     {event.description}
//                   </p>

//                   {/* ACTION */}
//                   <Link to={`/events/${event._id}`}>
//                     <button className="btn btn-primary" style={{ width: '100%' }}>
//                       View Details
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="card">
//             <p>No events scheduled yet. Check back soon!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Events;
