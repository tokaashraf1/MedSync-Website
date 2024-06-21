import React, { createContext, useState } from 'react'

export const AdminContext =createContext()
function AdminProvider({ children }) {
  const [count, setCount] = useState(1);
  return (
    <AdminContext.Provider value={{count,setCount}}>
    {children}
</AdminContext.Provider>
  )
}

export default AdminProvider