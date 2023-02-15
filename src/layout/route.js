import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Datalist from '../component/datalist'
import Coursedetail from '../component/coursedetail'
import Studentdata from '../content/studentData.json'
import Coursedata from '../content/courseData.json'

function route() {
  return (
    <div>
        <Routes>
        <Route path='/studentlist' element={<Datalist data={Studentdata}/>} /> 
        <Route path='/coursedetail' element={<Datalist data={Coursedata}/>} /> 
      </Routes>
    </div>
  )
}

export default route