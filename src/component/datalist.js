import React from 'react'
import Popup from '../component/popup/popup'
import { db, auth, storage } from '../firebase'
import { v4 } from "uuid";
import { useState, useEffect } from 'react'
import { getDoc, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

import '../component/popup/popup.css'

const Datalist = (props) => {
 
    const data = props.data;
    const [buttonPopup, setButtonPopup] = useState(false);
    const [titleInput, setTitleInput] = useState("")
    const [classInput, setClassInput] = useState("")
    const [courseInput, setCourseInput] = useState("")
    const createData = async () => {
        const docref = doc(db, 'schooladmin', details);    
        const datalist = {
          id: v4(),
          title: titleInput,
          class: classInput,
          course: courseInput,
        }
        let details = await getDoc(docref)
            // if(details.data() === undefined){
            //   await setDoc(docref, {
            //     trans: [datalist]
            //   })
            // }else{
            // await updateDoc(docref, {
            //   trans: arrayUnion(datalist)
            // })}
            console.log(details,'hi')

          
        //   setTitleInput('')
        //   setClassInput('')
        //   setCourseInput('')
        }



    return (
        <div>
            {data.map((item) => {
                return <div>
                    <p>{item.title}</p>
                    <button onClick={()=> setButtonPopup(true)}>Add</button>

                    <div>
                        <table>
                            <tr>
                                <th>{item.tableHeading.name}</th>
                                <th>{item.tableHeading.id}</th>
                                <th>{item.tableHeading.class}</th>
                                <th>{item.tableHeading.course}</th>
                            </tr>
                            {/* {item.teacherContent.data.map(item => {
                                return <tr>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td>{item.class}</td>
                                    <td>{item.subject}</td>
                                </tr>
                            })} */}


                        </table>


                    </div>
                </div>
            })}
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <form >
                    <p id='joinourteamText'>add details</p>
                     <label>Name</label><input className='Fname' name='name' required type="text"value={titleInput} onChange={(e) => setTitleInput(e.target.value)} /><br></br>
                     <label>class</label><input className='Femail' name='class' required type="text"value={classInput} onChange={(e) => setClassInput(e.target.value)}/><br></br>
                     <label>Course</label><input className='Fphone' name='course' required type="text"value={courseInput} onChange={(e) => setCourseInput(e.target.value)}/>
                     <button  className='Fbutton' onClick={createData}>Add</button>
                     </form>
            </Popup>
        </div>
    )
}

export default Datalist