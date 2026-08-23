import React, { useState, useEffect } from 'react';
import { Navbar as BsNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaClock, FaCalendarDay } from 'react-icons/fa6';
import { useContent } from '../context/ContentContext';
import { getCurrentLanguage } from '../utils/language';

export const Navbar: React.FC = () => {
  const { todayHours, holiday } = useContent();
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  
  const isSpecial = holiday.active;
  const displayHours = isSpecial ? (holiday.hours || "Closed") : (todayHours || "Closed");
  const displayMessage = isSpecial ? holiday.title : `${todayName}:`;

  const [currentLang, setCurrentLang] = useState<string>(getCurrentLanguage());
  const location = useLocation();

  useEffect(() => {
    const lang = getCurrentLanguage();
    if (lang !== currentLang) setCurrentLang(lang);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCurrentLang(selected);
    if (window.changeLanguage) {
      window.changeLanguage(selected);
    }
  };

  return (
    <BsNavbar expand="lg" sticky="top" className="app-header py-2">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
          <img
            src="/logo1.svg"
            alt="Aurora Medical Center"
            height="38"
            className="me-2"
          />
          <div className="d-flex flex-column">
            <span className="fw-bold fs-5 text-dark lh-1">
              Aurora Medical Center
            </span>
            <small className="text-muted" style={{ fontSize: "11px" }}>
              El Monte, CA
            </small>
          </div>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none p-1" />

        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-lg-center gap-1 my-2 my-lg-0">
            <Nav.Link
              as={Link}
              to="/"
              className={`nav-link-custom ${location.pathname === "/" ? "active fw-bold" : ""}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={`nav-link-custom ${location.pathname === "/about" ? "active fw-bold" : ""}`}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/careers"
              className={`nav-link-custom ${location.pathname === "/careers" ? "active fw-bold" : ""}`}
            >
              Careers
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/news"
              className={`nav-link-custom ${location.pathname === "/news" ? "active fw-bold" : ""}`}
            >
              News
            </Nav.Link>
          </Nav>

          <div className="d-flex flex-wrap align-items-center gap-3 mt-2 mt-lg-0">
            {/* Hours Badge */}
            <div className="d-flex align-items-center bg-light border rounded px-3 py-1">
              {isSpecial ? (
                <FaCalendarDay className="text-warning me-2" size={13} />
              ) : (
                <FaClock className="text-primary me-2" size={13} />
              )}
              <span className="small me-2" style={{ fontSize: "13px" }}>
                {displayMessage}
              </span>
              <Badge bg={displayHours.toLowerCase().includes("closed") ? "secondary" : "primary"}>
                {displayHours}
              </Badge>
            </div>

            {/* Custom Language Dropdown */}
            <select
              className="custom-lang-select"
              value={currentLang}
              onChange={handleLanguageChange}
              aria-label="Select Language"
            >
              <option value="en">🇺🇸 English</option>
              <option value="es">🇲🇽 Español</option>
              <option value="zh-CN">🇨🇳 简体中文</option>
              <option value="zh-TW">🇹🇼 繁體中文</option>
              <option value="vi">🇻🇳 Tiếng Việt</option>
            </select>
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};
