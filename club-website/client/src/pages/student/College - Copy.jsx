const College = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Our College</h1>

      <div className="card">
        <h2>College Information</h2>
        <p>
          Gayatri Vidya Parishad College of Engineering (Autonomous) is a premier 
          institution committed to excellence in engineering education, research, 
          and innovation. The college is known for its strong academic culture, 
          experienced faculty, and student-centric approach to learning.
        </p>
      </div>

      <div className="card">
        <h2>Campus Facilities</h2>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Well-equipped laboratories and research centers</li>
          <li>Central library with digital learning resources</li>
          <li>Smart classrooms with modern teaching tools</li>
          <li>Innovation, incubation, and entrepreneurship support</li>
          <li>Sports facilities and gymnasium</li>
          <li>Student activity and cultural centers</li>
        </ul>
      </div>

      <div className="card">
        <h2>Location</h2>
        <p>
          The college campus is located in Madhurawada, Visakhapatnam, providing a 
          peaceful and academically rich environment for students.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Address:</strong>  
          Gayatri Vidya Parishad College of Engineering (Autonomous),  
          Madhurawada, Visakhapatnam, Andhra Pradesh – 530048
        </p>
      </div>
    </div>
  );
};

export default College;
