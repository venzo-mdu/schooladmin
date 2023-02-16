import React from 'react'
import { Link } from 'react-router-dom'

function navbar() {
  return (
    <div className='sidenav'>
        <Link to='/studentlist'><p>Student Detail</p></Link>
        <Link to='/coursedetail'><p>Course Detail</p></Link>
        <p>Course Detail</p>
    </div>
  )
}

export default navbar