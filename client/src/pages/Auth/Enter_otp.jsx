import React from 'react'
import './Auth.css'
function Enter_otp() {
  return (
    <div className='OTP_container'>
   <form>
     <input type ="number" className='OTP_box'>Enter OTP</input>
     <button className='OTP_btn'>Submit</button>
   </form>
    </div>
  )
}

export default Enter_otp