import React, { useEffect, useState } from "react";

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [animatedPercents, setAnimatedPercents] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the skills data from the GitHub JSON file
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/hridesh-bharati/hb-database-record/main/MySpecialty%26MySkills.json");
        if (!response.ok) {
          throw new Error("Failed to fetch skills data");
        }

        const data = await response.json();
        setSkills(data);

        // Initialize the progress animation with 0% and then update
        setAnimatedPercents(data.map(() => 0));

        // Animate the progress bars after a short delay
        setTimeout(() => {
          setAnimatedPercents(data.map((skill) => skill.percent));
        }, 100); // small delay before animating
      } catch (error) {
        setError(error.message);
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (skills.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container-fluid my-5 p-4">
      <h2 className="text-center text-warning fw-bold mb-4" style={{ letterSpacing: 1 }}>
        My Specialty & My Skills
      </h2>
      <p className="text-muted fs-5 text-center mb-5 mx-auto" style={{ maxWidth: 600, lineHeight: 1.7, fontStyle: "italic" }}>
        The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.
      </p>

      <div className="row justify-content-center">
        {skills.map(({ name, percent, color }, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold fs-5">{name}</span>
              <span className="fw-bold fs-5" style={{ color }}>
                {animatedPercents[idx]}%
              </span>
            </div>
            <div
              className="progress"
              style={{
                height: "14px",
                borderRadius: "12px",
                backgroundColor: "#f1f3f5",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={animatedPercents[idx]}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${animatedPercents[idx]}%`,
                  background: `linear-gradient(45deg, ${color}cc, ${color})`,
                  boxShadow: `0 2px 6px ${color}88`,
                  height: "14px",
                  borderRadius: "12px",
                  transition: "width 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
