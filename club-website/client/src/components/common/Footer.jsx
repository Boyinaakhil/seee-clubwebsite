import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <p>
          © {new Date().getFullYear()} SEEE Club, Department of Electrical & Electronics Engineering.
          All rights reserved.
        </p>

        <p style={{ marginTop: '0.5rem' }}>
          Established in 1997 • Empowering Students Beyond Academics
        </p>

        <p style={{ marginTop: '0.75rem' }}>
          <Link
            to="/admin/login"
            style={{ color: '#3498db', textDecoration: 'none' }}
          >
            Admin Portal
          </Link>
        </p>

        <p style={{ marginTop: '1rem', color: '#bdc3c7' }}>
          Designed & Developed for Academic and Student Engagement Purposes
        </p>

        {/* ✅ Developer Credit */}
        <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#95a5a6' }}>
          Website developed by <strong>LSSSV PRASAD MEETAKOTI &amp; CO.</strong>
        </p>

      </div>
    </footer>
  );
};

export default Footer;
