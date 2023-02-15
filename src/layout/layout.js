import React from 'react'
import Header from '../component/header'
import Navbar from '../component/navbar'
import StudentList from '../component/studentList'


import './layout.css'
function layout() {
  return (
    <div>
        <Header />
        <div className='contentpage'>
            <Navbar/>
            <div className='contentdisplay'>
                <StudentList />
            </div>
        </div>
    </div>
  )
}

export default layout