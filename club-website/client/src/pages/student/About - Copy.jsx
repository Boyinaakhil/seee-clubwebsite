const About = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">About Us</h1>

      <div className="card">
        <h2>Our Mission</h2>
        <p>
          Established in 1997, the SEEE Club was founded with the mission of
          promoting holistic student development alongside academic excellence.
          The club aims to create an engaging environment where students can
          enhance their technical knowledge, leadership skills, and overall
          personality.
        </p>
      </div>

      <div className="card">
        <h2>What We Do</h2>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Organize technical workshops and seminars</li>
          <li>Conduct guest lectures by industry professionals and academicians</li>
          <li>Encourage participation in sports and cultural activities</li>
          <li>Support student innovation, projects, and competitions</li>
          <li>Promote teamwork, leadership, and communication skills</li>
        </ul>
      </div>

      <div className="card">
        <h2>Club History</h2>
        <p>
          Since its inception in 1997, the SEEE Club has grown into an active and
          inclusive student community within the Department of Electrical and
          Electronics Engineering. Over the years, the club has successfully
          organized numerous academic, technical, cultural, and sports events,
          contributing significantly to the overall development of students.
        </p>
      </div>
    </div>
  );
};

export default About;
