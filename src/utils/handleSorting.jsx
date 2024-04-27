
export const renderSortSymbol = ( column,sortConfig) => {
  if (sortConfig.column === column) {
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  }
  return null;
};

export const sortedRows = (rows, sortConfig) => {
  return [...rows].sort((a, b) => {
    const column = sortConfig.column;
    const order = sortConfig.direction === 'asc' ? 1 : -1;

    if (a[column] < b[column]) {
      return -1 * order;
    }
    if (a[column] > b[column]) {
      return 1 * order;
    }
    return 0;
  });
};

