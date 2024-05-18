import React, { useState } from 'react'
import "./Popup.css"
import Loading from '../Loading/Loading';
function RejectPopup({isreject,tableInfo,setisreject,rejectedRow,setrejectedRow}) {
  const[loading,setLoading]=useState(false);
  const [selectedReason, setSelectedReason] = useState(""); 
  function getSelectedReason(event) {
    const selectedValue = event.target.value;
    setSelectedReason(selectedValue);
    console.log(selectedValue)
  }
  const handleRejectConfirm= async () => {
    try {
      setLoading(true); 
      const requestBody = {
        reason: selectedReason 
      };
      const response = await fetch(tableInfo.rejectapi + rejectedRow.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), 
      });
      if (response.ok) {
        setrejectedRow(null);
        window.location.href = tableInfo.location;
      } else {
        console.error('Error deleting row:', response.status);
      }
    } catch (error) {
      console.error('Error deleting row:', error.message);
    } finally {
      setLoading(false); 
    }
  }
  return (

    <div>
        {isreject && (
  <div className="popup-container">
    <p className=' mt-3 fs-5 ms-5 text-black'> Why is this doctor being rejected?</p>
    <select className='mt-3 fs-5 ms-5' style={{ transform:"translate(0,-20px)",borderRadius:"5px"}} onChange={getSelectedReason} >
  <option value="License Not Supported">License Not Supported</option>
  <option value="Unclear License">Unclear License</option>
  <option value="Other Reasons">Other Reasons</option>
</select>
    <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
    <button onClick={handleRejectConfirm} className='me-3 table-delete-btn'>reject</button>
      <button onClick={()=>setisreject(false)}  className='delete-cancel'>Cancel</button>
    </div>
  </div>
)}
{loading && (
      <Loading/>
      )}
    </div>
  )
}

export default RejectPopup