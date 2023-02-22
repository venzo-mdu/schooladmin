import React from 'react'
import Popup from '../component/popup/popup'
import { db } from '../firebase'
import { v4 } from "uuid";
import { useState } from 'react'
import { getDoc, doc, updateDoc, arrayUnion, setDoc, arrayRemove, FieldValue, Firestore, deleteField } from 'firebase/firestore';
import '../component/popup/popup.css'

const Datalist = (props) => {

    const data = props.data;

    const [buttonPopup, setButtonPopup] = useState(false);
    const [titleInput, setTitleInput] = useState("")
    const [classInput, setClassInput] = useState("")
    const [courseInput, setCourseInput] = useState("")
    const [indexs ,setIndex] = useState('')

    const createData = async () => {

        const docref = doc(db, 'schoolentry', 'details');
        const details = await getDoc(docref);

        const datalist = {
            id: v4(),
            name: titleInput,
            class: classInput,
            course: courseInput,
        }
        if (data.title === 'Student Details') {
            if (details.data() === undefined) {
                await setDoc(docref.data(), {
                    'students[0].tablecontent': [datalist]
                })
            } else {
                await updateDoc(docref, {
                    'students.tablecontent': arrayUnion(datalist)
                })
            }
        }
        if (data.title === "Teacher Details") {
            if (details.data() === undefined) {
                await setDoc(docref.data(), {
                    'teacher[0].tablecontent': [datalist]
                })
            } else {
                await updateDoc(docref, {
                    'teacher.tablecontent': arrayUnion(datalist)
                })
            }
        }

        setTitleInput('')
        setClassInput('')
        setCourseInput('')
    }

    const editdata = async (value,index) => {
        setIndex(index)
        const docref = doc(db, 'schoolentry', 'details');
        const details = await getDoc(docref);
        const list = details.data().students
        const list1 = details.data().teacher
        setButtonPopup(true)
        if (data.title === 'Student Details') {

            list.tablecontent.map(item => {
                if (item.id === value.id) {
                    setTitleInput(item.name)
                    setClassInput(item.class)
                    setCourseInput(item.course)

                }
            })
        }
        if (data.title === "Teacher Details") {
            list1.tablecontent.map(item => {
                if (item.id === value) {
                    setTitleInput(item.name)
                    setClassInput(item.class)
                    setCourseInput(item.course)
                }
            })
        }
    }
    const [list2, setList2] =useState([])
    const updatedata = async() =>{
        const docref = doc(db, 'schoolentry', 'details');
        const details = await (await getDoc(docref)).data();
        const list = details.students
        const list1 = details.teacher

        const listdata =list.tablecontent
        const datas =listdata.splice(indexs, 1)
        setList2(datas)
        console.log(datas)

        if (data.title === 'Student Details') {
            await setDoc(docref, {
                'students[0].tablecontent': [list2]
            })
        }


    }


    const cleardata = () => {
        setButtonPopup(true)
        setTitleInput('')
        setClassInput('')
        setCourseInput('')
    }

    return (
        <div>
            <div>
                <p>{data?.title}</p>
                <button onClick={() => cleardata()}>Add</button>
                <div>
                    <table>
                        <tr>
                            <th>{data?.tableHeading?.name}</th>
                            <th>{data?.tableHeading?.id}</th>
                            <th>{data?.tableHeading?.class}</th>
                            <th>{data?.tableHeading?.course}</th>
                            <th >Edit</th>
                        </tr>
                        {data?.tablecontent?.map((item, index) => {
                            return <tr>                                
                                <td>{item.name}</td>
                                <td>{item.name ? index : ''}</td>
                                <td>{item.class}</td>
                                <td>{item.course}</td>
                                <td value={item.id} onClick={() => editdata(item,index)}>Edit</td>
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
                <p className='Fbutton' onClick={updatedata}>update</p>
            </Popup>
        </div>
    )
}

export default Datalist