import React, { useContext, useState } from 'react'
import "./Popup.css"
import {capitalizeAndSpace} from "../../utils/capitalizeAndSpace"
import Loading from '../Loading/Loading';
import { AdminContext } from "../../Contexts/AdminProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddPopup({isAddPopup,tableInfo,setIsAddPopup}) {
  const[loading,setLoading]= useState(false);
  const [newRecord, setNewRecord] = useState({});
  const {updateFlag, setUpdateFlag } = useContext(AdminContext);
  const handleAddSave = async () => {
    try {
      setLoading(true); 
      // Assuming you have an API endpoint for adding a new record
      const response = await fetch(tableInfo.creatEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Additional headers if needed
        },
        body: JSON.stringify(newRecord),
      });
  
      if (response.ok) {
        // Record added successfully
        setNewRecord({});

        console.log('New Record added successfully:', newRecord);
  
        // Update the local state with the new record
        setUpdateFlag(updateFlag+1);
        setLoading(false); 
        setIsAddPopup(false)
        toast.success(' Data added successfully', {
          position: "bottom-right",
          autoClose: 4000,
          });
        // window.location.href = tableInfo.location;
      } else {
        // Handle error if the add fails
        console.error('Error adding new record:', response.status);
        // Optionally, display an error message to the user
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error adding new record:', error.message);
      // Optionally, display an error message to the user
          setLoading(false);
          toast.error(' Please Try Again!', {
            position: "bottom-right",
            autoClose: 4000,  
            });
    }
  };

  return (
    <div>

{isAddPopup && (
        <div className="popup-container " >    
        <p className="position-absolute  fs-4"> <i className="fa fa-plus-circle me-2 fs-5" aria-hidden="true"></i>Add</p>
        <br />
          {tableInfo.columns.map((column, i) => (
            column !== 'id' && (
              <div key={i}>
                <label>
                  {capitalizeAndSpace(column)}:
                  <input
                    type="text"
                    value={newRecord[column] || ''}
                    onChange={(e) =>
                      setNewRecord((prevRecord) => ({
                        ...prevRecord,
                        [column]: e.target.value,
                      }))
                    }
                    className="d-block"
                  />
                </label>
              </div>
            )
          ))}
          <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
            <button onClick={handleAddSave} className='popup-first-btn  me-3'>Save</button>
            <button onClick={() => setIsAddPopup(false)} className='add-cancel'>Cancel</button>
          </div>
        </div>
      )}

{loading && (
      <Loading/>
      )}
    </div>
  )
}

export default AddPopup