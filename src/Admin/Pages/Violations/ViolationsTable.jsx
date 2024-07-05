import React from 'react'
import  { useContext, useEffect, useState } from 'react'
import {renderSortSymbol,sortedRows} from "../../../utils/handleSorting"
import {capitalizeAndSpace} from "../../../utils/capitalizeAndSpace"

import Search from '../../../Components/Search/Search'
import { AdminContext } from "../../../Contexts/AdminProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../Components/Loading/Loading'
import axios from 'axios'
function ViolationsTable({tableInfo,handleSearch}) {
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

  const handlePageChange = (newPage ) => {
    setCurrentPage(newPage);
    setSelectedRow(null);
  };

  const handleActivate = async (editedRow) => {
    try {
      setLoading(true);
      const params = {
        user_id: editedRow.user_id,
      };
      // Make the GET request using Axios with query parameters
      const response = await axios.get(tableInfo.updateEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params: params,
      });
      console.log('Response:', response.data);
      toast.success('User activated successfully!', {
        position: "bottom-right",
        autoClose: 4000,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle errors if the request fails
      console.error('Error adding clinic:', error);
      toast.error('Please try again!', {
        position: "bottom-right",
        autoClose: 4000,  
      });}
      console.log(editedRow)
  };
  const handleRejectClick = async (editedRow) => {
    try {
      setLoading(true);
      const params = {
        user_id: editedRow.user_id,
      };
      // Make the GET request using Axios with query parameters
      const response = await axios.get(tableInfo.deleteEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params: params,
      });
      console.log('Response:', response.data);
      toast.success('User deactivated successfully!', {
        position: "bottom-right",
        autoClose: 4000,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle errors if the request fails
      console.error('Error adding clinic:', error);
      toast.error('Please try again!', {
        position: "bottom-right",
        autoClose: 4000,  
      });}
      console.log(editedRow)
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
          <td>
          <button  className='table-approve-btn' onClick={() => handleActivate(row)} >Activate</button>
        </td>
        <td>
        <button  className='table-delete-btn' onClick={() => handleRejectClick(row)}>Deactivate</button>
        </td>  
          </tr>
        ))}
      </tbody>
    </table>
        <div  className='mt-4 position-relative'>
      <span className='total-rows'>Total Rows: {totalRows}</span>
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
{loading && (
    <Loading/>
    )}
</div>
)
  
}

export default ViolationsTable