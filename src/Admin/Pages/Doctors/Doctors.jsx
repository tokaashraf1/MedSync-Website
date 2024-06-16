import React from 'react'
import  { useState, useEffect } from 'react';
import Table from "../../../Components/Table/Table"
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../../../Components/Footer/Footer";
import API_ENDPOINT from '../../../utils/constants';
import Header from '../../../Components/Header/header';

function Doctors() {
  document.body.classList.add("admin-pages");
  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/doctor`,
    updateEndpoint:`${API_ENDPOINT}/api/admin/update/doctor/`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/delete/doctor/`,
    request:false,
    Adminrequest:false,
    location: "/doctors",
  });


  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/doctors`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ user,gender,id,years_of_exp,clinic_address,clinic_phone,medical_speciality}) => ({
            name:user.name,
            gender,
            id,
            years_of_exp,
            email:user.email,
            clinic_address, 
            clinic_phone,
            medical_speciality,

      
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
  }, [tableInfo.rows]);

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
  )
}

export default Doctors