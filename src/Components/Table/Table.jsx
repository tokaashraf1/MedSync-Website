import React, { useContext, useEffect, useState } from 'react'
import {renderSortSymbol,sortedRows} from "../../utils/handleSorting"
import {capitalizeAndSpace} from "../../utils/capitalizeAndSpace"
import DeletePopup from '../Popup/DeletePopup'
import EditPopup from '../Popup/EditPopup'
import "./Table.css"
import AddPopup from '../Popup/AddPopup'
import Loading from '../Loading/Loading'
import RejectPopup from '../Popup/RejectPopup'
import ShowRequest from "../Popup/showRequest"
import Search from '../Search/Search'
import { AdminContext } from "../../Contexts/AdminProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Table({tableInfo,handleSearch}) {
  const {updateFlag, setUpdateFlag } = useContext(AdminContext);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const sortedStartIndex = (currentPage - 1) * rowsPerPage;
  const sortedEndIndex = sortedStartIndex + rowsPerPage;
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rejectedRow, setrejectedRow] = useState(null);
  const [showRow, setshowRow] = useState(null);
  const [isshowpopup, setisshowpopup] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isAddPopup, setIsAddPopup] = useState(false);
  const [isreject, setisreject] = useState(false);
  const startPage = Math.max(1, currentPage - 2);
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const endPage = Math.min(totalPages, startPage + 4);
  const[loading,setLoading]=useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleSort = (column) => {
    const direction = sortConfig.column === column ? (sortConfig.direction === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortConfig({ column, direction });
  };

  const sortedRowsData = sortedRows(tableInfo.filteredData, sortConfig);
  useEffect(() => {
    // Exclude 'id' from the visible columns initially
    const defaultVisibleColumns = tableInfo.columns.filter((col) => col !== 'id');
    setVisibleColumns(defaultVisibleColumns);
    setTotalRows(tableInfo.filteredData.length);
  }, [tableInfo.columns, tableInfo.filteredData]);

  const handleCheckboxChange = (column) => {
    const updatedColumns = visibleColumns.includes(column)
      ? visibleColumns.filter((col) => col !== column)
      : [...visibleColumns, column];
    setVisibleColumns(updatedColumns);
  };
  const handleEditClick = (row) => {
    setSelectedRow(row);
  };
  const handlePageChange = (newPage ) => {
    setCurrentPage(newPage);
    setSelectedRow(null);
  };

  const [deleteRow, setDeleteRow] = useState(null);
  const handleDeleteClick = (row) => {
    setDeleteRow(row);
    setIsDeletePopup(true);
  };
  const handleApprove = async (editedRow) => {
    try {
      setLoading(true); 
      const requestOptions = {
        method: tableInfo.Adminrequest ? 'PUT' : 'POST', // Use PUT if Adminrequest is true, otherwise use POST
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(editedRow),
      };
  
      if (!tableInfo.Adminrequest) {
        const authToken = localStorage.getItem('authToken');
        requestOptions.headers.Authorization = `Bearer ${authToken}`;
      }
      const response = await fetch(tableInfo.approveapi + editedRow.id, requestOptions);
      if (response.ok) {
        console.log('Row updated successfully:', editedRow);
        const updatedRows = tableInfo.filteredData.map((r) => (r.id === editedRow.id ? editedRow : r));
        setTotalRows(updatedRows.length);
        setSelectedRow(null);
        setUpdateFlag(updateFlag+1);
        setLoading(false); 
        toast.success(' Request approved successfully', {
          position: "bottom-right",
          autoClose: 4000,
          });
      } else {
        console.error('Error updating row:', response.status);
      }
    } catch (error) {
      console.error('Error updating row:', error.message);
      console.error('Error deleting row:', error.message);
      toast.error(' Please Try Again!', {
        position: "bottom-right",
        autoClose: 4000,  
        });
    } finally {
      setLoading(false); 
    }
  };
  
  const handleRejectClick = (row) => {
    setrejectedRow(row);
    setisreject(true);
  };
  const handleShowpopup = (row) => {
    if(tableInfo.Adminrequest==true){
    setshowRow(row);
    setisshowpopup(true);
  }};  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const formatCellValue = (value) => {
    return value === null || value === undefined ? '--' : value;
  };
  return (
  
    <div className='table-body'>
    

      <div className='overflow-auto position-relative table-container '>

      <div className='hidecoulmns-container position-relative d-flex justify-content-space-between ' >
        <div style={{ display: 'inline-block' }} className='d-none d-md-inline-block' >
          <button onClick={toggleDropdown} className='hidecoulmns-btn'>
            {isDropdownOpen ? 'hide' : 'hide'} Coulmns <i className="fa fa-caret-down" aria-hidden="true"></i>
          </button>
          {isDropdownOpen && (
            <div  className='coulmns-dropdown position-absolute'>
              {tableInfo.columns.map((column, i) => (
                column !== 'id' && (
                  <label key={i} className='d-block' > 
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(column)}
                      onChange={() => handleCheckboxChange(column)}
                      className='me-1'
                    />
                     {capitalizeAndSpace(column)}
                  </label>
                )
              ))}
            </div>
          )}
        </div>
  <div className='position-absolute end-0 search '>
          <Search data={tableInfo.rows} columns={tableInfo.columns} onSearch={handleSearch}/>
  </div>
      </div>

  <table>
        <thead>
        <tr>
  {visibleColumns.map((column, i) => (
    <th key={i} onClick={() => handleSort(column)} className=''>
       {capitalizeAndSpace(column)} <span>{renderSortSymbol(column,sortConfig)}</span>
    </th>
  ))}
  <th>Edit</th>
  <th>Delete</th>
</tr>
        </thead>
        <tbody>
        {sortedRowsData.slice(sortedStartIndex, sortedEndIndex).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {visibleColumns.map((column, colIndex) => (
              <td key={colIndex} onClick={() => handleShowpopup(row)}>
                {row[column] !== null && typeof row[column] === 'object'
            ? JSON.stringify(row[column])
            : formatCellValue(row[column])}
              </td>
            ))}
          
              {tableInfo.request ? (
            <>
            <td>
            <button  className='table-approve-btn' onClick={() => handleApprove(row)} >Approve</button>
          </td>
          <td>
          <button  className='table-delete-btn' onClick={() => handleRejectClick(row)}>Reject</button>
          </td>
      </>
          ) : (
        <>
              <td>
              <button  className='table-edit-btn' onClick={()=> handleEditClick(row)} >Edit</button>
            </td>
            <td>
            <button  className='table-delete-btn' onClick={() => handleDeleteClick(row)}>Delete</button>
            </td>
        </>
          )}
            </tr>
          ))}
        </tbody>
      </table>
          <div  className='mt-4 position-relative'>
        <span className='total-rows'>Total Rows: {totalRows}</span>
        {tableInfo.request ? (
            <>
            </>
          ) : (
            <button  className='table-add-button ms-md-5 ms-3' onClick={() => setIsAddPopup(true)} >Add +</button>
          )}
      
        <span className='page-number position-absolute end-0'>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>&larr;</button>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} className={page === currentPage ? 'active' : ''}>
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>&rarr;</button>
          )}
        </span>
      </div>
      </div>
  <EditPopup selectedRow={selectedRow} setSelectedRow={setSelectedRow}  visibleColumns={visibleColumns}  tableInfo={tableInfo}/>
  <DeletePopup isDeletePopup={isDeletePopup} tableInfo={tableInfo} setIsDeletePopup={setIsDeletePopup} deleteRow={deleteRow} />
  <RejectPopup isreject={isreject} tableInfo={tableInfo} setisreject={setisreject} rejectedRow={rejectedRow} setrejectedRow={setrejectedRow} />
  <AddPopup isAddPopup={isAddPopup} setIsAddPopup={setIsAddPopup}  tableInfo={tableInfo}/>
  <ShowRequest isshowpopup={isshowpopup} setisshowpopup={setisshowpopup} tableInfo={tableInfo} showRow={showRow} setshowRow={setshowRow} />
  {loading && (
      <Loading/>
      )}
  </div>
  )
}

export default Table