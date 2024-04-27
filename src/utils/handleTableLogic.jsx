export const handlePageChange = (newPage ,setCurrentPage,setSelectedRow) => {
  setCurrentPage(newPage);
  setSelectedRow(null);
};
export const handleEditClick = (row,setSelectedRow) => {
  setSelectedRow(row);
};
const handleEditSave = async (editedRow,url,location,setLoading) => {
  try {
    setLoading(true); 
    const response = await fetch(url + editedRow.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(editedRow),
    });
    if (response.ok) {
      console.log('Row updated successfully:', editedRow);
    
    } else {
      console.error('Error updating row:', response.status);
    }
    window.location.href = location;
  } catch (error) {
    console.error('Error updating row:', error.message);
    console.log('Edited Row ID:', editedRow.id);
    setLoading(false); 
  }
};