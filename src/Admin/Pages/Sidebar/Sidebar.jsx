// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  // Extract the path from the location object
  const currentPath = location.pathname;

  return (
    <div className="sidebar">

       <Link id='dashboard' to="/adminhome" className={currentPath === '/adminhome' ? 'active' : ''}>
        <i className="fa fa-tachometer fa_custom me-1"></i> Dashboard
      </Link> 
      {/* <Link id="sidebar-a" to="/doctors" className={currentPath === '/doctors' ? 'active' : ''} style={{marginTop:"80px"}}>
      <i className="fa fa-tachometer fa_custom me-1"></i> Dashboard
      </Link> */}
      <Link id="sidebar-a" to="/doctors" className={currentPath === '/doctors' ? 'active' : ''}>
        <i className="fa fa-user-md me-2" aria-hidden="true"></i> Doctors
      </Link>
      <Link id="sidebar-a" to="/patients" className={currentPath === '/patients' ? 'active' : ''}>
       <i className="fa fa-wheelchair-alt me-2" aria-hidden="true"></i> Patients
      </Link>

      
  
      <Link id="sidebar-a"  to="/diagnoses" className={currentPath === '/diagnoses' ? 'active' : ''}>
        <i className="fa fa-thermometer-half me-2" aria-hidden="true"></i> Diagnoses
      </Link>
      <Link id="sidebar-a"  to="/treatments" className={currentPath === '/treatments' ? 'active' : ''}>
      <i className="fa fa-heartbeat me-2" aria-hidden="true"></i>Treatments
      </Link>
    
      <Link id="sidebar-a" to="/drugs" className={currentPath === '/drugs' ? 'active' : ''}>
        <i className="fa fa-plus-square me-2" aria-hidden="true"></i> Medications
      </Link>
      <Link id="sidebar-a"  to="/symptoms" className={currentPath === '/symptoms' ? 'active' : ''}>
      <i className="fa fa-blind me-2" aria-hidden="true"></i>Symptoms
      </Link>
      <Link id="sidebar-a"  to="/spec" className={currentPath === '/spec' ? 'active' : ''}>
      <i className="fa fa-stethoscope me-2" aria-hidden="true"></i>Specialties
      </Link>
      <Link id="sidebar-a"  to="/lab" className={currentPath === '/lab' ? 'active' : ''}>
      <i class="fa fa-list-alt me-2" aria-hidden="true"></i>Lab Tests
      </Link>
      <Link id="sidebar-a"  to="/vaccines" className={currentPath === '/vaccines' ? 'active' : ''}>
      <i class="fa fa-medkit me-2" aria-hidden="true"></i> Vaccines
      </Link>
      <Link id="sidebar-a"  to="/requests" className={currentPath === '/requests' ? 'active' : ''}>
      <i class="fa fa-folder-open-o me-2" aria-hidden="true"></i> Requests
      </Link>
      <Link id="sidebar-a"  to="/violations" className={currentPath === '/violations' ? 'active' : ''}>
      <i class="fa fa-ban me-2" aria-hidden="true"></i> Violations
      </Link>
    </div>
  );
};

export default Sidebar;
