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
  FaShieldHalved,
  FaUserDoctor,
  FaUserCheck,
} from 'react-icons/fa6';
import { useSchedule } from '../context/ScheduleContext';
import { getSpecialScheduleStatus } from '../components/Navbar';

export const services = [
  {
    icon: FaChild,
    bg: "#eff6ff",
    color: "#2563eb",
    title: "Pediatric Care",
    desc: "Child health checkups, immunizations, and growth tracking.",
  },
  {
    icon: FaUserGroup,
    bg: "#f0fdf4",
    color: "#16a34a",
    title: "Adult Primary Care",
    desc: "Comprehensive health evaluations and chronic disease management.",
  },
  {
    icon: FaHeartPulse,
    bg: "#fef2f2",
    color: "#dc2626",
    title: "Geriatric Medicine",
    desc: "Specialized senior care, mobility plans, and wellness monitoring.",
  },
  {
    icon: FaVenus,
    bg: "#fdf2f8",
    color: "#db2777",
    title: "Women's Health",
    desc: "Preventive screenings, reproductive care, and annual exams.",
  },
  {
    icon: FaClipboardList,
    bg: "#f0f9ff",
    color: "#0284c7",
    title: "Annual Physicals",
    desc: "Routine health checkups, employment physicals, and lab tests.",
  },
  {
    icon: FaSyringe,
    bg: "#faf5ff",
    color: "#9333ea",
    title: "Vaccinations",
    desc: "Routine immunizations, flu shots, and travel vaccines.",
  },
];

export const providers = [
  { name: "Dr. Yong Wang", role: "Family Medicine", icon: FaUserDoctor, color: "#2563eb", bg: "#eff6ff" },
  { name: "Dr. May Wang", role: "Pediatrics", icon: FaChild, color: "#0284c7", bg: "#f0f9ff" },
  { name: "Dr. Ryan Wang", role: "Internal Medicine", icon: FaUserGroup, color: "#16a34a", bg: "#f0fdf4" },
  { name: "NP Zin Aye", role: "Family Medicine", icon: FaHeartPulse, color: "#db2777", bg: "#fdf2f8" },
];

export const trustBadges = [
  { title: "Compassionate Care", subtitle: "Family-centered practice" },
  { title: "Multilingual Staff", subtitle: "EN, ES, ZH, VI spoken" },
  { title: "Convenient Location", subtitle: "Lower Azusa Rd, El Monte" },
  { title: "Comprehensive Services", subtitle: "Pediatrics to Geriatrics" },
];

