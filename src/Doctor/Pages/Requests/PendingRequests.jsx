import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "../../../Components/Table/Table"
import Search from "../../../Components/Search/Search"
import Sidebar from '../../../Components/SideBar/SideBar';
import Footer from '../../../Components/Footer/Footer';
import API_ENDPOINT from '../../../utils/constants';
import Header from '../../../Components/Header/header';


function PendingRequests() {

  document.body.classList.add("profile-body");
  const [tableInfo, setTableInfo] = useState({
    columns: [],rows: [],filteredData: [],
    approveapi: `${API_ENDPOINT}/api/doctor/approve-sharing/`,
    rejectapi: `${API_ENDPOINT}/api/doctor/reject-sharing/`,
    request: true,Adminrequest: false,
    showapi: `${API_ENDPOINT}/api/admin/show/approval/request/`,
    location: "/pendingreq",});
    const [token, settoken] = useState();
    
    useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      settoken(authToken);
    
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`, 
          'Content-Type': 'application/json',
        },
      };
    
      fetch(`${API_ENDPOINT}/api/doctor/pending-requests`, requestOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          if (data.pending_sharing_requests && data.pending_sharing_requests.length > 0) {
            const modifiedData = data.pending_sharing_requests.map((request) => ({
              status: request.status,
              name: request.patient.user.name,
              id:request.id,
              email:request.patient.user.email,

            }));
            setTableInfo({
              ...tableInfo,
              columns: Object.keys(modifiedData[0]), // Set columns based on modifiedData structure
              rows: modifiedData,
              filteredData: modifiedData,
            });
          } else {
            console.log('No pending sharing requests found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []); // Empty dependency array since this effect should run once on mount
    

  const handleSearch = (filteredData) => {
    setTableInfo({
      ...tableInfo,
      filteredData: filteredData,
    });
  };

  return (
  
      <div>
       <Header initialScrolled ={true} initialEnableScroll ={false} page="doctor" />
        <Sidebar />
        <Table tableInfo={tableInfo} handleSearch={handleSearch} />
        <Footer />
      </div>

  )
}

export default PendingRequests