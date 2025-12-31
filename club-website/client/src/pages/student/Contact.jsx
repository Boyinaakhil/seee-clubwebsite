import emailjs from "emailjs-com";

const Contact = () => {

  const handleSubmit = (e) => {
  e.preventDefault();

  // 1️⃣ Send email to USER
  emailjs.sendForm(
    "service_qdbmuml",
    "template_zmy7gvp",        // USER TEMPLATE
    e.target,
    "VGMEvDIp53a8znBxa"
  )

  // 2️⃣ Send email to ADMIN (SEEE)
  .then(() => {
    return emailjs.sendForm(
      "service_qdbmuml",
      "template_0vuj2id",     // ADMIN TEMPLATE
      e.target,
      "VGMEvDIp53a8znBxa"
    );
  })

  .then(() => {
    alert("Message sent successfully!");
    e.target.reset();
  })

  .catch((error) => {
    console.error(error);
    alert("Failed to send message.");
  });
};


  return (
    <div className="page-container">
      <h1 className="page-title">Contact Us</h1>

      <div className="card-grid">

        {/* COLUMN 1: FORM */}
        <div className="card">
          <h3 className="card-title">Get in Touch</h3>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"              // 🔹 must match {{name}}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="to_email"          // 🔹 must match {{to_email}}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"           // 🔹 must match {{message}}
                className="form-input"
                rows="4"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>

          </form>
        </div>

        {/* COLUMN 2: CONTACT INFO */}
        <div className="card">
          <h3 className="card-title">Contact Information</h3>

          <div style={{ marginTop: '1rem' }}>
            <p><strong>📍 Address:</strong></p>
            <p>
              SEEE Club<br />
              Gayatri Vidya Parishad College Of Engineering(Autonomous)<br />
              Gandhi Nagar, Madhurawada<br />
              Visakhapatnam
            </p>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <p><strong>📧 Email:</strong></p>
            <p>seee@gvpce.ac.in</p>
          </div> 

          {/* <div style={{ marginTop: '1.5rem' }}>
            <p><strong>📱 Phone:</strong></p>
            <p>(123) 456-7890</p>
          </div> */}

          <div style={{ marginTop: '1.5rem' }}>
            <p><strong>🕒 Office Hours:</strong></p>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
          </div>
        </div>

        {/* COLUMN 3: SOCIAL MEDIA */}
        <div className="card">
          <h3 className="card-title">Follow Us</h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              marginTop: '2rem',
              textAlign: 'center'
            }}
          >
            <a
              href="https://www.instagram.com/seee_club_gvpce?utm_source=qr&igsh=aHk1M2tjemE1MHNw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/social/instagram.jpg"
                alt="Instagram"
                style={{ width: '60px', cursor: 'pointer' }}
              />
            </a>

            <a
              href="https://whatsapp.com/channel/0029Vb7Z3jQEVccSTen1vA2K"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/social/wplogo.png"
                alt="Facebook"
                style={{ width: '60px', cursor: 'pointer' }}
              />
            </a>

            <a
              href="https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=seee-gvpce-a-09a395393"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/social/linkedin.png"
                alt="LinkedIn"
                style={{ width: '60px', cursor: 'pointer' }}
              />
            </a>

            <a href="mailto:seee@gvpce.ac.in">
              <img
                src="/social/email.jpg"
                alt="Email"
                style={{ width: '60px', cursor: 'pointer' }}
              />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
