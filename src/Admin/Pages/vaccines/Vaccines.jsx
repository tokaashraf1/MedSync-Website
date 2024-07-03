import React, { useContext } from 'react'
import  { useState, useEffect } from 'react';
import Table from "../../../Components/Table/Table"
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../../../Components/Footer/Footer";
import API_ENDPOINT from '../../../utils/constants';
import Header from '../../../Components/Header/header';
import { AdminContext } from "../../../Contexts/AdminProvider";
function Vaccines() {
  document.body.classList.add("admin-pages");
  const { updateFlag } = useContext(AdminContext);
  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/vaccine`,
    updateEndpoint:`${API_ENDPOINT}/api/admin/update/vaccine/`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/delete/vaccine/`,
    request:false,
    Adminrequest:false,
    location: "/vaccines",
    ban:false,
  });

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/vaccines`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ arabic_name,english_name,id}) => ({
            english_name,
            arabic_name,
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
  }, [updateFlag]);

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

export default Vaccines