import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeartPulse, FaUserDoctor, FaHospital, FaShieldHalved } from 'react-icons/fa6';

export const About: React.FC = () => {
  return (
    <div className="py-5">
      <Container>
        <Row className="mb-5 text-center">
          <Col lg={8} className="mx-auto">
            <span className="stat-pill mb-2">ABOUT AURORA MEDICAL CENTER</span>
            <h1 className="display-5 fw-bold text-dark mb-3">Dedicated to Your Health & Well-being</h1>
            <p className="lead text-muted">
              Aurora Medical Center provides patient-centered, compassionate primary care for individuals and families in El Monte, California.
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card className="premium-card h-100 p-4">
              <Card.Body>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3">
                    <FaHeartPulse size={28} />
                  </div>
                  <h4 className="fw-bold text-dark mb-0">Our Mission</h4>
                </div>
                <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>
                  Our mission is to deliver evidence-based, compassionate primary care that empowers patients to live healthier, fuller lives. We focus on wellness promotion, disease prevention, and active chronic condition management tailored to each patient's unique needs.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="premium-card h-100 p-4">
              <Card.Body>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-3">
                    <FaShieldHalved size={28} />
                  </div>
                  <h4 className="fw-bold text-dark mb-0">Our Care Philosophy</h4>
                </div>
                <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>
                  We believe high-quality medical care requires trust, continuous communication, and cultural competence. Serving a diverse community, our staff provides clear, supportive guidance across multiple languages including English, Spanish, Mandarin, Cantonese, and Vietnamese.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card className="premium-card text-center p-4">
              <Card.Body>
                <FaUserDoctor size={36} className="text-primary mb-3" />
                <h5 className="fw-bold text-dark mb-2">Experienced Team</h5>
                <p className="text-muted small mb-0">
                  Board-certified physicians and experienced nurse practitioners dedicated to comprehensive family care.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="premium-card text-center p-4">
              <Card.Body>
                <FaHospital size={36} className="text-success mb-3" />
                <h5 className="fw-bold text-dark mb-2">Modern Facilities</h5>
                <p className="text-muted small mb-0">
                  Equipped with modern diagnostic tools, comfortable examination rooms, and easy parking access.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="premium-card text-center p-4">
              <Card.Body>
                <FaHeartPulse size={36} className="text-danger mb-3" />
                <h5 className="fw-bold text-dark mb-2">Community Focused</h5>
                <p className="text-muted small mb-0">
                  Proudly serving generations of El Monte families with accessible, affordable healthcare options.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
