import React from 'react';
import {
  FaLightbulb,
  FaDatabase,
  FaMobileAlt,
  FaLayerGroup,
  FaPaintBrush,
  FaLaptopCode,
} from 'react-icons/fa';
import './Services.css'; // Link to CSS below

const services = [
  {
    title: 'Innovative Ideas',
    description: 'Creative and practical solutions tailored to client needs.',
    icon: <FaLightbulb />,
    color: '#ff6f61',
  },
  {
    title: 'Database Systems',
    description: 'Efficient and secure data management services.',
    icon: <FaDatabase />,
    color: '#6c5ce7',
  },
  {
    title: 'Mobile Applications',
    description: 'Cross-platform, responsive mobile apps built with React Native.',
    icon: <FaMobileAlt />,
    color: '#00b894',
  },
  {
    title: 'UI/UX Design',
    description: 'Modern, user-friendly interface and experience design.',
    icon: <FaPaintBrush />,
    color: '#fdcb6e',
  },
  {
    title: 'Software Development',
    description: 'Custom software built with clean and scalable code.',
    icon: <FaLaptopCode />,
    color: '#0984e3',
  },
  {
    title: 'Component Architecture',
    description: 'Well-structured React apps using reusable components.',
    icon: <FaLayerGroup />,
    color: '#e84393',
  },
];

function Services() {
  return (
    <section className="colorlib-services" id="services">
      <div className="colorlib-narrow-content">
        <div className="section-heading">
          <span className="heading-meta">What I do?</span>
          <h2 className="colorlib-heading">Here are some of my expertise</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-box" style={{ borderBottomColor: service.color }}>
              <div className="icon" style={{ color: service.color }}>
                {service.icon}
              </div>
              <div className="desc">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
