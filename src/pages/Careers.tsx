import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaUserDoctor, FaEnvelope } from 'react-icons/fa6';
import { useContent } from '../context/ContentContext';

export const Careers: React.FC = () => {
  const { careers } = useContent();

  return (
    <div className="py-5">
      <Container>
        <div className="mb-5 text-center">
          <h1 className="fw-bold text-dark mb-2">Join Our Team</h1>
          <p className="text-muted">
            Healthcare career opportunities at Aurora Medical Center in El Monte, CA.
          </p>
        </div>

        <Row className="g-4 mb-5">
          {careers.map((job, idx) => (
            <Col md={4} key={idx}>
              <Card className="clean-card h-100 p-4">
                <Card.Body className="d-flex flex-column align-items-start">
                  <FaUserDoctor size={28} className="text-primary mb-3" />
                  <h4 className="fw-bold text-dark mb-3">{job.title}</h4>
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {job.specialties.map((spec, sIdx) => (
                      <Badge bg="light" text="dark" className="border" key={sIdx}>
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <small className="text-success fw-semibold">{job.positions}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="clean-card bg-light p-4 text-center">
              <Card.Body>
                <FaEnvelope size={32} className="text-primary mb-3" />
                <h4 className="fw-bold mb-2">How to Apply</h4>
                <p className="text-muted mb-4">
                  Please submit your CV and cover letter to our Office Manager & Care Coordinator:
                </p>

                <div className="bg-white p-3 rounded border d-inline-block mb-4 text-start">
                  <div className="fw-bold text-dark">Julia Wang</div>
                  <small className="text-muted">Office Manager & Care Coordinator</small>
                </div>

                <div>
                  <Button
                    className="btn-primary-clean px-4 py-2"
                    href="mailto:julia.wang.amc@gmail.com?subject=Job Application - Aurora Medical Center"
                  >
                    <FaEnvelope className="me-2" /> julia.wang.amc@gmail.com
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
