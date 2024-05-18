import React from 'react'
import "./WaitingPage.css"
import Clock from "../../assets/imgs/wall-clock (1).png"
function WaitingPage() {
  return (
    <div className='position-relative' >
      <div className='waitingPage'>
<div className="text-center">
  <img src={Clock} alt=""  className='img-fluid'/>
  <p className='fs-4 mt-5 text-black'>please wait for our admin team to review your request. You will receive an email notification regarding the acceptance or rejection status.</p>
</div>
      </div>
    </div>
  )
}

export default WaitingPage