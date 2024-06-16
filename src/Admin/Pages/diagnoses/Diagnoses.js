import React from 'react'
import  { useState, useEffect } from 'react';
import Table from "../../../Components/Table/Table"
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../../../Components/Footer/Footer";
import "./Diagnoses.css"
import API_ENDPOINT from '../../../utils/constants';
import Header from '../../../Components/Header/header';
function Diagnoses() {


  document.body.classList.add("admin-pages");
  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/diagnose`,
    updateEndpoint:`${API_ENDPOINT}/api/admin/update/diagnose/`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/delete/diagnose/`,
    request:false,
    Adminrequest:false,
    location: "/diagnoses",
  });

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/diagnoses`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ name,id}) => ({
            name,
            id,
      
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
      <Footer/>
    </div>
  );

}

export default Diagnoses