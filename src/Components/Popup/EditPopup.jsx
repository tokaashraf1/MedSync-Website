import React, { useContext, useState } from 'react'
import "./Popup.css"
import Loading from '../Loading/Loading';
import {capitalizeAndSpace} from "../../utils/capitalizeAndSpace"
import { AdminContext } from "../../Contexts/AdminProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditPopup({selectedRow ,setSelectedRow , visibleColumns ,tableInfo}) {
  const {count, setCount } = useContext(AdminContext);
  const[loading,setLoading]=useState(false);
  const handleEditSave = async (editedRow) => {
    try {
      setLoading(true); 
      const response = await fetch(tableInfo.updateEndpoint + editedRow.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(editedRow),
      });
  
      if (response.ok) {
        console.log('Row updated successfully:', editedRow);
        setSelectedRow(null);
      } else {
        console.error('Error updating row:', response.status);
      }
      setCount(count+1);
      setSelectedRow(null);
      setLoading(false); 
      toast.success(' Data updated successfully', {
        position: "bottom-right",
        autoClose: 4000,
        });
      // window.location.href = tableInfo.location;
    } catch (error) {
      console.error('Error updating row:', error.message);
      console.log('Edited Row ID:', editedRow.id);
      setLoading(false); 
      toast.error(' Please Try Again!', {
        position: "bottom-right",
        autoClose: 4000,  
        });
    }
  };
  
  return (
    <div>
          {selectedRow && (
        <div className="popup-container "   >
            <p  className="position-absolute  fs-3 text-black"> <i className="fa fa-pencil-square-o me-2" aria-hidden="true"></i>EDIT</p>
          <br />
          {visibleColumns.map((column, i) => (
          
            <div key={i}>
              <label>
                {capitalizeAndSpace(column)}:
                <input
                  type="text"
                  value={selectedRow[column]}
                  onChange={(e) =>
                    setSelectedRow((prevRow) => ({
                      ...prevRow,
                      [column]: e.target.value,
                    }))
                  }
                  className="d-block"
                />
              </label>
            </div>
          ))}
          <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
          <div>
              <button onClick={() => handleEditSave(selectedRow)}  className='popup-first-btn  me-3'>Edit</button>
              <button onClick={() => setSelectedRow(null)} className=' '>Cancel</button>
          </div>
          </div>
        </div>
      )}
          {loading && (
      <Loading/>
      )}
    </div>
  )
}

export default EditPopup