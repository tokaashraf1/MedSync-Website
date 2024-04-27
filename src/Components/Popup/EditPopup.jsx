import React from 'react'
import "./Popup.css"
function EditPopup({selectedRow ,setSelectedRow , visibleColumns}) {
  
  return (
    <div>
          {selectedRow && (
        // ref={verticalContainerRef} style={verticalContainerStyle}
        <div className="popup-container "   >
            <p  className="position-absolute  fs-3"> <i className="fa fa-pencil-square-o me-2" aria-hidden="true"></i>EDIT</p>
          <br />
          {visibleColumns.map((column, i) => (
          
            <div key={i}>
              <label>
                {column}:
                <input
                  type="text"
                  value={selectedRow[column]}
                  onChange={(e) =>
                    setSelectedRow((prevRow) => ({
                      ...prevRow,
                      [column]: e.target.value,
                    }))
                  }
                  className=""
                />
              </label>
            </div>
          ))}
          <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
          <div>
              <button  className='popup-first-btn  me-3'>Edit</button>
              <button onClick={() => setSelectedRow(null)} className=' '>Cancel</button>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditPopup