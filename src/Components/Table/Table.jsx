import React, { useEffect, useState } from 'react'
import {renderSortSymbol,sortedRows} from "../../utils/handleSorting"
import {capitalizeAndSpace} from "../../utils/capitalizeAndSpace"
import EditPopup from '../Popup/EditPopup'
import {handlePageChange,handleEditClick} from "../../utils/handleTableLogic"
import "./Table.css"

function Table({tableInfo}) {
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [IsEditPopUp, setIsEditPopUp] = useState(false);
  const sortedStartIndex = (currentPage - 1) * rowsPerPage;
  const sortedEndIndex = sortedStartIndex + rowsPerPage;
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const startPage = Math.max(1, currentPage - 2);
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const endPage = Math.min(totalPages, startPage + 4);
  const handleSort = (column) => {
    const direction = sortConfig.column === column ? (sortConfig.direction === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortConfig({ column, direction });
  };



  const sortedRowsData = sortedRows(tableInfo.rows, sortConfig);
  useEffect(() => {
    // Exclude 'id' from the visible columns initially
    const defaultVisibleColumns = tableInfo.columns.filter((col) => col !== 'id');
    setVisibleColumns(defaultVisibleColumns);
    setTotalRows(tableInfo.rows.length);
  }, [tableInfo.columns, tableInfo.rows]);

  const handleCheckboxChange = (column) => {
    const updatedColumns = visibleColumns.includes(column)
      ? visibleColumns.filter((col) => col !== column)
      : [...visibleColumns, column];
    setVisibleColumns(updatedColumns);
  };


  return (
    <div className='table-body'>
      <div className='overflow-auto position-relative table-container '>
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
              <td key={colIndex}>
                {typeof row[column] === 'object'
                  ? JSON.stringify(row[column])
                  : row[column]}
              </td>
            ))}
            <td>
                <button  className='table-edit-btn' onClick={()=> handleEditClick(row,setSelectedRow)} >Edit</button>
              </td>
              <td>
              <button  className='table-delete-btn'>Delete</button>
            

              </td>
            </tr>
          ))}
        </tbody>
      </table>
          <div  className='mt-4 position-relative'>
        <span className='total-rows'>Total Rows: {totalRows}</span>
        <button  className='table-add-button ms-md-5 ms-3'>add +</button>

        <span className='page-number position-absolute end-0'>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1,setCurrentPage,setSelectedRow)}>&larr;</button>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
            <button key={page} onClick={() => handlePageChange(page,setCurrentPage,setSelectedRow)} className={page === currentPage ? 'active' : ''}>
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1,setCurrentPage,setSelectedRow)}>&rarr;</button>
          )}
        </span>
      </div>
      </div>
  <EditPopup selectedRow={selectedRow} setSelectedRow={setSelectedRow}  visibleColumns={visibleColumns} />
  </div>
  )
}

export default Table