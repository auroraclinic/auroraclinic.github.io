import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useContent } from '../context/ContentContext';

export const News: React.FC = () => {
  const { announcements, holiday } = useContent();

  return (
    <div className="py-5">
      <Container>
        <div className="mb-5 text-center">
          <h1 className="fw-bold text-dark mb-2">Clinic News & Announcements</h1>
          <p className="text-muted">
            Updates and health notices from Aurora Medical Center.
          </p>
        </div>

        <Row className="justify-content-center g-4">
          <Col lg={8}>
            {holiday.active && (
              <Card className="clean-card p-4 mb-4 border-warning">
                <Card.Body>
                  <h4 className="fw-bold text-dark mb-2">{holiday.title}</h4>
                  <p className="text-muted mb-0">
                    {holiday.message}
                  </p>
                </Card.Body>
              </Card>
            )}

            {announcements.map((item, idx) => (
              <Card className="clean-card p-4 mb-4" key={idx}>
                <Card.Body>
                  {item.date && (
                    <div className="mb-2">
                      <small className="text-muted">{item.date}</small>
                    </div>
                  )}
                  <h4 className="fw-bold text-dark mb-2">{item.title}</h4>
                  <p className="text-muted mb-0">
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
