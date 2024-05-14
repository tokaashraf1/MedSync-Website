import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import API_ENDPOINT from '../utils/constants';
import Search from './Search/Search';

function DUMMYY() {
  document.body.classList.add("patient-body");
  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/symptom`,
    updateEndpoint:`${API_ENDPOINT}/api/admin/update/symptom/`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/delete/symptom/`,
    approveapi:`${API_ENDPOINT}/api/admin/approve/request/`,
    rejectapi:`${API_ENDPOINT}/api/admin/reject/request/`,
    request:false,
    Adminrequest:true,
    showapi:`${API_ENDPOINT}/api/admin/show/approval/request/`,
    location: "/spec",
  });

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/specialities`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ english_name,arabic_name,id}) => ({
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
  }, []);

  const handleSearch = (filteredData) => {
    setTableInfo({
      ...tableInfo,
      filteredData:filteredData,
    });
  };

  return (
  
    <div>
    
  
    
      <Table tableInfo={tableInfo} handleSearch={handleSearch}   />
      
    </div>




  )
}

export default DUMMYY