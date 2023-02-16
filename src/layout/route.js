import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Datalist from '../component/datalist'
import Coursedetail from '../component/coursedetail'
import { db, auth, storage } from '../firebase'
import { v4 } from "uuid";
import { useState, useEffect } from 'react'
import { getDoc, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';


function Connect() {
    const[studentData,setStudentData]=useState([])
    const[Coursedata,setCoursedata]=useState([])
    
    useEffect(() =>{
      getTransactions()
      getDetails()
    },[])

    const getTransactions = async () => {
    const docref = doc(db, 'schoolentry', 'details');
    const querySnapshot = await getDoc(docref);
    const list = querySnapshot.data().teacher
    setCoursedata(list)
    }

    const getDetails = async () => {
      const docref = doc(db, 'schoolentry', 'details');
      const querySnapshot = await getDoc(docref);
      const list = querySnapshot.data().students
      setStudentData(list)
      }
  return (
    <div>
        <Routes>
        <Route path='/studentlist' element={<Datalist data={studentData}/>} /> 
        <Route path='/coursedetail' element={<Datalist data={Coursedata}/>} /> 
      </Routes>
    </div>
  )
}

export default Connect