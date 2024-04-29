import { useState, useEffect } from 'react';

function useTableState(tableInfo) {
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [Loading, setLoading] = useState(1);


  const rowsPerPage = 5;
  const sortedStartIndex = (currentPage - 1) * rowsPerPage;
  const sortedEndIndex = sortedStartIndex + rowsPerPage;
  const startPage = Math.max(1, currentPage - 2);
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const endPage = Math.min(totalPages, startPage + 4);

  const handleEditSave = async (editedRow) => {
    try {
      setLoading(true); 
      const response = await fetch(tableInfo.update + editedRow.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // Additional headers if needed
        },
        body: JSON.stringify(editedRow),
      });
  
      if (response.ok) {
        // Row updated successfully
        console.log('Row updated successfully:', editedRow);
  
        // Update the local state with the edited row
        window.location.href = tableInfo.location;
      } else {
        // Handle error if the update fails
        console.error('Error updating row:', response.status);
        // Optionally, display an error message to the user
      }
    
    } catch (error) {
      setLoading(false); 
    }
  };


  return {
    visibleColumns,
    sortConfig,
    totalRows,
    selectedRow,
    currentPage,
    setSortConfig,
    setVisibleColumns,
    setTotalRows,
    sortedStartIndex,
    sortedEndIndex,
    startPage,
    totalPages,
    endPage,
    setCurrentPage,
    setSelectedRow,
    handleEditSave,
  
  };
}

export default useTableState;
