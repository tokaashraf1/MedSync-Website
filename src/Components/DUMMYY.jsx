import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import API_ENDPOINT from '../utils/constants';

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
    request:true,
    location: "/spec",
  });

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/approval/requests`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ id,request_status,doctor_id,created_at}) => ({
            id,
            request_status,
            doctor_id,
            created_at
  
        
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
    
  
    
      <Table tableInfo={tableInfo} />
      
    </div>




  )
}

export default DUMMYY