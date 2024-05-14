import React, { useEffect, useState } from 'react'

function ShowRequest({isshowpopup, setisshowpopup, tableInfo,showRow, setshowRow , }) {
  const [fetchedData, setFetchedData] = useState(null);


  useEffect(() => {
    const handleRowClick = async (showRow) => {
      console.log("vvvvvvvvvvvvv", showRow);
  
      try {
        const response = await fetch(tableInfo.showapi + showRow.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Additional headers if needed
          },
          // You can pass any required parameters or headers in the fetch request
        });
  
        if (response.ok) {
          const data = await response.json();
          // Process the data as needed, e.g., display in a popup
          console.log('Data fetched successfully:', data);
          // Example: set state to display fetched data in a popup
          setFetchedData(data);
        } else {
          console.error('Error fetching data:', response.status);
          // Optionally, display an error message to the user
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        // Optionally, display an error message to the user
      }
    };
  
    if (showRow) {
      handleRowClick(showRow);
    }
  }, [showRow, tableInfo.showapi]);
  




  return (
    <div>  {isshowpopup && (
      <div className="popup-container "    >
        <br />
    
        {fetchedData && fetchedData.user &&  fetchedData.doctor &&(
<div>
<div className='fs-4'>
    <p> Name: {fetchedData.user.name}</p>
    <p >Email: {fetchedData.user.email}</p>
    <p >years of experience: {fetchedData.doctor.years_of_experience}</p>
</div>

  <div className='popup-img'>
    <img src={fetchedData.doctor.licence_information} alt="" />
  </div>
</div>
)}
        <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
          
          <button onClick={() => setisshowpopup(false)} className='show-cancel'>Cancel</button>
        </div>
      </div>
    )}</div>
  )
}

export default ShowRequest