import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import {
  FaChild,
  FaUserGroup,
  FaHeartPulse,
  FaVenus,
  FaClipboardList,
  FaSyringe,
  FaHospital,
  FaPhone,
  FaFax,
  FaLocationDot,
  FaRoute,
  FaTree,
  FaUserDoctor,
} from 'react-icons/fa6';
import { useContent } from '../context/ContentContext';
import { IconType } from 'react-icons';

const services = [
  {
    icon: FaChild,
    color: "text-primary",
    title: "Pediatric Care",
    desc: "Well-child checkups, growth monitoring, and routine immunizations.",
  },
  {
    icon: FaUserGroup,
    color: "text-success",
    title: "Adult Primary Care",
    desc: "Comprehensive physical exams, health screenings, and disease management.",
  },
  {
    icon: FaHeartPulse,
    color: "text-danger",
    title: "Geriatric Care",
    desc: "Specialized senior care, chronic condition monitoring, and wellness plans.",
  },
  {
    icon: FaVenus,
    color: "text-info",
    title: "Women's Health",
    desc: "Preventive screenings, wellness exams, and reproductive healthcare.",
  },
  {
    icon: FaClipboardList,
    color: "text-warning",
    title: "Physical Exams",
    desc: "Annual checkups, employment physicals, and diagnostic lab testing.",
  },
  {
    icon: FaSyringe,
    color: "text-primary",
    title: "Vaccinations",
    desc: "Routine immunizations, annual flu shots, and travel vaccines.",
  },
];

function getMemberIcon(iconName?: string): IconType {
  switch (iconName?.toLowerCase()) {
    case 'child':
    case 'pediatrics':
      return FaChild;
    case 'group':
    case 'internal':
      return FaUserGroup;
    case 'heart':
    case 'geriatric':
      return FaHeartPulse;
    case 'doctor':
    default:
      return FaUserDoctor;
  }
}

