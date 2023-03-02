import React from 'react'
import { Link } from 'react-router-dom'
import school from '../images/school.jpg'

function navbar() {
  return (
    <div className='sidenav'>
        <img src={school} alt='logo' className='logo'></img>
        <Link to='/studentlist'><p >Student Detail</p></Link>
        <Link to='/coursedetail'><p>Course Detail</p></Link>
    </div>
  )
}

export default navbar