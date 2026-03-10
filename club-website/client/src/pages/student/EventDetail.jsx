import { Link } from "react-router-dom";

const staticEvents = [
  {
    _id: "1",
    title: "Club Installation Ceremony",
    date: "2025-08-21",
    imageUrl: "/events/event1.jpeg",
    category: "Social",
  },
  {
    _id: "2",
    title: "Chart Competition",
    date: "2025-08-21",
    imageUrl: "/events/event2.jpeg",
    category: "Social",
  },
  {
    _id: "3",
    title: "Teacher's Day & Engineer's Day",
    date: "2025-09-16",
    imageUrl: "/events/event3.jpeg",
    category: "Social",
  },
  {
    _id: "4",
    title: "Freshers Day",
    date: "2025-11-13",
    imageUrl: "/events/event4.jpeg",
    category: "Social",
  },
  {
    _id: "5",
    title: "Power Tech Fusion Expo",
    date: "2025-05-15",
    imageUrl: "/events/event5.jpeg",
    category: "Technical",
  },
  {
    _id: "6",
    title: "Retrofitting Workshop",
    date: "2026-01-23",
    imageUrl: "/events/event6.jpeg",
    category: "Workshop",
  },
];

const Events = () => {
  return (
    <div className="page-container">

      {/* Page Title */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 className="page-title">Events</h1>

        <button className="btn btn-success">
          + Add Event (Admin)
        </button>
      </div>

      {/* Events Grid */}
      {staticEvents.length === 0 ? (
        <div className="card">
          <p>No events scheduled yet. Check back soon!</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {staticEvents.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {/* Event Image */}
                <div
                  style={{
                    height: "160px",
                    backgroundImage: `url(${event.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Event Info */}
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ marginBottom: "0.5rem" }}>
                    {event.title}
                  </h3>

                  <p style={{ fontSize: "0.9rem", color: "#666" }}>
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <div
                    style={{
                      marginTop: "0.6rem",
                      display: "inline-block",
                      padding: "0.25rem 0.7rem",
                      background: "#6a11cb",
                      color: "#fff",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    {event.category}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;