export const Home: React.FC = () => {
  const specialStatus = getSpecialScheduleStatus();
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
    <div className="home-main">
      {/* Holiday Alert Banner */}
      {specialStatus.isSpecial && (
        <div className="bg-danger text-white py-2 text-center shadow-sm">
          <Container>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
              <div className="d-flex align-items-center">
                <FaTree className="me-2 fs-5" />
                <span className="fw-bold">HOLIDAY SCHEDULE NOTICE</span>
              </div>
              <div className="small">
                <span>{specialStatus.message}: <strong>{specialStatus.hours}</strong></span>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="stat-pill mb-3">
                <FaShieldHalved className="me-2" /> Dedicated Primary Care Clinic
              </div>
              
              <h1 className="display-4 fw-extrabold text-dark mb-3" style={{ letterSpacing: "-0.03em" }}>
                Compassionate Care for Your Family
              </h1>
              
              <p className="lead text-secondary mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
                Aurora Medical Center provides high-quality primary care, pediatrics, and preventive health services for all generations in El Monte, California.
              </p>

              {/* Providers Showcase */}
              <div className="mb-4">
                <div className="small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: "0.05em" }}>
                  Our Medical Team
                </div>
                <Row className="g-2">
                  {providers.map((p, idx) => (
                    <Col key={idx} xs={6} sm={6}>
                      <div className="provider-chip d-flex align-items-center">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                          style={{ width: "34px", height: "34px", backgroundColor: p.bg, color: p.color }}
                        >
                          <p.icon size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <div className="fw-bold text-dark text-truncate" style={{ fontSize: "13.5px" }}>{p.name}</div>
                          <div className="text-muted text-truncate" style={{ fontSize: "11.5px" }}>{p.role}</div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <Button className="btn-primary-custom" href="tel:+16265799541">
                  <FaPhone className="me-2" /> Call (626) 579-9541
                </Button>
                <Button className="btn-outline-custom" href="#location">
                  <FaRoute className="me-2" /> View Directions
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <div className="position-relative">
                <Card className="border-0 shadow-lg overflow-hidden rounded-4">
                  <img
                    src="/exterior.jpg"
                    alt="Aurora Medical Center - El Monte, CA Building Exterior"
                    className="img-fluid"
                    style={{ height: "420px", objectFit: "cover" }}
                    loading="eager"
                  />
                </Card>

                {/* Floating Badge */}
                <div
                  className="position-absolute bottom-0 start-0 m-4 bg-white p-3 rounded-3 shadow-lg border d-none d-sm-flex align-items-center gap-3"
                  style={{ zIndex: 2, maxWidth: "280px" }}
                >
                  <div className="bg-success bg-opacity-10 text-success rounded-circle p-2 d-flex align-items-center justify-content-center">
                    <FaUserCheck size={20} />
                  </div>
                  <div>
                    <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>Accepting New Patients</div>
                    <small className="text-muted" style={{ fontSize: "12px" }}>Walk-ins & Appointments</small>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trust Badges Bar */}
      <section className="py-4 bg-white border-bottom border-top">
        <Container>
          <Row className="g-3 text-center">
            {trustBadges.map((b, idx) => (
              <Col key={idx} xs={6} md={3}>
                <div className="p-2">
                  <div className="fw-bold text-dark" style={{ fontSize: "15px" }}>{b.title}</div>
                  <div className="text-muted small">{b.subtitle}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5" id="services">
        <Container>
          <div className="text-center max-width-600 mx-auto mb-5">
            <span className="stat-pill mb-2">Our Healthcare Services</span>
            <h2 className="section-title mb-2">Comprehensive Primary Care</h2>
            <p className="section-subtitle">
              We offer personalized medical care focused on prevention, wellness, and treatment for your entire family.
            </p>
          </div>

          <Row className="g-4 mb-4">
            {services.map((item, idx) => (
              <Col md={6} lg={4} key={idx}>
                <Card className="premium-card h-100 p-3">
                  <Card.Body className="d-flex flex-column">
                    <div
                      className="service-icon-box mb-3"
                      style={{ backgroundColor: item.bg, color: item.color }}
                    >
                      <item.icon />
                    </div>
                    <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Insurance Banner */}
          <Card className="premium-card border-0 bg-primary text-white p-4">
            <Card.Body className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                  style={{ width: "56px", height: "56px" }}
                >
                  <FaHospital size={26} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Insurance & Payment Options Accepted</h5>
                  <p className="mb-0 text-white-80 small">
                    We accept Medi-Cal, Medicare, PPO, HMO, Covered California plans, and self-pay cash options.
                  </p>
                </div>
              </div>
              <Button variant="light" href="tel:+16265799541" className="fw-bold text-primary px-4 flex-shrink-0 shadow-sm">
                Verify Insurance
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* Hours & Announcements Grid */}
      <section className="py-5 bg-white border-top border-bottom">
        <Container>
          <Row className="g-4">
            <Col lg={7}>
              <Card className="premium-card p-4 h-100">
                <Card.Body>
                  <h4 className="fw-bold text-dark mb-3">Weekly Hours of Operation</h4>
                  <p className="text-muted small mb-4">
                    Our clinic provides flexible appointment slots and walk-in availability.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-muted small">Day</th>
                          <th className="text-uppercase text-muted small">Clinic Hours</th>
                          <th className="text-uppercase text-muted small text-end">Status</th>
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
                                <Badge bg={isClosed ? "secondary" : "success"} pill>
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
              <Card className="premium-card p-4 h-100 bg-light">
                <Card.Body>
                  <h4 className="fw-bold text-dark mb-3">Clinic Announcements</h4>
                  <div className="bg-white p-3 rounded-3 border mb-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Badge bg="warning" text="dark">Notice</Badge>
                      <strong className="text-dark small">Clinic Closure – Feb 16-18</strong>
                    </div>
                    <p className="text-muted small mb-0">
                      The clinic will be closed from Monday, Feb 16 through Wednesday, Feb 18, 2026. Regular office hours resume on Thursday, Feb 19.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-3 border">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Badge bg="info">Information</Badge>
                      <strong className="text-dark small">Walk-in Patients Welcome</strong>
                    </div>
                    <p className="text-muted small mb-0">
                      Walk-ins are accommodated during regular business hours. For minimal wait times, please call ahead to check current scheduling.
                    </p>
                  </div>
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
              <div className="pe-lg-3">
                <span className="badge bg-primary px-3 py-2 rounded-pill fw-semibold mb-3">
                  LOCATION & CONTACT
                </span>
                <h2 className="display-6 fw-bold mb-4">Visit Our Clinic</h2>

                <div className="d-flex mb-4">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <FaLocationDot size={20} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Aurora Medical Center</h5>
                    <p className="text-white-50 mb-0">
                      11245 Lower Azusa Rd # A<br />
                      El Monte, CA 91731
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3 mb-4 text-white-50">
                  <div className="d-flex align-items-center">
                    <FaPhone className="text-primary me-3" size={18} />
                    <a href="tel:+16265799541" className="text-white text-decoration-none fw-semibold">
                      Phone: (626) 579-9541
                    </a>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaFax className="text-primary me-3" size={18} />
                    <span>Fax: (626) 313-2012</span>
                  </div>
                </div>

                <Button
                  className="btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                  href="https://www.google.com/maps/dir//11245+Lower+Azusa+Rd+A,+El+Monte,+CA+91731"
                  target="_blank"
                >
                  <FaRoute /> Get Google Maps Directions
                </Button>
              </div>
            </Col>

            <Col lg={7}>
              <div className="ratio ratio-21x9 rounded-4 shadow-lg overflow-hidden border border-secondary">
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
