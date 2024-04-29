import React, { useState } from 'react'
import "./Popup.css"
function RejectPopup({isreject,tableInfo,setisreject,rejectedRow,setrejectedRow}) {
  const[loading,setLoading]=useState(false);
  const [selectedReason, setSelectedReason] = useState(""); 
  function getSelectedReason(event) {
    const selectedValue = event.target.value;
    setSelectedReason(selectedValue); // Update the state with the selected value
    console.log(selectedValue)
  }
  return (

    <div>
        {isreject && (
  <div className="popup-container">
    <p className=' mt-3 fs-5 ms-5'> Why is this doctor being rejected?</p>
    <select className='mt-3 fs-5 ms-5' style={{ transform:"translate(0,-20px)",borderRadius:"5px"}} onChange={getSelectedReason} >
  <option value="License Not Supported">License Not Supported</option>
  <option value="Unclear License">Unclear License</option>
  <option value="Other Reasons">Other Reasons</option>
</select>
    <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
    
      <button onClick={()=>setisreject(false)}  className='delete-cancel'>Cancel</button>
    </div>
  </div>
)}
    </div>
  )
}

export default RejectPopup