import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaBullhorn, FaCalendarDays } from 'react-icons/fa6';
import { useContent } from '../context/ContentContext';

export const News: React.FC = () => {
  const { announcements, holiday } = useContent();

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
            {/* Active Holiday Notice Card if set */}
            {holiday.active && (
              <Card className="premium-card p-4 mb-4 border-warning border-2">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <Badge bg="danger" className="px-3 py-2 rounded-pill">
                      {holiday.badge || "Holiday Closure Notice"}
                    </Badge>
                    <div className="text-muted small d-flex align-items-center gap-1">
                      <FaCalendarDays /> Notice
                    </div>
                  </div>
                  <h4 className="fw-bold text-dark mb-2">{holiday.title}</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: 1.6 }}>
                    {holiday.message} <strong>{holiday.hours}</strong>
                  </p>
                </Card.Body>
              </Card>
            )}

            {/* Dynamic Announcements List */}
            {announcements.map((item, idx) => (
              <Card className="premium-card p-4 mb-4" key={idx}>
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <Badge bg="info" className="px-3 py-2 rounded-pill">
                      {item.badge}
                    </Badge>
                    {item.date && (
                      <div className="text-muted small d-flex align-items-center gap-1">
                        <FaBullhorn /> {item.date}
                      </div>
                    )}
                  </div>
                  <h4 className="fw-bold text-dark mb-2">{item.title}</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: 1.6 }}>
                    {item.content}
                  </p>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