export const Home: React.FC = () => {
  const { schedule, holiday, team, announcements } = useContent();
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
    <div className="home-main">
      {/* Holiday Alert Banner */}
      {holiday.active && (
        <div className="bg-warning bg-opacity-10 border-bottom border-warning py-2 text-center">
          <Container>
            <div className="d-flex justify-content-center align-items-center gap-2 small">
              <FaTree className="text-warning" />
              <strong>{holiday.title}:</strong> {holiday.message} <span>({holiday.hours})</span>
            </div>
          </Container>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <h1 className="display-5 fw-bold text-dark mb-3">
                Compassionate Healthcare for Your Entire Family
              </h1>
              
              <p className="lead text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                Aurora Medical Center provides primary care, pediatrics, and preventive medical services for patients of all ages in El Monte, California.
              </p>

              {/* Medical Team */}
              <div className="mb-4">
                <div className="small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: "0.05em", fontSize: "11px" }}>
                  Our Medical Team
                </div>
                <Row className="g-2">
                  {team.map((member, idx) => {
                    const IconComponent = getMemberIcon(member.icon);
                    return (
                      <Col key={idx} xs={6} sm={6}>
                        <div className="bg-white border rounded p-2 d-flex align-items-center me-2">
                          <IconComponent className="text-primary me-2 flex-shrink-0" size={16} />
                          <div className="overflow-hidden">
                            <div className="fw-bold text-dark text-truncate small">{member.name}</div>
                            <div className="text-muted text-truncate" style={{ fontSize: "11px" }}>{member.role}</div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <Button className="btn-primary-clean" href="tel:+16265799541">
                  <FaPhone className="me-2" /> Call (626) 579-9541
                </Button>
                <Button className="btn-outline-clean" href="#location">
                  <FaRoute className="me-2" /> View Location
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <Card className="border-0 shadow-sm overflow-hidden rounded-3">
                <img
                  src="/exterior.jpg"
                  alt="Aurora Medical Center Building Exterior in El Monte, CA"
                  className="img-fluid"
                  style={{ height: "380px", objectFit: "cover" }}
                  loading="eager"
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5" id="services">
        <Container>
          <div className="mb-4">
            <h2 className="fw-bold text-dark mb-1">Our Services</h2>
            <p className="text-muted">Comprehensive primary and preventive healthcare for all ages.</p>
          </div>

          <Row className="g-3 mb-4">
            {services.map((item, idx) => (
              <Col md={6} lg={4} key={idx}>
                <Card className="clean-card h-100 p-3">
                  <Card.Body>
                    <item.icon className={`${item.color} mb-3`} size={28} />
                    <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Insurance Banner */}
          <Card className="clean-card border-0 bg-primary text-white p-4">
            <Card.Body className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <FaHospital size={32} />
                <div>
                  <h5 className="fw-bold mb-1">Insurance & Payment Options Accepted</h5>
                  <p className="mb-0 text-white-75 small">
                    We accept Medi-Cal, Medicare, PPO, HMO, Covered California plans, and self-pay cash options.
                  </p>
                </div>
              </div>
              <Button variant="light" href="tel:+16265799541" className="fw-bold text-primary px-4 flex-shrink-0">
                Call to Verify
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* Hours & Dynamic Announcements */}
      <section className="py-5 bg-light border-top border-bottom">
        <Container>
          <Row className="g-4">
            <Col lg={7}>
              <Card className="clean-card p-4 h-100">
                <Card.Body>
                  <h4 className="fw-bold text-dark mb-3">Weekly Hours of Operation</h4>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead>
                        <tr>
                          <th className="text-muted small">Day</th>
                          <th className="text-muted small">Hours</th>
                          <th className="text-muted small text-end">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {daysOrder.map((day) => {
                          const hours = schedule[day] || "Closed";
                          const isToday = day === todayName;
                          const isClosed = hours.toLowerCase().includes("closed");
                          return (
                            <tr key={day} className={isToday ? "table-active-day" : ""}>
                              <td className="fw-semibold">
                                {day} {isToday && <Badge bg="primary" className="ms-2">Today</Badge>}
                              </td>
                              <td>{hours}</td>
                              <td className="text-end">
                                <Badge bg={isClosed ? "secondary" : "success"}>
                                  {isClosed ? "Closed" : "Open"}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="clean-card p-4 h-100">
                <Card.Body>
                  <h4 className="fw-bold text-dark mb-3">Announcements</h4>
                  {announcements.map((item, idx) => (
                    <div className="border-bottom pb-3 mb-3 last-no-border" key={idx}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <strong className="text-dark small">{item.title}</strong>
                        <Badge bg="light" text="dark" className="border">{item.badge}</Badge>
                      </div>
                      <p className="text-muted small mb-0">{item.content}</p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Location & Map Section */}
      <section className="bg-dark text-white py-5" id="location">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={5}>
              <h2 className="fw-bold mb-4">Visit Our Clinic</h2>

              <div className="d-flex mb-4">
                <FaLocationDot className="text-primary me-3 mt-1" size={20} />
                <div>
                  <h5 className="fw-bold mb-1">Aurora Medical Center</h5>
                  <p className="text-white-50 mb-0">
                    11245 Lower Azusa Rd # A<br />
                    El Monte, CA 91731
                  </p>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 mb-4 text-white-50">
                <div className="d-flex align-items-center">
                  <FaPhone className="text-primary me-3" size={16} />
                  <a href="tel:+16265799541" className="text-white text-decoration-none fw-semibold">
                    Phone: (626) 579-9541
                  </a>
                </div>
                <div className="d-flex align-items-center">
                  <FaFax className="text-primary me-3" size={16} />
                  <span>Fax: (626) 313-2012</span>
                </div>
              </div>

              <Button
                className="btn-primary-clean w-100 d-flex align-items-center justify-content-center gap-2"
                href="https://www.google.com/maps/dir//11245+Lower+Azusa+Rd+A,+El+Monte,+CA+91731"
                target="_blank"
              >
                <FaRoute /> Get Google Maps Directions
              </Button>
            </Col>

            <Col lg={7}>
              <div className="ratio ratio-21x9 rounded shadow overflow-hidden border border-secondary">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.6067527653246!2d-118.0415392235472!3d34.07955511627883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d708bd6d3893%3A0x6266205737527776!2s11245%20Lower%20Azusa%20Rd%20A%2C%20El%20Monte%2C%20CA%2091731!5e0!3m2!1sen!2sus!4v1701234567890!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aurora Medical Center Map Location"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
