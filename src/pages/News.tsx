import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaBullhorn, FaCalendarDays } from 'react-icons/fa6';

export const News: React.FC = () => {
  return (
    <div className="py-5">
      <Container>
        <div className="text-center max-width-600 mx-auto mb-5">
          <span className="stat-pill mb-2">ANNOUNCEMENTS & UPDATES</span>
          <h1 className="display-5 fw-bold text-dark mb-3">Clinic News</h1>
          <p className="lead text-muted">
            Stay updated with the latest clinic announcements, holiday hours, and health notices from Aurora Medical Center.
          </p>
        </div>

        <Row className="justify-content-center g-4">
          <Col lg={8}>
            <Card className="premium-card p-4 mb-4">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill">
                    Holiday Closure Notice
                  </Badge>
                  <div className="text-muted small d-flex align-items-center gap-1">
                    <FaCalendarDays /> February 16 - 18, 2026
                  </div>
                </div>
                <h4 className="fw-bold text-dark mb-2">Upcoming Clinic Holiday Closure</h4>
                <p className="text-muted mb-0" style={{ lineHeight: 1.6 }}>
                  Aurora Medical Center will be closed from Monday, February 16 through Wednesday, February 18, 2026. Regular office hours will resume on Thursday, February 19 at 9:00 AM. For medical emergencies during this period, please dial 911 or visit your nearest urgent care center.
                </p>
              </Card.Body>
            </Card>

            <Card className="premium-card p-4">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Badge bg="info" className="px-3 py-2 rounded-pill">
                    General Information
                  </Badge>
                  <div className="text-muted small d-flex align-items-center gap-1">
                    <FaBullhorn /> Ongoing
                  </div>
                </div>
                <h4 className="fw-bold text-dark mb-2">Flu Vaccinations & Routine Immunizations Available</h4>
                <p className="text-muted mb-0" style={{ lineHeight: 1.6 }}>
                  Seasonal flu vaccines and pediatric immunizations are available for all established and new patients. Call our office at (626) 579-9541 to schedule an appointment or ask about walk-in availability.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
