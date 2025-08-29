export default function SkillsSection() {
  const skills = [
    { name: "Photoshop", percent: 75, color: "#FF5733" },  // bright orange-red
    { name: "jQuery", percent: 60, color: "#3498DB" },     // blue
    { name: "HTML5", percent: 85, color: "#E44D26" },      // orange-red (HTML5 logo color)
    { name: "CSS3", percent: 90, color: "#264DE4" },       // blue (CSS3 logo color)
    { name: "WordPress", percent: 70, color: "#21759B" },  // WordPress blue
    { name: "SEO", percent: 80, color: "#28A745" },        // green (success)
  ];

  return (
    <section className="container my-5">
      <h2 className="text-center text-warning fw-bold mb-4">My Specialty & My Skills</h2>
      <p className="text-muted fs-5 text-center mb-5 mx-auto" style={{ maxWidth: 600, lineHeight: 1.6 }}>
        The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.
      </p>

      <div className="row justify-content-center">
        {skills.map(({ name, percent, color }, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">{name}</span>
              <span className="fw-semibold">{percent}%</span>
            </div>
            <div className="progress" style={{ height: "12px", borderRadius: "10px", backgroundColor: "#e9ecef" }}>
              <div 
                className="progress-bar" 
                role="progressbar" 
                style={{ 
                  width: `${percent}%`, 
                  backgroundColor: color,
                  transition: 'width 1.2s ease-in-out',
                  boxShadow: `0 2px 5px ${color}aa`
                }} 
                aria-valuenow={percent} 
                aria-valuemin="0" 
                aria-valuemax="100"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
