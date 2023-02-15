import React from 'react'
import Header from '../component/header'
import Navbar from '../component/navbar'
import StudentList from '../component/studentList'
function layout() {
  return (
    <div>
        <Header />
        <div>
            <Navbar/>
            <div>
                <StudentList />
            </div>
        </div>
    </div>
  )
}

export default layout