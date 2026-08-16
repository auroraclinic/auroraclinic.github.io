import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLocationDot, FaPhone, FaFax, FaRoute } from 'react-icons/fa6';
import { useSchedule } from '../context/ScheduleContext';

export const Footer: React.FC = () => {
  const { schedule } = useSchedule();
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const daysOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <footer className="bg-dark text-white py-5 border-top border-secondary">
      <Container>
        <Row className="g-4 mb-4">
          {/* Clinic Brand & Info */}
          <Col lg={4}>
            <div className="d-flex align-items-center mb-3">
              <img
                src="/logo1.svg"
                alt="Aurora Medical Center"
                height="38"
                className="me-2 bg-white rounded p-1"
              />
              <span className="fw-bold fs-5 text-white">Aurora Medical Center</span>
            </div>
            <p className="text-white-50 small mb-3" style={{ lineHeight: 1.6 }}>
              Providing compassionate, family-centered primary care and pediatric services for the El Monte community.
            </p>
            <div className="d-flex flex-column gap-2 text-white-50 small">
              <div className="d-flex align-items-center">
                <FaPhone className="text-primary me-2" />
                <a href="tel:+16265799541" className="text-white-50 text-decoration-none hover-white">
                  (626) 579-9541
                </a>
              </div>
              <div className="d-flex align-items-center">
                <FaFax className="text-primary me-2" />
                <span>Fax: (626) 313-2012</span>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={6} lg={3}>
            <h6 className="fw-bold text-uppercase text-white mb-3" style={{ letterSpacing: "0.05em", fontSize: "13px" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2 mb-0">
              <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
              <li><Link to="/careers" className="text-white-50 text-decoration-none">Careers & Openings</Link></li>
              <li><Link to="/news" className="text-white-50 text-decoration-none">News & Announcements</Link></li>
              <li><a href="#services" className="text-white-50 text-decoration-none">Medical Services</a></li>
            </ul>
          </Col>

          {/* Office Hours Summary */}
          <Col md={6} lg={5}>
            <h6 className="fw-bold text-uppercase text-white mb-3" style={{ letterSpacing: "0.05em", fontSize: "13px" }}>
              Clinic Hours
            </h6>
            <ul className="list-unstyled text-white-50 small mb-0">
              {daysOrder.map((day) => {
                const hours = schedule[day] || "Closed";
                const isToday = day === todayName;
                return (
                  <li
                    key={day}
                    className={`d-flex justify-content-between py-1 px-2 rounded ${
                      isToday ? "bg-primary text-white fw-bold" : ""
                    }`}
                  >
                    <span>{day}</span>
                    <span>{hours}</span>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>

        <div className="pt-4 border-top border-secondary d-flex flex-column flex-md-row align-items-center justify-content-between text-white-50 small gap-2">
          <div>
            <FaLocationDot className="text-primary me-1" /> 11245 Lower Azusa Rd # A, El Monte, CA 91731
          </div>
          <div className="d-flex align-items-center gap-3">
            <a
              href="https://www.google.com/maps/dir//11245+Lower+Azusa+Rd+A,+El+Monte,+CA+91731"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-50 text-decoration-none hover-white d-flex align-items-center gap-1"
            >
              <FaRoute className="text-primary" /> Directions
            </a>
            <span>&copy; {new Date().getFullYear()} Aurora Medical Center. All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
