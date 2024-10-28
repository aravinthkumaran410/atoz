import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <Fragment>
      <aside id="sidebar" className={`sidebar ${open ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/") ? "active" : "collapsed"}`}
              to="/"
            >
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/trip/oneway") || isActive("/trip/round")
                  ? "active"
                  : "collapsed"
              }`}
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-car-front-fill"></i>
              <span>Trip</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/trip/oneway"
                  className={`${isActive("/trip/oneway") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>One Way Trip</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/trip/round"
                  className={`${isActive("/trip/round") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Round Trip</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/statepermit") ? "active" : "collapsed"
              }`}
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-shield-check"></i>
              <span>State Permit</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="components-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/statepermit"
                  className={`${isActive("/statepermit") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add State Permit</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/blogs") ? "active" : "collapsed"
              }`}
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-file-text"></i>
              <span>Blogs</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/blogs"
                  className={`${isActive("/blogs") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add Blogs Deatils</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/quotes") ? "active" : "collapsed"
              }`}
              data-bs-target="#Quotes-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-quote"></i>
              <span>Quotes</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="Quotes-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/quotes"
                  className={`${isActive("/quotes") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add Quotes </span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/founder") ? "active" : "collapsed"
              }`}
              data-bs-target="#Founder-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-person"></i>

              <span>Founder</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="Founder-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/founder"
                  className={`${isActive("/founder") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add Founder </span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/reviews") ? "active" : "collapsed"
              }`}
              data-bs-target="#charts-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-chat-dots"></i>
              <span>Review</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="charts-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/reviews"
                  className={`${isActive("/reviews") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add Testimonals</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-heading">Manage</li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/trip/oneway") ||
                isActive("/manage/trip/round")
                  ? "active"
                  : "collapsed"
              }`}
              data-bs-target="#manage-trip-icons-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-car-front-fill"></i>
              <span>Trip</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="manage-trip-icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/manage/trip/oneway"
                  className={`${
                    isActive("/manage/trip/oneway") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-circle" />
                  <span>One Way Trip</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manage/trip/round"
                  className={`${
                    isActive("/manage/trip/round") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-circle" />
                  <span>Round Trip</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/manage/taxibooking") ? "active" : "collapsed"}`} to="/manage/taxibooking">
              <i className="bi bi-book"></i>
              <span>Taxi Bookings</span>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/manage/contact") ? "active" : "collapsed"}`} to="/manage/contact">
              <i className="bi bi-file-text"></i>
              <span>Contact</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/statepermit") ? "active" : "collapsed"
              }`}
              to="/manage/statepermit"
            >
              <i class="bi bi-shield-check"></i>
              <span>State Permit</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/blogs") ? "active" : "collapsed"
              }`}
              to="/manage/blogs"
            >
              <i className="bi bi-file-text"></i>
              <span>Blogs</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/quotes") ? "active" : "collapsed"
              }`}
              to="/manage/quotes"
            >
              <i className="bi bi-quote"></i>
              <span>Quotes</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/founder") ? "active" : "collapsed"
              }`}
              to="/manage/founder"
            >
              <i className="bi bi-person"></i>
              <span>Founder</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/about") ? "active" : "collapsed"
              }`}
              to="/manage/about"
            >
              <i className="bi bi-info-circle"></i>
              <span>About</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/contact") ? "active" : "collapsed"
              }`}
              to="/manage/contact"
            >
              <i className="bi bi-envelope"></i>
              <span>Contact</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/images") ? "active" : "collapsed"
              }`}
              to="/manage/images"
            >
              <i className="bi bi-images"></i>
              <span>Image</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/videos") ? "active" : "collapsed"
              }`}
              to="/manage/videos"
            >
              <i className="bi bi-youtube"></i>
              <span>YouTube URLs</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/review") ? "active" : "collapsed"
              }`}
              to="/manage/review"
            >
              <i className="bi bi-chat-dots"></i>
              <span>Review</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/register") ? "active" : "collapsed"
              }`}
              to="/manage/register"
            >
              <i className="bi bi-person-plus"></i>
              <span>Register</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/enqiure") ? "active" : "collapsed"
              }`}
              to="/manage/enqiure"
            >
              <i className="bi bi-calendar-check"></i>
              <span>Enquire</span>
            </Link>
          </li>
        </ul>
      </aside>
      {open && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </Fragment>
  );
};

export default Sidebar;
