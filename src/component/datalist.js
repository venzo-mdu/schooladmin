import React from 'react'
import Popup from '../component/popup/popup'
import { db } from '../firebase'
import { v4 } from "uuid";
import { useState } from 'react'
import { getDoc, doc, updateDoc, arrayUnion, setDoc, where } from 'firebase/firestore';

import '../component/popup/popup.css'
import { async } from '@firebase/util';

const Datalist = (props) => {

    const data = props.data;
    // console.log(data)


    const [buttonPopup, setButtonPopup] = useState(false);
    const [titleInput, setTitleInput] = useState("")
    const [classInput, setClassInput] = useState("")
    const [courseInput, setCourseInput] = useState("")
    const createData = async () => {

        const docref = doc(db, 'schoolentry', 'details');
        const details =await getDoc(docref);

        const datalist = {
            id: v4(),
            name: titleInput,
            class: classInput,
            course: courseInput,
        }

        if (data.title === 'Student Details') {
            if (details.data() === undefined) {
                await setDoc(docref.data(), {
                    'students[0].tabelcontent': [datalist]
                })
            } else {
                await updateDoc(docref, {
                    'students.tabelcontent': arrayUnion(datalist)
                })
            }
        }
         if (data.title === "Teacher Details") {
            if (details.data() === undefined) {
                await setDoc(docref.data(), {
                    'teacher[0].tabelcontent': [datalist]
                })
            } else {
                await updateDoc(docref, {
                    'teacher.tabelcontent': arrayUnion(datalist)
                })
            }
        }
        setTitleInput('')
        setClassInput('')
        setCourseInput('')
    }
    const editdata = async(value) =>{
        let setData1;
        const docref = doc(db, 'schoolentry', 'details');
        const details = await getDoc(docref);
        const list = details.data().students
        const list1 =details.data().teacher

        // console.log('vetty',(list.tabelcontent.id === value))
        if (data.title === 'Student Details') {
            {list.tabelcontent.map(item =>{
            if(item.id === value){
                console.log(item, 'value')
            }
        })}
    }
    if (data.title === "Teacher Details") {
        {list1.tabelcontent.map(item =>{
            if(item.id === value){
                console.log(item, 'value')
            }
        })}
    }

    }

    return (
        <div>
            <div>
                <p>{data?.title}</p>
                <button onClick={() => setButtonPopup(true)}>Add</button>
                <div>
                    <table>
                        <tr>
                            <th>{data?.tableHeading?.name}</th>
                            <th>{data?.tableHeading?.id}</th>
                            <th>{data?.tableHeading?.class}</th>
                            <th>{data?.tableHeading?.course}</th>
                            <th >Edit</th>

                        </tr>
                        {data?.tabelcontent?.map((item, index) => {
                            return <tr>
                                <td>{item.name}</td>
                                <td>{item.name?index + 1:''}</td>
                                <td>{item.class}</td>
                                <td>{item.course}</td>
                                <td  value={item.id} onClick={() =>editdata(item.id)}>Edit</td>
                            </tr>
                        })}
                    </table>
                </div>
            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <p id='joinourteamText'>add details</p>
                <label>Name</label><input className='Fname' name='name' required type="text" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} /><br></br>
                <label>class</label><input className='Femail' name='class' required type="text" value={classInput} onChange={(e) => setClassInput(e.target.value)} /><br></br>
                <label>Course</label><input className='Fphone' name='course' required type="text" value={courseInput} onChange={(e) => setCourseInput(e.target.value)} />
                <p className='Fbutton' onClick={createData}>Add</p>
            </Popup>
        </div>
    )
}

export default Datalist