import React, { createContext, useState } from 'react'
export const x= createContext()
function Context({children}) {
  const[b,setb]= useState("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbk")
  return (
    <x.Provider value={b}>{children}</x.Provider>
  )
}

export default Context