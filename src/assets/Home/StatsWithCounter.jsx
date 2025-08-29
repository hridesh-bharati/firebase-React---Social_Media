// StatsWithCounter.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import './StatsWithCounter.css';

const colors = [
  'linear-gradient(135deg, #5f72bd, #9b23ea)',
  'linear-gradient(135deg, #11998e, #38ef7d)',
  'linear-gradient(135deg, #f7971e, #ffd200)',
  'linear-gradient(135deg, #56ccf2, #2f80ed)',
  'linear-gradient(135deg, #ff6a00, #ee0979)',
  'linear-gradient(135deg, #8e2de2, #4a00e0)' // New 6th color (purple gradient example)
];

const stats = [
  { end: 120, label: 'Projects' },
  { end: 239, label: 'Clients' },
  { end: 148, label: 'Deliveries' },
  { end: 239, label: 'Happy Clients' },
  { end: 55, label: 'GitHub Repositories' },
  { end: 75, label: 'Satisfied Customers' }  // New 6th stat
];



const StatsWithCounter = () => {


  return (
    <Container className="py-5">
      <Row className="text-center g-4">
        {stats.map((stat, index) => (
          <Col xs={12} md={4} lg={4} key={index}>
            <Card
              className="glass-card p-4 h-100 d-flex flex-column justify-content-center"
              style={{ background: colors[index % colors.length] }}
            >
              <Card.Body>
                <h2 className="fw-bold display-5 text-white">
                  {stat.label === 'Web Developer' ? (
                    <>1+</>
                  ) : (
                    <CountUp
                      end={stat.end}
                      duration={2}
                      redraw={true}
                      enableScrollSpy={true}
                    />
                  )}
                </h2>
                <p className="fs-5 text-white">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>

        ))}
      </Row>
    </Container>
  );
};

export default StatsWithCounter;
