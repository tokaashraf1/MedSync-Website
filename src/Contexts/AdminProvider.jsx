import React, { createContext, useState } from 'react'

export const AdminContext =createContext()
function AdminProvider({ children }) {
  const [updateFlag, setUpdateFlag] = useState(1);
  return (
    <AdminContext.Provider value={{updateFlag,setUpdateFlag}}>
    {children}
</AdminContext.Provider>
  )
}

export default AdminProvider