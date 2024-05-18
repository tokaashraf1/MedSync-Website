import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./SideBar.css"
import { AuthContext } from "../../Contexts/AuthProvider";
const Doctorsidebar = () => {
  const location = useLocation();
  const { handleLogoutClick } = useContext(AuthContext);
  const currentPath = location.pathname;

  return (
    <div className="sidebar">

       <Link id='doc-dashboard' to="/home" className={` ${currentPath === '/home' ? 'active' : ''}`} >
        <i className="fa fa-home me-2" aria-hidden="true"></i> Dashboard
      </Link> 
      <Link  to="/pendingreq" className={`sidebar-link  ${currentPath === '/pendingreq' ? 'active' : ''}`}>
      <i className="fa fa-clock-o me-2" aria-hidden="true"></i> Requests
      </Link>
      <Link  to="/approvedreqs"  className={`sidebar-link   ${currentPath === '/approvedreqs' ? 'active' : ''}`} >
      <i className="fa fa-check-square-o me-2" aria-hidden="true"></i> Patients
      </Link>
      <Link  to="/settings"  className={`sidebar-link  ${currentPath === '/settings' ? 'active' : ''}`}>
      <i className="fa fa-cog me-2" aria-hidden="true"></i> Settings
      </Link>
      <Link   onClick={handleLogoutClick} className='sidebar-link '>
      <i className="fa fa-sign-out me-2" aria-hidden="true"></i> log out
      </Link>

    </div>
  );
};

export default Doctorsidebar;
