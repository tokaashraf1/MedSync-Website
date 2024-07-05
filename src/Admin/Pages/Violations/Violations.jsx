import React from 'react'
import  { useContext } from 'react'
import  { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../../../Components/Footer/Footer";
import API_ENDPOINT from '../../../utils/constants';
import Header from '../../../Components/Header/header';
import { AdminContext } from "../../../Contexts/AdminProvider";
import ViolationsTable from './ViolationsTable';
function Violations() {
  document.body.classList.add("admin-pages");
  const { updateFlag } = useContext(AdminContext);
  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/doctor`,
    updateEndpoint:`${API_ENDPOINT}/api/admin/activate-user`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/deactivate-user`,
    request:false,
    Adminrequest:false,
    location: "",
    ban:false,

  });

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/doctors`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ user,id,user_id}) => ({
            name:user.name,
            id,
            user_id,
            email:user.email,

      
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
    <ViolationsTable tableInfo={tableInfo} handleSearch={handleSearch} />
    <Footer/>
  </div>
  )
}

export default Violations