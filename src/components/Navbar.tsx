import React, { useState, useEffect } from 'react';
import { Navbar as BsNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaClock, FaCalendarDay } from 'react-icons/fa6';
import { useSchedule } from '../context/ScheduleContext';
import { getCurrentLanguage } from '../utils/language';
import { HolidayStatus } from '../types/schedule';

export const getSpecialScheduleStatus = (): HolidayStatus => {
  const now = new Date();
  const year = now.getFullYear();
  const dec15 = new Date(year, 11, 15);
  const dec23 = new Date(year, 11, 23, 23, 59);
  const dec24 = new Date(year, 11, 24);
  const jan1 = new Date(year + 1, 0, 1, 23, 59);
  const feb16 = new Date(2026, 1, 16);
  const feb18 = new Date(2026, 1, 18, 23, 59);

  if (now >= feb16 && now <= feb18) {
    return { isSpecial: true, hours: "Closed", message: "Clinic Closure" };
  }
  if (now >= dec15 && now <= dec23) {
    return { isSpecial: true, hours: "2:00 PM – 6:00 PM", message: "Holiday Hours" };
  }
  if (now >= dec24 && now <= jan1) {
    return { isSpecial: true, hours: "Closed", message: "Holiday Closure" };
  }

  return { isSpecial: false, hours: null, message: null };
};

export const Navbar: React.FC = () => {
  const { todayHours } = useSchedule();
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const specialStatus = getSpecialScheduleStatus();
  const displayHours = specialStatus.isSpecial ? specialStatus.hours : (todayHours || "Closed");
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
            height="40"
            className="me-2"
          />
          <div className="d-flex flex-column">
            <span className="fw-bold fs-5 text-dark lh-1" style={{ letterSpacing: "-0.02em" }}>
              Aurora <span className="text-primary fw-extrabold">Medical</span>
            </span>
            <small className="text-muted" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
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
              className={`px-3 py-2 fw-semibold rounded-pill ${
                location.pathname === "/" ? "bg-primary text-white" : "text-secondary"
              }`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={`px-3 py-2 fw-semibold rounded-pill ${
                location.pathname === "/about" ? "bg-primary text-white" : "text-secondary"
              }`}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/careers"
              className={`px-3 py-2 fw-semibold rounded-pill ${
                location.pathname === "/careers" ? "bg-primary text-white" : "text-secondary"
              }`}
            >
              Careers
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/news"
              className={`px-3 py-2 fw-semibold rounded-pill ${
                location.pathname === "/news" ? "bg-primary text-white" : "text-secondary"
              }`}
            >
              News
            </Nav.Link>
          </Nav>

          <div className="d-flex flex-wrap align-items-center gap-3 mt-2 mt-lg-0">
            {/* Hours Badge Pill */}
            <div className="d-flex align-items-center bg-light border rounded-pill px-3 py-1 shadow-sm">
              {specialStatus.isSpecial ? (
                <FaCalendarDay className="text-warning me-2" size={14} />
              ) : (
                <FaClock className="text-primary me-2" size={14} />
              )}
              <div className="small fw-semibold text-dark me-2" style={{ fontSize: "12.5px" }}>
                {specialStatus.isSpecial ? specialStatus.message : `${todayName}:`}
              </div>
              <Badge
                bg={displayHours === "Closed" ? "danger" : "success"}
                className="rounded-pill px-2 py-1"
                style={{ fontSize: "11px" }}
              >
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
