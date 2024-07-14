import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Askquestion from './pages/Askquestion/Askquestion'
import Auth from './pages/Auth/Auth'
import Question from './pages/Question/Question'
import Displayquestion from './pages/Question/Displayquestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import Userprofile from './pages/Userprofile/Userprofile'
import Forget_pass from './pages/Auth/Forget_pass'
import ResetPassword  from './pages/Auth/Reset_pass'
// import Enter_otp from './pages/Auth/Enter_otp'
function Allroutes({slidein,handleslidein}) {
  return (
    <Routes>
        <Route path='/' element={<Home slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Askquestion' element={<Askquestion />}/>
        <Route path='/Auth' element={<Auth />}/>
        <Route path='/Question' element={<Question slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Question/:id' element={<Displayquestion slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Tags' element={<Tags slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Users' element={<Users slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Users/:id' element={<Userprofile slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Forget_pass' element= {<Forget_pass />}/>
        <Route path="/Reset_pass/:id/:token" element={<ResetPassword />}></Route>
    </Routes>
  )
}

export default Allroutes