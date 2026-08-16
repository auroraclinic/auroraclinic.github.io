import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaUserDoctor, FaUserGroup, FaEnvelope, FaPenToSquare } from 'react-icons/fa6';

export const jobOpenings = [
  {
    icon: FaUserDoctor,
    title: "Physicians (MD/DO/NP/PA)",
    specialties: [
      "Internal Medicine",
      "Geriatric Medicine",
      "Family Medicine",
      "Pediatrics",
    ],
    positions: "Multiple positions available",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: FaUserGroup,
    title: "Medical Assistants",
    specialties: ["Clinical Care", "Patient Triage", "EHR Documentation"],
    positions: "Multiple positions available",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    icon: FaPenToSquare,
    title: "Medical Scribes",
    specialties: ["Medical Charting", "Physician Support"],
    positions: "Multiple positions available",
    color: "#0284c7",
    bg: "#f0f9ff",
  },
];

export const Careers: React.FC = () => {
  return (
    <div className="careers-page py-5">
      <Container>
        <div className="text-center max-width-600 mx-auto mb-5">
          <span className="stat-pill mb-2">CAREER OPPORTUNITIES</span>
          <h1 className="section-title display-5 mb-3">Join Our Healthcare Team</h1>
          <p className="section-subtitle">
            We are looking to hire dedicated healthcare professionals to join Aurora Medical Center in El Monte, CA.
          </p>
        </div>

        <Row className="g-4 mb-5">
          {jobOpenings.map((job, idx) => (
            <Col md={4} key={idx}>
              <Card className="premium-card h-100 p-4 text-center">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                    style={{ width: "72px", height: "72px", backgroundColor: job.bg, color: job.color }}
                  >
                    <job.icon size={32} />
                  </div>
                  <h4 className="fw-bold text-dark mb-3">{job.title}</h4>
                  <div className="d-flex flex-wrap justify-content-center gap-1 mb-3">
                    {job.specialties.map((spec, sIdx) => (
                      <Badge bg="light" text="dark" className="border px-2 py-1" key={sIdx} style={{ fontSize: "12px" }}>
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Badge bg="success" className="px-3 py-2 rounded-pill fw-semibold">
                      {job.positions}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="premium-card border-0 bg-primary text-white p-4 p-md-5 text-center shadow-lg">
              <Card.Body>
                <div className="bg-white bg-opacity-20 rounded-circle d-inline-flex p-3 mb-3">
                  <FaEnvelope size={36} className="text-white" />
                </div>
                <h3 className="fw-bold mb-3">How to Apply</h3>
                <p className="mb-4 text-white-80">
                  Interested candidates are invited to submit their CV, resume, and cover letter directly to our Office Manager & Care Coordinator:
                </p>

                <div className="bg-white bg-opacity-10 rounded-3 p-3 mb-4 text-center border border-white border-opacity-25">
                  <div className="fw-bold fs-5">Julia Wang</div>
                  <small className="text-white-75">Office Manager & Care Coordinator</small>
                </div>

                <Button
                  variant="light"
                  size="lg"
                  href="mailto:julia.wang.amc@gmail.com?subject=Job Application - Aurora Medical Center"
                  className="px-4 py-3 fw-bold text-primary shadow-sm d-inline-flex align-items-center gap-2"
                >
                  <FaEnvelope /> Email Julia: julia.wang.amc@gmail.com
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
