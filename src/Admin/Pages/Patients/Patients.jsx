
import React, { useState, useEffect } from 'react';
import Table from "../../../Components/Table/Table"
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../../../Components/Footer/Footer";
import  "./Patients.css"
import API_ENDPOINT from '../../../utils/constants';
import Header from '../../../Components/Header/header';

const UsersLookup = () => {
  document.body.classList.add("patient-body");
  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/patient`,
    updateEndpoint:`${API_ENDPOINT}/api/admin/update/patient/`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/delete/patient/`,
    request:false,
    Adminrequest:false,
    location: "/patients",
  });


  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/patients`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ user, gender, age, address, phone, marital_status, id, emergency_data}) => ({
            name: user.name,
            gender,
            age,
            id,
            address,
            phone,
            marital_status,
            email: user.email,
            systolic:emergency_data.systolic,
            diastolic:emergency_data.diastolic,
            blood_sugar:emergency_data.blood_sugar,
            weight:emergency_data.weight,
            height:emergency_data.height,
            blood_type:emergency_data.blood_type,
            chronic_diseases_bad_habits:emergency_data.chronic_diseases_bad_habits,
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
  );
};

export default UsersLookup;
