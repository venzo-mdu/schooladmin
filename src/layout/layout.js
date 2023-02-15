import React from 'react'
import Header from '../component/header'
import Navbar from '../component/navbar'
import Route from '../layout/route'


import './layout.css'
function layout() {
  return (
    <div>
        <Header />
        <div className='contentpage'>
            <Navbar/>
            <div className='contentdisplay'>
                <Route />
            </div>
        </div>
    </div>
  )
}

export default layout