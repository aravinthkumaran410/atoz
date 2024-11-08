import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import client from "../../Client/Client";
import toast from "react-hot-toast";

const Sidebar = ({ open, toggleSidebar,setAdmin }) => {
  const location = useLocation();
  const navigate=useNavigate();
  const isActive = (path) => location.pathname === path;
  const handleLogout =async()=>{

    try{
      const res=await client.post("/admins/logout/",{},{
        withCredentials:true
      })
      if(res.status===200){
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        localStorage.removeItem("tokenExpiration");
        setAdmin(null);
        navigate("/");

        window.location.reload();
        
      }
    }catch(err){
      console.log(err);
      if (err.response && err.response.status === 401) {
        toast.error("Token is invalid.Login again");
      } else {
        toast.error("Try again");
      }
    }
    

  }
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
                isActive("/otherrate") ? "active" : "collapsed"
              }`}
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              to="#"
            >
             <i class="bi bi-currency-dollar"></i>
              <span>Other Rate</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/otherrate"
                  className={`${isActive("/otherrate") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add Other Rate</span>
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
            <i class="bi bi-calendar-check"></i>
              <span>Taxi Bookings</span>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/manage/contact") ? "active" : "collapsed"}`} to="/manage/contact">
            <i class="bi bi-envelope"></i>
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
                isActive("/manage/tariff") ? "active" : "collapsed"
              }`}
              to="/manage/tariff"
            >
              <i className="bi bi-file-text"></i>
              <span>City</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/otherrate") ? "active" : "collapsed"
              }`}
              to="/manage/otherrate"
            >  <i class="bi bi-currency-dollar"></i>
              <span>Other Rate</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive( '/manage/usercontact') ? "active" : "collapsed"
              }`}
              to= '/manage/usercontact'
            >   <i class="bi bi-person-circle"></i>
              <span>User Contact</span>
            </Link>
          </li>
          

 
        </ul>
        <Button variant="contained"
                  color="error" style={{
          marginTop:"20px"
        }} onClick={handleLogout}>
        <LogoutIcon />
        <span style={{
          marginLeft: "5px"
        }}>Logout</span>
        </Button>
      </aside>
      {open && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </Fragment>
  );
};

export default Sidebar;
