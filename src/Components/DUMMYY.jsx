import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import API_ENDPOINT from '../utils/constants';

function DUMMYY() {
  document.body.classList.add("patient-body");
  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/specialitie`,
    updateEndpoint:`${API_ENDPOINT}/api/admin/update/specialitie/`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/delete/specialitie/`,
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
    
  
    
      <Table tableInfo={tableInfo} />
      
    </div>




  )
}

export default DUMMYY