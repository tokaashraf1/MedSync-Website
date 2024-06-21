import React, { useContext, useState } from 'react'
import "./Popup.css"
import Loading from '../Loading/Loading';
import { AdminContext } from "../../Contexts/AdminProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RejectPopup({isreject,tableInfo,setisreject,rejectedRow,setrejectedRow}) {
  const {updateFlag, setUpdateFlag } = useContext(AdminContext);
  const[loading,setLoading]=useState(false);
  const [selectedReason, setSelectedReason] = useState(""); 
  function getSelectedReason(event) {
    const selectedValue = event.target.value;
    setSelectedReason(selectedValue);
    console.log(selectedValue)
  }
  const handleRejectConfirm = async () => {
    try {
      setLoading(true);
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (!tableInfo.adminrequest) {
        const authToken = localStorage.getItem('authToken');
        requestOptions.headers.Authorization = `Bearer ${authToken}`;
      } else {
        const requestBody = {
          reason: selectedReason,
        };
        requestOptions.body = JSON.stringify(requestBody);
      }
  
      const response = await fetch(tableInfo.rejectapi + rejectedRow.id, requestOptions);
      
      if (response.ok) {
        setrejectedRow(null);
        setisreject(false)
        setUpdateFlag(updateFlag+1);
        setLoading(false); 
        toast.success(' Request rejected successfully', {
          position: "bottom-right",
          autoClose: 4000,
          });
        // window.location.href = tableInfo.location;
      } else {
        console.error('Error deleting row:', response.status);
      }
    } catch (error) {
      console.error('Error deleting row:', error.message);
      toast.error(' Please Try Again!', {
        position: "bottom-right",
        autoClose: 4000,  
        });
    } finally {
      setLoading(false);
      
    }
  };
  
  return (

    <div>
        {isreject && (
  <div className="popup-container">
    {tableInfo.Adminrequest&& (
<div>
      <p className=' mt-3 fs-5 ms-5'> Why is this doctor being rejected?</p>
      <select className='mt-3 fs-5 ms-5' style={{ transform:"translate(0,-20px)",borderRadius:"5px"}} onChange={getSelectedReason} >
    <option value="License Not Supported">License Not Supported</option>
    <option value="Unclear License">Unclear License</option>
    <option value="Other Reasons">Other Reasons</option>
  </select>
</div>
)}
    {tableInfo.Adminrequest===false&& (
<div>
    <p  className=' mt-3 fs-5 ms-5 text-black'>Are you sure you want to reject this patient?</p>
</div>
)}
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