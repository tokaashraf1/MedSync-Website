import React, { useState } from 'react';
import "./Search.css"
const Search = ({ data, onSearch, columns }) => {
  document.body.classList.add("search-body");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');

  const handleSearch = () => {
    console.log('Searching:', searchQuery, 'in field:', selectedField);
  

    const filteredData = data.filter((item) => {
      if (!selectedField) {
        // Search in all columns if no specific field is selected
        for (const key in item) {
          if (item.hasOwnProperty(key) && key !== 'id') {
            const fieldValue = String(item[key]).toLowerCase();
            if (fieldValue.includes(searchQuery.toLowerCase())) {
              return true;
            }
          }
        }
        return false;
      } else {
        // Search in the selected field
        const fieldValue = String(getField(item, selectedField)).toLowerCase();
        return fieldValue.includes(searchQuery.toLowerCase());
      }
    });

    console.log('Filtered Data:', filteredData);
    onSearch(filteredData);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedField('');
    onSearch(data); // Show all data
  };

  const getField = (item, field) => {
    const fieldArray = field.split('.');
    let value = item;

    for (let i = 0; i < fieldArray.length; i++) {
      if (value && value.hasOwnProperty(fieldArray[i])) {
        value = value[fieldArray[i]];
      } else {
        value = undefined;
        break;
      }
    }

    return value;
  };

  return (
    <div className='search-input' >
      <input
        type="text"
        placeholder=" Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />

      <button onClick={handleSearch} className='search-button'><i class="fa fa-search" aria-hidden="true"></i></button>
      <button onClick={handleReset} className='reset-button'>Reset</button>
      <select className='select-search'
        value={selectedField}
        onChange={(e) => setSelectedField(e.target.value)}
      >
        <option value=""> Search by</option>
        {columns
          .filter((column) => column !== 'id') // Exclude 'id' from the options
          .map((column, i) => (
            <option key={i} value={column}>
              {column}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Search;
