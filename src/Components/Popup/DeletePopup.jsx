import React, { useState } from 'react'
import "./Popup.css"
import Loading from '../Loading/Loading';
function DeletePopup({isDeletePopup,tableInfo,setIsDeletePopup,deleteRow}) {
  const[loading,setLoading]=useState(false);
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true); 
      // Assuming you have an API endpoint for deleting a row
      const response = await fetch(tableInfo.deleteEndpoint+deleteRow.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Additional headers if needed
        },
      });
  
      if (response.ok) {
        window.location.href=tableInfo.location
      } else {
        console.error('Error deleting row:', response.status);
      }
    } catch (error) {
      console.error('Error deleting row:', error.message);
      setLoading(false); 
    }
  };
  return (
    <div>
  {isDeletePopup && (
  <div className="popup-container">
    <p className=' mt-3 fs-5 ms-5'> <i className="fa fa-exclamation-triangle me-3" aria-hidden="true"></i>Are you sure you want to delete this row?</p>
    <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
      <button onClick={handleDeleteConfirm} className='me-3 table-delete-btn'>Delete</button>
      <button onClick={()=>setIsDeletePopup(false)}  className='delete-cancel'>Cancel</button>
    </div>
  </div>
)}

{loading && (
      <Loading/>
      )}
    </div>
  )
}

export default DeletePopup