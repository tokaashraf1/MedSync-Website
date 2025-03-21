import React, { useContext } from 'react'
import  { useState, useEffect } from 'react';
import Table from "../../../Components/Table/Table"
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../../../Components/Footer/Footer";
import API_ENDPOINT from '../../../utils/constants';
import Header from '../../../Components/Header/header';
import { AdminContext } from "../../../Contexts/AdminProvider";
function Requests() {
  const {updateFlag, setUpdateFlag } = useContext(AdminContext);
  document.body.classList.add("patient-body");
  const [tableInfo, setTableInfo] = useState({
    columns: [],rows: [],filteredData: [],
    approveapi: `${API_ENDPOINT}/api/admin/approve/request/`,
    rejectapi: `${API_ENDPOINT}/api/admin/reject/request/`,
    request: true,Adminrequest: true,
    showapi: `${API_ENDPOINT}/api/admin/show/approval/request/`,
    location: "/requests",
    ban:false,
  });
    
  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/approval/requests`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(
            ({ id, request_status, doctor_id }) => ({
              id,
              request_status,
              doctor_id,
          
            })
          );
          setTableInfo({
            ...tableInfo,
            columns: Object.keys(modifiedData[0]),
            rows: modifiedData,
            filteredData: modifiedData,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [updateFlag]);

  const handleSearch = (filteredData) => {
    setTableInfo({
      ...tableInfo,
      filteredData: filteredData,
    });
  };

  return (
  
      <div>
        <Header initialScrolled={true} initialEnableScroll={false} page="admin" />
        <Sidebar />
        <Table tableInfo={tableInfo} handleSearch={handleSearch} />
        <Footer />
      </div>

  );
}
export default Requests