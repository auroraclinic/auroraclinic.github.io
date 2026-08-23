import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeartPulse, FaUserDoctor, FaHospital, FaShieldHalved } from 'react-icons/fa6';

export const About: React.FC = () => {
  return (
    <div className="py-5">
      <Container>
        <div className="mb-5 text-center">
          <h1 className="fw-bold text-dark mb-2">About Aurora Medical Center</h1>
          <p className="text-muted">
            Dedicated primary care and pediatrics in El Monte, California.
          </p>
        </div>

        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card className="clean-card h-100 p-4">
              <Card.Body>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <FaHeartPulse size={24} className="text-primary" />
                  <h4 className="fw-bold text-dark mb-0">Our Mission</h4>
                </div>
                <p className="text-muted mb-0">
                  Our mission is to deliver evidence-based, compassionate primary care that empowers patients to live healthier lives. We focus on wellness promotion, disease prevention, and active chronic condition management.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="clean-card h-100 p-4">
              <Card.Body>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <FaShieldHalved size={24} className="text-success" />
                  <h4 className="fw-bold text-dark mb-0">Our Care Philosophy</h4>
                </div>
                <p className="text-muted mb-0">
                  We believe high-quality medical care requires trust, continuous communication, and cultural competence. Serving a diverse community, our staff provides supportive guidance across multiple languages including English, Spanish, Mandarin, Cantonese, and Vietnamese.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 text-center">
          <Col md={4}>
            <Card className="clean-card p-4">
              <Card.Body>
                <FaUserDoctor size={32} className="text-primary mb-3" />
                <h5 className="fw-bold text-dark mb-2">Experienced Team</h5>
                <p className="text-muted small mb-0">
                  Board-certified physicians and nurse practitioners providing comprehensive family medical care.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="clean-card p-4">
              <Card.Body>
                <FaHospital size={32} className="text-success mb-3" />
                <h5 className="fw-bold text-dark mb-2">Modern Clinic</h5>
                <p className="text-muted small mb-0">
                  Equipped with modern diagnostic tools, comfortable examination rooms, and convenient parking.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="clean-card p-4">
              <Card.Body>
                <FaHeartPulse size={32} className="text-danger mb-3" />
                <h5 className="fw-bold text-dark mb-2">Community Focused</h5>
                <p className="text-muted small mb-0">
                  Proudly serving generations of El Monte families with accessible healthcare options.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
