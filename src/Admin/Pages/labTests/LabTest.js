import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "../../components/Table/Table"
import Search from "../../components/Search/Search"
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from "../../components/Footer/footer";
import AdminFooter from '../../components/adminfooter/AdminFooter';
import API_ENDPOINT from '../../hooks/constants';
import Header from '../../components/Header/Header';
function LabTest() {
  document.body.classList.add("patient-body");

  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/lab-test`,
    updateEndpoint:`${API_ENDPOINT}/api/admin/update/lab-test/`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/delete/lab-test/`,
    request:false,
    Adminrequest:false,
    location: "/lab",
  });






  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/lab-tests`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ arabic_name,english_name,id,reference_range}) => ({
            english_name,
            arabic_name,
            id,
            reference_range
          }));

          setTableInfo({
            ...tableInfo,
            columns: Object.keys(modifiedData[0]),
            rows: modifiedData,
            filteredData: modifiedData,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (filteredData) => {
    setTableInfo({
      ...tableInfo,
      filteredData: filteredData,
    });
  };

  return (
    <div>
      <Header initialScrolled ={true} initialEnableScroll ={false} page="admin" />
  
      <Sidebar/>
      <Table tableInfo={tableInfo} handleSearch={handleSearch} />
     <AdminFooter/>
    </div>
  )
}

export default LabTest