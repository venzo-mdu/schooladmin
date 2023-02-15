import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Datalist from '../component/datalist'
import Coursedetail from '../component/coursedetail'
import Studentdata from '../content/studentData.json'
import Coursedata from '../content/courseData.json'
import { db, auth, storage } from '../firebase'
import { v4 } from "uuid";
import { useState, useEffect } from 'react'
import { getDoc, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';


function Connect() {
    const[studentData,setStudentData]=useState([])
    const[Coursedata,setCoursedata]=useState([])
    useEffect(() =>{getTransactions()},[])
    const getTransactions = async () => {
    const docref = doc(db, 'schoolentry', 'details');
    const querySnapshot = await getDoc(docref);
    const list = querySnapshot.data().teacher
    console.log(list)
    setCoursedata(list)
    }
  return (
    <div>
        <Routes>
        <Route path='/studentlist' element={<Datalist data={Studentdata}/>} /> 
        <Route path='/coursedetail' element={<Datalist data={Coursedata}/>} /> 
      </Routes>
    </div>
  )
}

export default Connect